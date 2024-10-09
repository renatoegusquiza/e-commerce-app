import { Body, Controller, Get, Param, Post, UseFilters } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CacheService } from 'src/application/service/CacheService';
import { CustomExceptionFilter } from 'src/common/CustomExceptionFilter';
import { CreateCacheRequest } from './dto/CreateCacheRequest';
import { CustomException } from 'src/common/CustomException';
import { FinCacheByKeyRequest } from './dto/FinCacheByKeyRequest';

@Controller('v1/cache')
@ApiTags('cache')
//? Controlador que maneja las operaciones relacionadas con el caché en la versión 1 de la API

@UseFilters(new CustomExceptionFilter())
//? Aplica un filtro global para manejar excepciones personalizadas en el controlador

export class CacheController {
    constructor(private readonly cacheService: CacheService) {}
    //? Inyección del servicio de caché en el constructor del controlador

    @Post()
    //? Define una ruta POST para crear un nuevo caché

    async create(@Body() request: CreateCacheRequest): Promise<object> {
        try {
            return await this.cacheService.create(request.key, request.value);
            //? Llama al servicio de caché para crear el caché con la key y el value del cuerpo de la solicitud
            
        } catch (error) {
            throw new CustomException(error.statusCode, error.message, error.details);
        }
    }

    @Get(':key')
    //? Define una ruta GET para buscar un caché por su clave

    async findById(@Param() request: FinCacheByKeyRequest): Promise<object> {
        //? Método asíncrono que busca un caché por su clave

        return await this.cacheService.findByKey(request.key);
        //? Llama al cacheService para obtener el valor asociado a la key proporcionada
    }
}
