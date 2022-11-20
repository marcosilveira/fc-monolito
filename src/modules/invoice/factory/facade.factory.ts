import InvoiceFacade from "../facade/invoice.facade";
import InvoiceRepository from "../repository/invoice.repository";
import FindInvoiceUseCase from "../usecase/find/find.usecase";
import GenerateInvoiceUseCase from "../usecase/generate/generate.usecase";

export default class InvoiceFacadeFactory {
    static create() {
        const repository = new InvoiceRepository();
        const CreateUsecase = new GenerateInvoiceUseCase(repository);
        const FindUsecase = new FindInvoiceUseCase(repository);
        const inventoryFacade = new InvoiceFacade({
            create: CreateUsecase,
            find: FindUsecase
        });

        return inventoryFacade;
    }

}