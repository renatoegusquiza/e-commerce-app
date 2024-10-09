import { ApiProperty } from "@nestjs/swagger"
//? Importa el decorador 'ApiProperty' de Swagger, que permite documentar la API

import { IsNotEmpty, IsNumber } from "class-validator"

export class CreateProductRequest{  //? Define una clase 'CreateProductRequest', que se utiliza para estructurar 
                                    //?los datos al crear un producto

    @IsNotEmpty() //? valida que la propiedad name no esté vacia
    @ApiProperty({
        description: "Product name", //? Descripción para la propiedad 'name' en la documentación Swagger
        example: "Product 1" //? Ejemplo de un valor para la propiedad 'name' en Swagger
    })
    name: string
    description: string

    @IsNotEmpty() //? Valida que la propiedad 'supplierId' no esté vacía
    @IsNumber() //? Esto es para que nos diga que el supplierId solo puede ser number
    @ApiProperty({
        description: "Supplier Id",
        example: 1,
        minimum: 1,
        maximum: 1000,
    })
    supplierId: number
}