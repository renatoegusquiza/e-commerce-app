
import { Injectable as NestInjectable } from '@nestjs/common'
//? Importa el decorador 'Injectable' de NestJS y lo renombra como 'NestInjectable'

export function Injectable(){
    return NestInjectable() //? La función simplemente devuelve el decorador 'NestInjectable' de NestJS
}