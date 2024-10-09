import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
//import { Supplier } from "src/domain/entity/Supplier";
import {v4 as uuidv4} from 'uuid'

@Schema()
export class ProductModel{
    @Prop({type: String, default: uuidv4()})
    //? Define la propiedad _id como una cadena con un valor por defecto generado por uuidv4
    _id: number;

    @Prop({required: true})
    //? Define la propiedad name como una cadena obligatoria
    name: string;

    @Prop()
    //? Define la propiedad description como una cadena opcional
    description: string;

    @Prop()
    //? Define la propiedad supplierId como un número opcional
    supplierId: number;
}

export const ProductSchema = SchemaFactory.createForClass(ProductModel);
//? Crea un esquema Mongoose a partir de la clase ProductModel

export type ProductDocument = HydratedDocument<ProductModel>
//? Define el tipo ProductDocument como un HydratedDocument de ProductModel