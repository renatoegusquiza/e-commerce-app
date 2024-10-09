//import { Supplier } from "src/domain/entity/Supplier";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'supplier'})
export class SupplierModel{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 200})
    name: string;

    @Column({length: 500})
    address: string;
}