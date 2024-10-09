import { Product } from "../entity/Product";

export abstract class ProductRepository { //? Define una clase abstracta llamada 'ProductRepository', que actúa como una interfaz o contrato

    abstract create(product: Product): Promise<Product>
    //? Método abstracto que debe ser implementado por clases concretas.
    //? Este método recibe un 'Product' y devuelve una promesa que resuelve un 'Product'

    abstract findById(id: number): Promise<Product>
    //? Método abstracto que debe ser implementado por clases concretas.
    //? Este método recibe un 'id' numérico y devuelve una promesa que resuelve un 'Product'.
}