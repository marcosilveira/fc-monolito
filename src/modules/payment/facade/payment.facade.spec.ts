import { Sequelize } from "sequelize-typescript";
import PaymentFacadeFacroty from "../factory/payment.facade.factory";
import { TransactionModel } from "../repository/transaction.model";
import TransactionRepository from "../repository/transaction.repository";
import ProcessPaymentUseCase from "../usecase/process-payment/process-payment.usecase";
import PaymentFacade from "./payment.facade";

describe("PaymentFacade test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        });
        await sequelize.addModels([TransactionModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a transaction", async () => {
        const repository = new TransactionRepository();
        const usecase = new ProcessPaymentUseCase(repository);
        const facade = new PaymentFacade(usecase);
        const input = {
            orderId: "order-1",
            amount: 100,
        };
        const output = await facade.process(input);

        expect(output.transactionId).toBeDefined();
        expect(output.orderId).toEqual(input.orderId);
        expect(output.amount).toEqual(input.amount);
        expect(output.status).toEqual("approved");

    });

    it("should create a transaction using facade factory", async () => {
        const facade = PaymentFacadeFacroty.create();
        const input = {
            orderId: "order-1",
            amount: 100,
        };
        const output = await facade.process(input);

        expect(output.transactionId).toBeDefined();
        expect(output.orderId).toEqual(input.orderId);
        expect(output.amount).toEqual(input.amount);
        expect(output.status).toEqual("approved");

    });
});