import { SupplierRepository } from "src/domain/repository/SupplierRepository";
import { SupplierModel } from "./model/SupplierModel";
import { Supplier } from "src/domain/entity/Supplier";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "src/common/Injectable";
import { Repository } from "typeorm";

@Injectable()
export class PostgresSupplierRespository implements SupplierRepository{
    constructor(
        @InjectRepository(SupplierModel)
        private supplierRepository: Repository<SupplierModel>
    ){}

    /* async create(supplier: Supplier): Promise<Supplier>{
        await this.supplierRepository.save(supplier)
        return supplier
    } */

    findById(id: number): Promise<Supplier> {
        return this.supplierRepository.findOneBy({id})
    }
}