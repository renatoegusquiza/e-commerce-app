import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getS3Client } from "src/common/aws/Client";
import { MetadaRepository } from "src/domain/repository/MetadataRepository";
import fs from 'fs'


export class S3MetadataRepository implements MetadaRepository{
    async upload(id: number, name: string): Promise<void> {
        //? Método asíncrono para subir un archivo a un bucket de S3 en AWS
        
        const client = getS3Client()
        //? Obtiene el cliente S3 de AWS usando una función común 'getS3Client'
        
        const fileName = `${id}.txt`
        //? Define el nombre del archivo, usando el 'id' y el formato '.txt'

        /* fs.writeFileSync(fileName, `name: ${name}`, (error) => {
            if (error) throw error;
            console.log('file created!')
        })

        const content = fs.readFileSync(fileName) */
         //? Código comentado que originalmente creaba y leía un archivo
         //? en el sistema de archivos local

        const comand = new PutObjectCommand({
            Bucket: 'my-bucket', 
            //? Especifica el bucket de S3 donde se subirá el archivo

            Key: `${id}.txt`,
            //? Define la clave (nombre del archivo en S3) como el ID seguido de '.txt'

            Body: `name: ${name}`
            //? El contenido del archivo será una cadena de texto que incluye el nombre
        });

        try{
            await client.send(comand)
            //? Envía el comando 'PutObjectCommand' al cliente S3 para subir el archivo
            
            console.log('object upload to bucket successful')
        } catch(error){
            console.error(error)
        }
    }
}