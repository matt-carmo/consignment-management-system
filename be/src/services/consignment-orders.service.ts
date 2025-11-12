import { ERRORS } from "../errors/app.errors";
import { ConsignmentsOrdersRepository } from "../repositories/consignment-orders.repository";


export class ConsignmentOrdersService {
  constructor(private repository: ConsignmentsOrdersRepository) {}
  public async findAllById({ consignmentId }: { consignmentId: string }) {
    
    const consignmentsOrders = await this.repository.findAllById({consignmentId})
    
    if(!consignmentsOrders.length){
      throw new Error(ERRORS.Consignments_NOT_FOUND)
    }
    return {
        consignmentsOrders
    }
  }
}
