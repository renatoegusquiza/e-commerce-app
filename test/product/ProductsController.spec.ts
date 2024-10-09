import { CustomException } from '../../src/common/CustomException';
import { ProductService } from '../../src/application/service/ProductService';
import { MailerRepository } from '../../src/domain/repository/MailerRepository';
//import { MetadataRepository } from '../../src/domain/repository/MetadataRepository';
import { ProductRepository } from '../../src/domain/repository/ProductRepository';
import { SupplierRepository } from '../../src/domain/repository/SupplierRepository';
import { ProductController } from '../../src/infrastructure/controller/ProductController';
import { MetadataRepository } from 'src/domain/repository/MetadataRepository';

describe('ProductController', () => {
    let productController: ProductController;
    let productService: ProductService;
    let productRepository: ProductRepository = {
        findById: jest.fn(),
        create: jest.fn()
    };
    let supplierRepository: SupplierRepository = { findById: jest.fn() };
    let metadataRepository: MetadataRepository = { upload: jest.fn() };
    let mailerRepository: MailerRepository = { sendEmail: jest.fn() };

    beforeEach(() => {
        productService = new ProductService(
            productRepository,
            supplierRepository,
            metadataRepository,
            mailerRepository
        );
        productController = new ProductController(productService);
    });
    describe('Test create', () => {
        it('Test happy path to create product use case', async () => {
            const result = {
                id: 0,
                name: '',
                description: '',
                supplier: { id: 0, name: '', address: '' }
            };
            jest
            .spyOn(supplierRepository, 'findById')
            .mockResolvedValue({ id: 0, name: '', address: '' });
            jest.spyOn(productRepository, 'create').mockResolvedValue(result);
            jest.spyOn(mailerRepository, 'sendEmail').mockResolvedValue();
            jest.spyOn(metadataRepository, 'upload').mockResolvedValue();

            expect(
                await productController.create({
                    name: '',
                    description: '',
                    supplierId: 1
                })
            ).toBe(result);
        });
        it('Test to create product use case with error', async () => {
            const result = {
                id: 0,
                name: '',
                description: '',
                supplier: { id: 0, name: '', address: '' }
            };
            jest.spyOn(supplierRepository, 'findById').mockResolvedValue(null);
            jest.spyOn(productRepository, 'create').mockResolvedValue(result);
            jest.spyOn(mailerRepository, 'sendEmail').mockResolvedValue();
            jest.spyOn(metadataRepository, 'upload').mockResolvedValue();

            let response: any;
            try {
                response = await productController.create({
                    name: '',
                    description: '',
                    supplierId: 2
                });
            } catch (error) {
                response = error;
            }

            expect(response.message).toBe('Not Found');
        });
    });
});
