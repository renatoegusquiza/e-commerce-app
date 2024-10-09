import Redis from 'ioredis';
import { Injectable } from 'src/common/Injectable';
import { Cache } from 'src/domain/entity/Cache';
import { CacheRepository } from 'src/domain/repository/CacheRepository';

@Injectable()
export class RedisCacheRepository implements CacheRepository {
    //? Clase que implementa el repositorio de caché utilizando Redis como almacenamiento

    async create(key: string, value: object): Promise<void> {
        //? Método asíncrono que busca un valor en la caché utilizando una clave

        const client = this.getClient();
        //? Obtiene una instancia del cliente Redi

        await client.set(key, JSON.stringify(value));
        //? Almacena el valor en Redis, convirtiendo el objeto a una cadena JSON

        client.disconnect();
        //? Desconecta el cliente Redis después de la operación
    }

    async findByKey(key: string): Promise<Cache> {
        //? Método asíncrono que busca un valor en la caché utilizando una clave

        const client = this.getClient();
        //? Obtiene una instancia del cliente Redis

        const value = await client.get(key);
        //? Busca el valor asociado a la clave en Redis

        client.disconnect();
        //? Desconecta el cliente Redis después de la operación

        return {
            key,
            value: JSON.parse(value)
            //? Retorna el objeto caché con la key y el value, convirtiendo el JSON a objeto
        };
    }

    private getClient(): Redis {
        //? Método privado que crea y retorna una instancia de Redis configurada para conectarse al host local
        
        return new Redis({
            port: 6379,
            host: 'localhost'
        });
    }
}
