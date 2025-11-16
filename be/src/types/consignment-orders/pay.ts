export interface PayConsignmentOrder {
    paidAt: Date | null;
    paid: boolean;
    paidValue: number;
    orderId: number;
}