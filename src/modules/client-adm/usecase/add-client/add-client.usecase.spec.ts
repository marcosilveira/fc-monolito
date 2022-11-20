import AddClientUseCase from "./add-client.usecase";

const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn(),
    };
};



describe("Add client usecase unit test", () => {

    it("should add a client", async () => {
        const repository = MockRepository();
        const usecase = new AddClientUseCase(repository);

        const input = {
            name: "John Doe",
            email: "email1@.com",
            address: "address 1",
        };

        const result = await usecase.execute(input);
        expect(repository.add).toHaveBeenCalled();
        expect(result.id).toBeDefined();
        expect(result.name).toEqual(input.name);
        expect(result.email).toEqual(input.email);
        expect(result.address).toEqual(input.address);


    });

});