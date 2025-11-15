
export interface ConsignmentOrder {
  id: number;
  consignmentId: string;
  createdAt: Date;
  updatedAt: Date;
  paid: boolean;
  paidValue: number | null;
  paidAt: Date | null;
  consignment: Consignment;
  consignmentOrderItems: ConsignmentOrderItem[];
  quantitySent: number;
}

export interface ConsignmentOrderSummary {
    totalValue: number;
    totalValueReturn: number;
}

export interface Consignment {
  id: string;
  idx: number;
  name: string;
  phone_number: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

export interface ConsignmentOrderItem {
  id: number;
  quantitySent: number;
  itemPrice: number;
  itemPriceSnapshot: string;
  itemNameSnapshot: string;
  quantityReturned: number;
}
