import { Injectable } from "src/common/Injectable";
import { Product } from "src/domain/entity/Product";
import { ProductRepository } from "src/domain/repository/ProductRepository";

@Injectable()
export class InMemoryProductRepository implements ProductRepository{

    private product: Product[] = [] //? este arreglo representarìa mi base de datos
    private id = 0

    //? Método para generar un nuevo ID incremental
    private getId(): number {
        const newId = this.id + 1
        this.id = newId
        return newId
    }

    async create(product: Product): Promise<Product> {
        const model = new Product()
        
        //? Asignamos un nuevo ID y los atributos del producto
        model.id = this.getId()
        model.description = product.description
        model.name = product.name
        model.supplier = product.supplier

        //? Esto sería tipo un "save" si trabajamos con una base de datos
        //? Aquí agregamos en mi base de datos
        this.product.push(product)  //? esto serìa tipo un "save" si trabajamos con una Base De Datos
                                    //? aqui agregamos en mi base de datos

        return model

        //return Promise.resolve(model);
    }
    
    async findById(id: number): Promise<Product> {  //? aqui buscamos el item en mi base de datos
        //? Aquí buscamos el item en mi base de datos
        const product = await this.product.find((product) => {product.id == id})
        
        //? Devuelve el producto encontrado o null si no existe
        return product ? product : null
        //return Promise.resolve(new Product())
    }

}