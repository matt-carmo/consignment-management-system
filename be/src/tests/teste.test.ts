
import { describe, it, expect, vi } from "vitest";
import { ConsignmentsOrdersService } from "../services/consignment-orders.service";
const data = [
  {
    id: 1,
    consignmentId: "e784bd5a-dc89-4484-9fc8-11387b1a34f1",
    createdAt: "2025-11-08T22:35:07.517Z",
    updatedAt: "2025-11-08T22:34:55.092Z",
    paid: false,
    paidValue: null,
    paidAt: null,
    consignmentOrderItems: [
      {
        id: 3,
        consignmentOrderId: 1,
        itemId: 1,
        quantity: 2,
        itemPrice: "8.5",
      },
      {
        id: 4,
        consignmentOrderId: 1,
        itemId: 2,
        quantity: 4,
        itemPrice: "8.5",
      },
    ],
  },
];



describe("ConsignmentsOrdersService", () => {
  it("findAllById returns full consignment data with items", async () => {

    const mockRepository = {
      findAllById: vi.fn().mockResolvedValue(data),
    };

    const service = new ConsignmentsOrdersService(mockRepository);

    const result = await service.findAllById({ consignmentId: "1" });
    expect(result).toEqual(data);

    expect(mockRepository.findAllById).toHaveBeenCalledWith({
      consignmentId: "1",
    });

    
    
  });
  it("throws when empty result", async () => {
  const mockRepository = {
    findAllById: vi.fn().mockResolvedValue([]),
  };

  const service = new ConsignmentsOrdersService(mockRepository);

  await expect(service.findAllById({ consignmentId: "1" }))
    .rejects
    .toThrow("NOT_FOUND");
});

});

