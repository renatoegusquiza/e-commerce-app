import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModel } from './model/ProductModel';
import { SupplierModel } from './model/SupplierModel';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    //? Add any necessary imports here
    TypeOrmModule.forRoot({
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
      }),
      TypeOrmModule.forFeature([DataSource]) //? es abstraccion por la cual voy a poder interactuar con mi BD
  ],
  exports: [TypeOrmModule]
})
export class PostgresModule {}
