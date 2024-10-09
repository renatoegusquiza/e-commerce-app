import { Supplier } from "../entity/Supplier";

export abstract class SupplierRepository {  //? Define una clase abstracta que va a ser usada como
                                            //? una interfaz o contrato

    abstract findById(id: number): Promise<Supplier> 
    //? Esta función lo que hace es recibe un "id" numérico y devuelve una promesa
    //? que resuelve un Product
}