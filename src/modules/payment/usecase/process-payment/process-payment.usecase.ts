import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import Transaction from "../../domain/transaction";
import PaymentGateway from "../../gateway/payment.gateway";
import { ProcessPaymentInputDto, ProcessPaymentOutputDto } from "./process-payment.dto";

export default class ProcessPaymentUseCase implements UseCaseInterface{
    constructor(private transactionRepository: PaymentGateway){

    }

    async execute(input: ProcessPaymentInputDto): Promise<ProcessPaymentOutputDto> {
        const transaction = new Transaction({
            amount: input.amount,
            orderId: input.orderId,
        });
        transaction.process();
        const persistenceTransaction = await this.transactionRepository.save(transaction);
        return {
            transactionId: persistenceTransaction.id.id,
            orderId: persistenceTransaction.orderId,
            amount: persistenceTransaction.amount,
            status: persistenceTransaction.status,
            createdAt: persistenceTransaction.createdAt,
            updatedAt: persistenceTransaction.updatedAt,
        };
    }

}