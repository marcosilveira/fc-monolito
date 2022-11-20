import Id from "../../../@shared/domain/value-object/id.value-object";
import Address from "../../domain/address.value-object";
import Invoice from "../../domain/invoice.entity";
import Product from "../../domain/product.entity";
import FindInvoiceUseCase from "./find.usecase";


const mockInvoiceInput = {
    id: new Id("1"),
    name: "John Doe",
    document: "123456789",
    address: new Address({
        street: "Street",
        number: "123",
        complement: "Complement",
        city: "City",
        state: "State",
        zipCode: "123456",
    }),
    items: [
        new Product({
            id: new Id("1"),
            name: "Item 1",
            price: 10,
        }),
        new Product({
            id: new Id("2"),
            name: "Item 2",
            price: 20,
        }),
    ],
    total: 30,
    createdAt: new Date(),
};

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(mockInvoiceInput)),
        create: jest.fn(),
    };
};

describe("Find Invoice Use Case", () => {
    
    it("should find an invoice", async () => {
        const repository = MockRepository();
        const useCase = new FindInvoiceUseCase(repository);
        const result = await useCase.execute({ id: "1" });
        expect(result.id).toBeDefined();
        expect(repository.find).toBeCalled();
        expect(result.name).toBe(mockInvoiceInput.name);
        expect(result.document).toBe(mockInvoiceInput.document);
        expect(result.address.street).toBe(mockInvoiceInput.address.street);
        expect(result.address.number).toBe(mockInvoiceInput.address.number);
        expect(result.address.complement).toBe(mockInvoiceInput.address.complement);
        expect(result.address.city).toBe(mockInvoiceInput.address.city);
        expect(result.address.state).toBe(mockInvoiceInput.address.state);
        expect(result.address.zipCode).toBe(mockInvoiceInput.address.zipCode);
        expect(result.items[0].id).toBe(mockInvoiceInput.items[0].id.id);
        expect(result.items[0].name).toBe(mockInvoiceInput.items[0].name);
        expect(result.items[0].price).toBe(mockInvoiceInput.items[0].price);
        expect(result.items[1].id).toBe(mockInvoiceInput.items[1].id.id);
        expect(result.items[1].name).toBe(mockInvoiceInput.items[1].name);
        expect(result.items[1].price).toBe(mockInvoiceInput.items[1].price);
        expect(result.total).toBe(mockInvoiceInput.total);
        expect(result.createdAt).toBe(mockInvoiceInput.createdAt);
    });


});
