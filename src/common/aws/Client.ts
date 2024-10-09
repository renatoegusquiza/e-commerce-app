import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { S3Client } from "@aws-sdk/client-s3";
//import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const config = {
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        //? Obtiene el ID de clave de acceso de las variables de entorno

        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        //? Obtiene la clave de acceso secreta de las variables de entorno
    },
    region: 'us-east-2'
}

export function getDocumentClient(): DynamoDBClient{
    //? Función que devuelve un cliente de DynamoDB con la configuración establecida

    return new DynamoDBClient(config);
}

export function getS3Client(): S3Client{
    //? Función que devuelve un cliente de S3 con la configuración establecida
    
    return new S3Client(config);
}