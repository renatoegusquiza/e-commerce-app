import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { CustomException } from "./CustomException";
import internal from "stream";

@Catch(CustomException)
export class CustomExceptionFilter implements ExceptionFilter{ //* ExceptionFilter es una interfaz de NestJS
    catch(exception: any, host: ArgumentsHost){
        const context = host.switchToHttp()
        const response = context.getResponse()

        response.status(exception.statusCode).json({    //? Aqui lo que decimos es que vuelva a setear el status
                                                        //? lo que viene en statusCode y complete la respuesta
                                                        //? con un JSON
            ...exception.details,
            error: exception.message || "Internal Error",
            statusCode: exception.statusCode || 500
        })   
    }
}
