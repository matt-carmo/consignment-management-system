
import { describe, it, expect, vi } from "vitest";
import { ConsignmentsService } from "../services/consignment.service";

describe("Consignment", () => {
    it('Create consignment', async () => {

        const data = {
            name: 'Teste Name',
            phone_number: '18999999999',
            user: { connect: { id: '123' } }
        };
        const createConsignment = vi.fn().mockResolvedValue(data);

        const consignmentsRepository = {
            create: createConsignment
        }

        const create = new ConsignmentsService(consignmentsRepository as any);
        
        const result = await create.create(data);

        console.log(result);
        expect(result).toEqual(data);
    })
});