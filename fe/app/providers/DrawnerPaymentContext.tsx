import { ConsignmentOrderSummary } from "@/interfaces/consignment-order.interface";
import { createContext, useContext, useState } from "react";

interface PaymentContextValue {
  consignmentOrderItems: ConsignmentOrderSummary[];
  items: ConsignmentOrderSummary[];
  setItems: React.Dispatch<React.SetStateAction<ConsignmentOrderSummary[]>>;
  totalValue: number;
  total: number;
  setTotal: React.Dispatch<React.SetStateAction<number>>;
}

interface PaymentProviderProps {
  totalValue: number;
  consignmentOrderItems: ConsignmentOrderSummary[];
  children: React.ReactNode;
}

const PaymentContext = createContext<PaymentContextValue | null>(null);

export function usePaymentContext () {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error("usePaymentContext must be used within a PaymentProvider");
  }
  return context;
}

export const PaymentProvider = ({ consignmentOrderItems, totalValue, children }: PaymentProviderProps) => {
  const [total, setTotal] = useState(totalValue);
  const [items, setItems] = useState<ConsignmentOrderSummary[]>(consignmentOrderItems);


  return (
    <PaymentContext.Provider value={{ consignmentOrderItems, totalValue, total, setTotal, items, setItems }}>
      {children}
    </PaymentContext.Provider>
  );
}