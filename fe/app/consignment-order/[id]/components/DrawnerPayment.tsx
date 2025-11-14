"use client";
import { usePaymentContext } from "@/app/providers/DrawnerPaymentContext";
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
import { Minus, Plus } from "lucide-react";
import { JSX, useState } from "react";

export function DrawnerPayment({ consignmentOrderItems }): JSX.Element {
  const { total, setTotal, totalValue } = usePaymentContext();
  const { items, setItems } = usePaymentContext();
  return (
    <div className='flex gap-2 '>
      <Button variant={"ghost"} className='border-gray-300 border'>
        Voltar
      </Button>
      <Drawer>
        <DrawerTrigger asChild>
          <Button onClick={() => {
             setTotal(totalValue)
             setItems(consignmentOrderItems)
          }} className='flex-1'>Continuar</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Registrar pagamento</DrawerTitle>
          </DrawerHeader>

          <DrawerFooter>
            <ul className='mb-4 w-full space-y-2'>
              {consignmentOrderItems.map((item: any) => (
                <ItemPaymentRow key={item.id} item={item} />
              ))}
            </ul>
            <div>Total a pagar: R$ {total.toFixed(2)}</div>

            <Button onClick={() => console.log(items)}>Confirmar</Button>
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

function ItemPaymentRow({ item }: { item: any }) {
 
  const [count, setCount] = useState(item.quantitySent);

  const { setTotal, items, setItems } = usePaymentContext();

 const handleIncrement = (id) => {
    if (count === item.quantitySent) return;
    const itemTotalPrice = Number(item.itemPriceSnapshot);
    setCount((prev: number) => prev + 1);
    setTotal(prevTotal => prevTotal + itemTotalPrice);
    setItems(prevItems => {
      return prevItems.map(it => {
        if (it.id === id) {
          return {
            ...it,
            quantityReturned: (it.quantityReturned || 0) - 1,
          };
        }
        return it;
      });
    });
  };

  const handleDecrement = (id) => {
    if (count === 0) return;
    const itemTotalPrice = Number(item.itemPriceSnapshot);
    setCount((prev: number) => prev - 1);
    setTotal(prevTotal => prevTotal - itemTotalPrice);
    setItems(prevItems => {
      return prevItems.map(it => {
        if (it.id === id) {
          return {
            ...it,
            quantityReturned: (it.quantityReturned || 0) + 1,
          };
        }
        return it;
      });
    });

  };

  return (
    <li className='flex items-center justify-between' key={item.id}>
      <div>{item.itemNameSnapshot}</div>
      <div>
        <Button
          onClick={() => handleDecrement(item.id)}
          className='px-5 py-4 h-0 rounded-lg text-2xl'
        >
          <Minus />
        </Button>
        <span className='mx-2'>{count}</span>
        <Button
          onClick={() => handleIncrement(item.id)}
          className='px-5 py-4 h-0 text-2xl'
        >
          <Plus />
        </Button>
      </div>
    </li>
  );
}
