import { ERRORS } from "../errors/app.errors";
import { ConsigmentsOrdersRepository } from "../repositories/consigments-orders.repository";


export class ConsigmentsOrdersService {
  constructor(private repository: ConsigmentsOrdersRepository) {}
  public async findAllById({ consignmentId }: { consignmentId: string }) {
    
    const consigmentsOrders = await this.repository.findAllById({consignmentId})
    
    if(!consigmentsOrders.length){
      throw new Error(ERRORS.CONSIGMENTS_NOT_FOUND)
    }
    return consigmentsOrders
  }
}
