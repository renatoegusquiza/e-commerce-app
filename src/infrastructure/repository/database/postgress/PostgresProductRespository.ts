import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "src/common/Injectable";
import { Product } from "src/domain/entity/Product";
import { ProductRepository } from "src/domain/repository/ProductRepository";
import { ProductModel } from "./model/ProductModel";
import { Repository } from "typeorm";

@Injectable()
//? Marca esta clase como inyectable para que pueda ser 
//? utilizada por otros servicios o controladores
export class PostgresProductRespository implements ProductRepository{
    //? Define la clase 'PostgresProductRespository' que implementa la interfaz 'ProductRepository'
    //? utiliza TypeORM para interactuar con una base de datos PostgreSQL a través de la entidad ProductModel

    constructor(
        @InjectRepository(ProductModel) //? Inyecta el repositorio de TypeORM para la 
                                        //? entidad 'ProductModel'  
        private productRepository: Repository<ProductModel> //? 'productRepository' es el repositorio de TypeORM 
                                                            //? que se usará para las operaciones de la base de datos

    ){}

    async create(product: Product): Promise<Product>{
        await this.productRepository.save(product)
        //? Guarda el producto en la base de datos usando el repositorio
        
        return product
    }

    async findById(id: number): Promise<Product> {
        return this.productRepository.findOne({
            relations: {supplier: true},
            //? Especifica que se debe cargar también la relación 'supplier'
            
            where: {id}
            //? Busca el producto donde el 'id' coincida con el parámetro recibido
        })
    }
}