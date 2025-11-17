 export interface PayConsignmentOrder {
    orderId: number;
    paid: boolean;
    paidAt: Date | null;
    paidValue?: number;
  }
  export interface PayConsignmentOrderItems {
    
      id: number;
      quantitySent?: number;
      quantityReturned: number;
    
  }
  