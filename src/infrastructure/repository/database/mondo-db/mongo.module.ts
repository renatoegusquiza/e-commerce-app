import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
/* import { ProductModel } from './model/ProductModel';
import { SupplierModel } from './model/SupplierModel'; */
import { DataSource } from 'typeorm';
import { ProductModel, ProductSchema } from './schema/ProductsSchema';
import { Product } from 'src/domain/entity/Product';

@Module({
  imports: [
    //? Add any necessary imports here
    /* TypeOrmModule.forRoot({
        type: 'postgres',
        host: '<HOST>',
        port: 5432,
        username: 'postgres',
        password: '<PASSWORD>',
        database: 'ecommercedb',
        entities: [ProductModel, SupplierModel], //? entidades que van a conformar mi base de datos
        synchronize: true, //? va a crear el esquema si no lo tiene
                            //! esto es solo para dev
        autoLoadEntities: true,
        ssl: {rejectUnauthorized: false}
      }), */
      MongooseModule.forRoot(
        //! aqui se pone la ruta que te dan cuando te creaas tu database en mongodb
      ), //? es abstraccion por la cual voy a poder interactuar con mi BD
      MongooseModule.forFeature([{name: ProductModel.name, schema: ProductSchema}])
  ],
  exports: [TypeOrmModule]
})
export class MongoModule {}
