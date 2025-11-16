import { Prisma } from "@prisma/client";
import { server } from "../server";

export class ConsignmentOrderItemRepository {

    create(data: Prisma.ConsignmentOrderItemCreateInput) {
        return server.prisma.consignmentOrderItem.create({ data });
    }
    createMany(data: Prisma.ConsignmentOrderItemCreateManyInput[]) {
        return server.prisma.consignmentOrderItem.createMany({
            data
        });
    }
    update({ id, data }: { id: string; data: Prisma.ConsignmentOrderItemUncheckedUpdateInput }) {
        return server.prisma.consignmentOrderItem.update({
            where: { id: Number(id) },
            data,
        });
    }
    delete(id: number) {
        return server.prisma.consignmentOrderItem.delete({
            where: { id },
        });
    }
    constructor() {}
    
}