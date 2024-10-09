import { Supplier } from "src/domain/entity/Supplier";
import { Injectable } from "src/common/Injectable";
import { SupplierRepository } from "src/domain/repository/SupplierRepository";

@Injectable()
export class InMemorySupplierRepository implements SupplierRepository {
    //? Arreglo que almacena los proveedores en memoria

    private supplier: Supplier[] = [{id: 1, name: 'Proveedor 1', address: ''}];

    async findById(id: number): Promise<Supplier> {
        const supplier = this.supplier.find((supplier) => supplier.id === id);
        //? Busca un proveedor en el arreglo por su ID

        return supplier ? supplier : null;
        //? Devuelve el proveedor encontrado o null si no existe
    }
}
