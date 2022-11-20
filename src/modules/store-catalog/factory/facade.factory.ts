import StoreCatalogFacade from "../facade/store-catalog.facade";
import ProductRepository from "../repository/product.repository";
import FindAllProductsUsecase from "../usecase/find-all-products/find-all-products.usecase";
import FindProductUseCase from "../usecase/find-product/find-product.usecase";

export default class StoreCatalogFacadeFactory {
    public static create(): StoreCatalogFacade {
        const productRepository = new ProductRepository();
        const findProductUseCase = new FindProductUseCase(productRepository);
        const findAllProductUseCase = new FindAllProductsUsecase(productRepository);
        const storeCatalogFacade = new StoreCatalogFacade({
            findUseCase: findProductUseCase,
            findAllUseCase: findAllProductUseCase,
        });
        return storeCatalogFacade;
        
    }
}