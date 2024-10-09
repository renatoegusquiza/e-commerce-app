import { Model } from "mongoose";
import { Product } from "src/domain/entity/Product";
import { ProductRepository } from "src/domain/repository/ProductRepository";
import { ProductModel } from "./schema/ProductsSchema";
import { InjectModel } from "@nestjs/mongoose";
//import { Injectable } from "@nestjs/common";
//import { Injectable } from "src/common/Injectable";

export class MongoProductRepository implements ProductRepository{
    
    constructor(
        @InjectModel(ProductModel.name) private productModel: Model<ProductModel>
        //? Inyecta el modelo de Mongoose correspondiente a 'ProductModel' usando 'InjectModel'
    ){}

    async create(product: Product): Promise<Product>{
        //? Método asíncrono para crear un nuevo producto en MongoDB
        const model = {
            name: product.name,
            description: product.description,
            supplierId: product.supplier.id
            //? Crea un objeto 'model' con los datos del producto a guardar,
            //? incluyendo el 'supplierId' (ID del proveedor)
        };
        const document = await new this.productModel(model).save();
        //? Crea una nueva instancia del modelo de Mongoose y guarda el producto en la base de datos

        return this.mapToEntity(document);
        //? Devuelve el producto creado en formato de entidad
        //? Mapea el documento de MongoDB a la entidad de dominio y la retorna
    }

    async findById(id: number): Promise<Product> {
        //return new Promise(resolve, reject)
        const document = await this.productModel.findById(id)
        //? Usa Mongoose para buscar el documento por su ID

        return document ? this.mapToEntity(document) : null
        //? Si encuentra el documento, lo mapea a la entidad de dominio, de lo contrario retorna null
    }

    private mapToEntity(document: any): any{
        //? Método privado para mapear un documento de MongoDB a la entidad de dominio 'Product'
        return {
            //Product(document.name, document.description, document.supplierId)
            id: 0, //? En este caso el ID de la entidad no se usa o es '0'
            idMongo: document.id, //? El ID de MongoDB se guarda en 'idMongo'
            name: document.name, //? Mapea el nombre del producto
            description: document.description, //? Mapea la descripción del producto
            supplier: document.supplierId //? Mapea el 'supplierId' al proveedor del producto
        }
    }
}