import { Sequelize } from "sequelize-typescript";
import StoreCatalogFacadeFactory from "../factory/facade.factory";
import { ProductModel } from "../repository/product.model";

describe("StoreCatalogFacade test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        });
        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should find a product", async () => {
        const facade = StoreCatalogFacadeFactory.create();
        await ProductModel.create({
            id: "1",
            name: "product 1",
            description: "product 1 description",
            salesPrice: 10,
            stock: 10,
        });
        const result = await facade.find({ id: "1" });
        expect(result).toBeDefined();
        expect(result.id).toBe("1");
        expect(result.name).toBe("product 1");
        expect(result.description).toBe("product 1 description");
        expect(result.salesPrice).toBe(10);

    });

    it("should find all products", async () => {
        const facade = StoreCatalogFacadeFactory.create();
        await ProductModel.bulkCreate([
            {
                id: "1",
                name: "product 1",
                description: "product 1 description",
                salesPrice: 10,
                stock: 10,
            },
            {
                id: "2",
                name: "product 2",
                description: "product 2 description",
                salesPrice: 20,
                stock: 20,
            }
        ]);
        const result = await facade.findAll();
        expect(result).toBeDefined();
        expect(result.products.length).toBe(2);
        expect(result.products[0].id).toBe("1");
        expect(result.products[0].name).toBe("product 1");
        expect(result.products[0].description).toBe("product 1 description");
        expect(result.products[0].salesPrice).toBe(10);
        expect(result.products[1].id).toBe("2");
        expect(result.products[1].name).toBe("product 2");
        expect(result.products[1].description).toBe("product 2 description");
        expect(result.products[1].salesPrice).toBe(20);
    });

});