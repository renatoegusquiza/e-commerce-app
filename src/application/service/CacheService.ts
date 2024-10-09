//import { CustomException } from 'src/common/CustomException';
import { CustomException } from 'src/common/CustomException';
import { Injectable } from 'src/common/Injectable';
import { CacheRepository } from 'src/domain/repository/CacheRepository';

@Injectable()
export class CacheService {
    //? La clase 'CacheService' se marca como 'Injectable', lo que permite que sea inyectada en otros servicios o controladores

    constructor(
        private readonly cacheRepository: CacheRepository
        //? Inyecta el repositorio de caché en el constructor para poder utilizar sus métodos
    ) {}

    async create(key: string, value: object): Promise<object> {
        //? Método asíncrono 'create' que toma una clave 'key' y un valor 'value' (objeto)
        //? Intenta almacenar el valor en caché usando el repositorio y maneja posibles errores

        try {
            await this.cacheRepository.create(key, value);
            //? Llama al método 'create' del repositorio para almacenar el valor en caché

            return {
                message: '¡Cache stored!'
                //? Si se almacena con éxito, devuelve un mensaje de confirmación
            };
        } catch (error) {
            //? Si ocurre un error, lanza una excepción personalizada con el código de estado 500 (error interno)

            throw new CustomException('Internal Error', 500, {
                message: [error.message]
            });
        }
    }

    async findByKey(key: string): Promise<object> {
        //? Método asíncrono 'findByKey' que busca un valor de caché basado en la clave 'key'

        try {
            const response = await this.cacheRepository.findByKey(key);
            //? Llama al método 'findByKey' del repositorio para obtener el valor asociado a la clave

            if (!response)
                //? Si no se encuentra el valor en el caché, lanza una excepción personalizada con el código 404 (no encontrado)

                throw new CustomException('Not found', 404, {
                    message: [`Cache with key "${key}" does not exists`]
                });
            return response;
            //? Si el valor es encontrado, lo devuelve como respuesta

        } catch (error) {
            //? Si ocurre un error, lanza una excepción personalizada con el código de estado 500 (error interno)
            
            throw new CustomException('Internal Error', 500, {
                message: [error.message]
            });
        }
    }

}
