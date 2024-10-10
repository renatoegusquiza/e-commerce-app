
import { Module } from '@nestjs/common';
import { ProductController } from './infrastructure/controller/ProductController';
import { ProductService } from './application/service/ProductService';
// import { InMemoryProductRepository } from './infrastructure/repository/in-memory/InMemoryProductRepository';
import { ProductRepository } from './domain/repository/ProductRepository';
import { SupplierRepository } from './domain/repository/SupplierRepository';
import { InMemorySupplierRepository } from './infrastructure/repository/database/in-memory/InMemorySupplierRepository';
import { DynamoProductRepository } from './infrastructure/repository/database/dynamo-db/DynamoProductRepository';
import { CacheController } from './infrastructure/controller/CacheController';
import { RedisCacheRepository } from './infrastructure/repository/cache/RedisCacheRepository';
import { CacheRepository } from './domain/repository/CacheRepository';
import { CacheService } from './application/service/CacheService';
import { InMemoryProductRepository } from './infrastructure/repository/database/in-memory/InMemoryProductRepository';
import { MetadataRepository } from './domain/repository/MetadataRepository';
import { NodeMailerRepository } from './infrastructure/repository/mail/NodemailerRepository';
import { MailerRepository } from './domain/repository/MailerRepository';
import { MyMailerModule } from './infrastructure/repository/mail/mailer.module';
// import { PostgresProductRepository } from './infrastructure/repository/postgres/PostgresProductRepository';
// import { PostgresSupplierRepository } from './infrastructure/repository/postgres/PostgresSupplierRepository';
import { AuthModule } from './auth/auth.module';
import { MongoModule } from './infrastructure/repository/database/mondo-db/mongo.module';
import { PostgresModule } from './infrastructure/repository/database/postgress/postgres.module';
import { MongoProductRepository } from './infrastructure/repository/database/mondo-db/MongoProductRepository';
import { S3MetadataRepository } from './infrastructure/repository/database/s3/S3MetadataRepository';

@Module({
  imports: [
    //PostgresModule,
    //MongoModule,
    MyMailerModule,
    AuthModule
  ],
  controllers: [ProductController, CacheController],
  providers: [
    ProductService,
    CacheService,
    InMemoryProductRepository,
    InMemorySupplierRepository,
    // PostgresProductRepository,
    // PostgresSupplierRepository,
    //MongoProductRepository,
    RedisCacheRepository,
    S3MetadataRepository,
    NodeMailerRepository,
    {
      provide: ProductRepository,
      useExisting: InMemoryProductRepository
    },
    {
      provide: SupplierRepository,
      useExisting: InMemorySupplierRepository
    },
    {
      provide: CacheRepository,
      useExisting: RedisCacheRepository
    },
    {
      provide: MetadataRepository,
      useExisting: S3MetadataRepository
    },
    {
      provide: MailerRepository,
      useExisting: NodeMailerRepository
    }
  ]
})
export class AppModule {}
