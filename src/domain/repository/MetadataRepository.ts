export abstract class MetadataRepository {
    //? Esta clase servirá como contrato para otras clases que implementen sus métodos

    abstract upload(id: number, nombre: string): Promise<void> 
    //? Método abstracto 'upload' que debe ser implementado en las clases que hereden de 'MetadaRepository'
    //? Recibe un 'id' (número) y un 'nombre' (string), y retorna una promesa que no devuelve valor (void)
} 