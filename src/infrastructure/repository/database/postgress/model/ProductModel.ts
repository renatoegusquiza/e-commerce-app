//import { Supplier } from "src/domain/entity/Supplier";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { SupplierModel } from "./SupplierModel";

@Entity({name: 'product'})
export class ProductModel{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 200})
    name: string;

    @Column({length: 500})
    description: string;

    @ManyToOne(() => SupplierModel)
    supplier: SupplierModel
}