import { Body, Controller, Param, Post, Get, NotFoundException, UseFilters } from '@nestjs/common';
import { Product } from 'src/domain/entity/Product';
import { CreateProductRequest } from './dto/CreateProductRequest';
import { ProductService } from 'src/application/service/ProductService'
import { FindProductByIdRequest } from './dto/FindProductByIdRequest';
import { CustomException } from 'src/common/CustomException';
import { CustomExceptionFilter } from 'src/common/CustomExceptionFilter';
import { ApiTags } from '@nestjs/swagger';

@Controller("api/v1/products")
@UseFilters(new CustomExceptionFilter()) //? Aplica el filtro de excepciones personalizadas a este controlador
@ApiTags('Products')
export class ProductController {
    constructor(private readonly productService: ProductService) {} //? Inyecta el servicio 'ProductService' para manejar las 
                                                                    //?operaciones relacionadas con productos
    @Post()
    async create(@Body() request: CreateProductRequest): Promise<object> {
    //? Método asíncrono que recibe el cuerpo de la solicitud en el formato de 'CreateProductRequest'
        
        try{
            /* return this.productService.create(request) */
            const response = await this.productService.create(request)
            //? Llama al servicio 'ProductService' para crear el producto con los datos recibidos
            
            return response //? Esto retorna el response despues de crear el producto
        }catch (error){
            throw new CustomException(error.message, error.statusCode, error.details)
        }
    }

    @Get(':id')
    async findById(@Param() request: FindProductByIdRequest): Promise<object> {
    //? Método asíncrono que recibe el ID del producto en el formato de 'FindProductByIdRequest'
        
        return this.productService.findById(request.id)
        //? Llama al servicio 'ProductService' para buscar el producto por su ID y retorna el resultado
    }
}
