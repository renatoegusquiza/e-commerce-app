import { Cache } from '../entity/Cache';

export abstract class CacheRepository {
    //? Esta clase establece un contrato para la gestión de un repositorio de caché

    abstract create(key: string, value: object): Promise<void>;
    //? Toma una clave 'key' (string) y un valor 'value' (object)
    //? No devuelve valor (void), pero devuelve una promesa
    
    abstract findByKey(key: string): Promise<Cache>;
    //? Método abstracto 'findByKey' que debe ser implementado en clases derivadas
    //? Recibe una clave 'key' (string) y devuelve una promesa que resuelve en un objeto de tipo 'Cache'
}
