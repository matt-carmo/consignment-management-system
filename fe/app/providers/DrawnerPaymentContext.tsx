import { createContext, useContext, useState } from "react";

interface PaymentContextValue {
  consignmentOrderItems: unknown[];
  totalValue: number;
  total: number;
  setTotal: React.Dispatch<React.SetStateAction<number>>;
}

interface PaymentProviderProps {
  totalValue: number;
  consignmentOrderItems: unknown[];
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
  const [items, setItems] = useState(consignmentOrderItems);


  return (
    <PaymentContext.Provider value={{ consignmentOrderItems, totalValue, total, setTotal, items, setItems }}>
      {children}
    </PaymentContext.Provider>
  );
}