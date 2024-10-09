import { ProductRepository } from "src/domain/repository/ProductRepository";
import { SupplierRepository } from "src/domain/repository/SupplierRepository";
import { CreateProductDto } from "../dto/CreateProductDto";
import { Product } from "src/domain/entity/Product";
//import { Supplier } from "src/domain/entity/Supplier";
import { Injectable } from "src/common/Injectable";
import { CustomException } from "src/common/CustomException";
import { MailerRepository } from "src/domain/repository/MailerRepository";
import { Mail } from "src/domain/entity/Mail";
import { MetadataRepository } from "src/domain/repository/MetadataRepository";

@Injectable()   //? convierte esta clase en un servicio que puede
                //? ser inyectado en otros lugares

export class ProductService {
    constructor(
        private readonly productRepository: ProductRepository, //? Inyección de dependencia para acceder al repositorio
        private readonly supplierRepository: SupplierRepository, //? Inyección de dependencia para acceder al repositorio
        private readonly metadataRepository: MetadataRepository,
        private readonly mailerRepository: MailerRepository //? Inyección de dependencia para acceder al repositorio
    ){}

    async create(dto: CreateProductDto): Promise<Product> { //* Estos serían como casos de uso
        
        //? Método asíncrono que crea un nuevo producto
        const product = new Product()
        const supplier = await this.supplierRepository.findById(dto.supplierId);
        
        //? Busca un proveedor usando el supplierId proporcionado en el dto
        if (!supplier) {
            
            //? Si no se encuentra el proveedor, lanza una excepción
            throw new CustomException("Not Found", 404, {message: [
                `Supplier with id ${dto.supplierId} not found`
            ]})
        }

        //? Asignación de valores a los atributos de producto
        product.name = dto.name
        product.description = dto.description
        product.supplier = supplier

        const newProducto = await this.productRepository.create(product)

        await this.mailerRepository.sendEmail(this.getEmailDetails(newProducto))

        await this.productRepository.create(product) //? Guarda el producto en el repositorio y lo retorna

        await this.metadataRepository.upload(newProducto.id, newProducto.name)

        return newProducto
    }

    async findById(id: number): Promise<Product> {  //* Estos serían como casos de uso
        
        //? Método asíncrono que busca un producto por su ID
        const product = await this.productRepository.findById(id);
        if (!product) {
            
            //? Si no se encuentra el producto, lanza una excepción
            throw new CustomException("Not Found", 404, {message:[
                `Product with id ${id} not found`
            ]});
        }
        return product //? Retorna el producto encontrado
    }

    private getEmailDetails(product: Product): Mail {
        return {
            from: 'test@test.com',
            to: 'test2@test.com',
            subject: 'Nuevo producto creado',
            body: `Se ha creado un nuevo producto: ${product.name}`
        }
    } 
}