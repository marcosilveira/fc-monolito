import Id from "../../@shared/domain/value-object/id.value-object";
import Address from "./address.value-object";
import Invoice from "./invoice.entity";
import Product from "./product.entity";

describe("Invoice unit tests", () => {

    it("should create an invoice", () => {
        const product = new Product({
            name: "Product 1",
            price: 100
        });
        const address = new Address({
            street: "Street 1",
            number: "1",
            complement: "Complement 1",
            city: "City 1",
            state: "State 1",
            zipCode: "ZipCode 1"
        });
        const invoice = new Invoice({
            id: new Id("1"),
            name: "Invoice 1",
            document: "Document 1",
            address: address,
            items: [product],
        });
        expect(invoice).toBeDefined();
        expect(invoice.id.id).toBe("1");
        expect(invoice.name).toBe("Invoice 1");
        expect(invoice.document).toBe("Document 1");
        expect(invoice.address).toEqual(address);
        expect(invoice.items).toEqual([product]);
        expect(invoice.total).toBe(100);

    });
});
