import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { Injectable } from "src/common/Injectable";
import { Product } from "src/domain/entity/Product";
import { ProductRepository } from "src/domain/repository/ProductRepository";
import {v4 as uuidv4} from 'uuid'

@Injectable()
export class DynamoProductRepository implements ProductRepository{
    private PRODUCT_TABLE = 'product'
    async create(product: Product): Promise<Product>{
        const documentClient = this.getDocumentCliente()
        const model = {
            ID: uuidv4(),
            name: product.name,
            description: product.description,
            supplierId: product.supplier.id
        }
        //const id = uuidv4()
        const commad = new PutCommand({
            TableName: this.PRODUCT_TABLE,
            Item: model //? Items que voy a cargar
        })

        await documentClient.send(commad)
        return this.mapToEntity(model)
    }

    async findById(id: number): Promise<Product> {
        const documentClient = this.getDocumentCliente();
        const command = new QueryCommand({
            TableName: this.PRODUCT_TABLE,
            KeyConditionExpression: 'ID = :id', //? es el nombre con el cual hemos asignado a nuestro ID
            ExpressionAttributeValues: {
                ':id': id
            }
        });

        const response = await documentClient.send(command)
        return response?.Items[0] ? this.mapToEntity(response?.Items[0]) : null
    }

    private mapToEntity(document: any): any{
        return {
            id: 0,
            idDynamo: document.ID,
            name: document.name,
            description: document.description,
            supplier: document.supplierId
        }
    }

    private getDocumentCliente(): DynamoDBClient{
        const config = {
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            },
            region: 'us-east-2'
        }
        return new DynamoDBClient(config)
    }
}