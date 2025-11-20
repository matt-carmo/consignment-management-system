"use client";

import { api } from "@/app/lib/api/fetcher";
import { CounterItem } from "@/components/CounterItem";
import { Button } from "@/components/ui/button";
import {
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerClose,
  Drawer,
} from "@/components/ui/drawer";
import { ConsignmentOrderItem } from "@/interfaces/consignment-order.interface";
import { JSX, useState } from "react";
import { mutate } from "swr";

interface PayConsignmentOrder {
  items: {
    id: number;
    quantitySent?: number;
    quantityReturned: number;
  }[];
  paid: boolean;
  paidAt: Date;
  paidValue?: number;
}
export function DrawnerPayment({
  consignmentOrderItems,
  totalValue,
  orderId,
  paid,
}: {
  consignmentOrderItems: ConsignmentOrderItem[];
  totalValue: number;
  paid: boolean;
  orderId: number;
}): JSX.Element {
  const [total, setTotal] = useState(totalValue);

  const [items, setItems] = useState<PayConsignmentOrder["items"]>(
    consignmentOrderItems.map((item) => ({
      id: item.id,
      quantitySent: item.quantitySent,
      quantityReturned: item.quantityReturned,
    }))
  );
  const [open, setOpen] = useState(false);
  const handlePayment = async () => {
    try {
      const response = await api.put(`/consignment-order/${orderId}/pay`, {
        items,
        paid: true,
      });

      if (response.status === 200) {
        mutate(`/consignment-order/${orderId}`);
        setOpen(false);
      }
    } catch (error) {
      console.error("Erro ao registrar pagamento:", error);
    }
  };

  return (
    <div className='flex gap-2 pb-2'>
      <Button variant={"ghost"} className='border-gray-300 border'>
        Voltar
      </Button>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button
            onClick={() => {
              
              setTotal(totalValue);
            }}
            className='flex-1'
          >
            {paid ? "Alterar pagamento" : "Registrar pagamento"}
          </Button>
        </DrawerTrigger>
        <DrawerContent className='max-w-4xl mx-auto'>
          <DrawerHeader>
            <DrawerTitle>Registrar pagamento</DrawerTitle>
          </DrawerHeader>

          <DrawerFooter>
            <CounterItem
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              items={consignmentOrderItems.map((item: any) => ({
                id: item.id,
                name: item.itemNameSnapshot,
                count: item.quantitySent - item.quantityReturned,
                max: item.quantitySent,
                price: item.itemPriceSnapshot,
              }))}
              onChangeItens={(items) => {
                setItems(
                  items.map((item) => ({
                    id: Number(item.id),
                    quantitySent: item.max,
                    quantityReturned: item.max - item.count,
                  }))
                );
                setTotal(
                  items.reduce((acc, item) => acc + item.price * item.count, 0)
                );
              }}
            />

            <div>Total a pagar: R$ {total.toFixed(2)}</div>

            <Button onClick={handlePayment}>Confirmar</Button>
            <DrawerClose asChild>
              <Button className='flex-1' variant='outline'>
                Cancelar
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
