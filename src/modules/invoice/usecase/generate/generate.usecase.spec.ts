import GenerateInvoiceUseCase from "./generate.usecase";

const MockRepository = () => {
    return {
      create: jest.fn(),
      find: jest.fn(),
    };
};

  describe("GenerateInvoiceUseCase unit test", () => {

    it("should generate invoice", async () => {
        const mockInvoiceRepository = MockRepository();
        const usecase = new GenerateInvoiceUseCase(mockInvoiceRepository);

        const input = {
            name: "John Doe",
            document: "123456789",
            street: "Street",
            number: "123",
            complement: "Complement",
            city: "City",
            state: "State",
            zipCode: "123456",
            items: [
                {
                    id: "1",
                    name: "Item 1",
                    price: 10,
                },
                {
                    id: "2",
                    name: "Item 2",
                    price: 20,
                },
            ],
        };

        const result = await usecase.execute(input);
        expect(result.id).toBeDefined();
        expect(result.name).toBe(input.name);
        expect(result.document).toBe(input.document);
        expect(result.street).toBe(input.street);
        expect(result.number).toBe(input.number);
        expect(result.city).toBe(input.city);
        expect(result.state).toBe(input.state);
        expect(result.zipCode).toBe(input.zipCode);
        expect(result.items[0].id).toBe(input.items[0].id);
        expect(result.items[0].name).toBe(input.items[0].name);
        expect(result.items[0].price).toBe(input.items[0].price);
        expect(result.items[1].id).toBe(input.items[1].id);
        expect(result.items[1].name).toBe(input.items[1].name);
        expect(result.items[1].price).toBe(input.items[1].price);
        expect(result.total).toBe(30);
    });



  });