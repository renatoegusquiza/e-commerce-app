
//? Estamos creando un mensaje de error customizado

export class CustomException extends Error{
    statusCode: number
    details: any
    constructor(message: string, statusCode: number, details: any) {
        super(message); //? tenemos que pasar los campos obligatorios que me pide la clase padre
        this.statusCode = statusCode;
        this.details = details;
    }
}