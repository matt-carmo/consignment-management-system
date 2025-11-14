"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Minus, Plus } from "lucide-react";

import { useParams } from "next/navigation";
import useSWR from "swr";
import { DrawnerPayment } from "./components/DrawnerPayment";
import { PaymentProvider } from "@/app/providers/DrawnerPaymentContext";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ConsignmentOrderPage() {
  const params = useParams();
  const { data, error, isLoading } = useSWR(
    `http://localhost:8080/consignment-order/${params.id}`,
    fetcher
  );
  if (isLoading) return <p className='p-4'>Loading...</p>;
  if (error) return <p className='p-4 text-red-500'>Failed to load data</p>;
  if (!data) return <p className='p-4'>No data found</p>;

  const {
    id,
    totalValue,
    totalValueReturn,
    paid,
    createdAt,
    consignmentOrderItems,
  } = data;

  return (
    <PaymentProvider
      totalValue={totalValue}
      consignmentOrderItems={consignmentOrderItems}
      // totalValueReturn={totalValueReturn}
      // paid={paid}
    >
      <div className='max-w-6xl mx-auto p-6 space-y-6'>
        {/* Header */}
        <h1 className='text-2xl font-bold text-gray-800'>Order #{id}</h1>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <Card className='bg-white rounded-2xl py-4 gap-0'>
            <CardHeader>
              <h2 className='text-lg font-semibold text-gray-700'>Itens</h2>
            </CardHeader>
            <CardContent className='divide-y'>
              {consignmentOrderItems.map((item: any) => (
                <div
                  key={item.id}
                  className='flex justify-between py-3 text-sm'
                >
                  <div>
                    <p className='font-medium text-gray-800'>
                      {item.itemNameSnapshot}
                    </p>
                    <p className='text-gray-500'>
                      Enviado{item.quantitySent > 1 ? "s" : ""}:{" "}
                      {item.quantitySent} | Retornado
                      {item.quantitySent > 1 ? "s" : ""}:{" "}
                      {item.quantityReturned}
                    </p>
                  </div>
                  <div className='text-right'>
                    <p>
                      R$ {parseFloat(item.itemPriceSnapshot).toFixed(2)} ×{" "}
                      {item.quantitySent}
                    </p>
                    <p className='font-semibold text-gray-800'>
                      R${" "}
                      {(parseFloat(item.itemPriceSnapshot) * item.quantitySent).toFixed(
                        2
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className='bg-white rounded-2xl shadow p-5'>
            <h2 className='text-lg font-semibold mb-3 text-gray-700 flex items-center justify-between'>
              Resumo do Pagamento
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                  paid
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {paid ? "Pago" : "Pendente"}
              </span>
            </h2>
            <div className='space-y-2 text-sm'>
              <div className='flex justify-between'>
                <span>Total do valor enviado</span>
                <span>R$ {totalValue.toFixed(2)}</span>
              </div>
              <div className='flex justify-between'>
                <span>Total do valor retornado</span>
                <span>R$ {totalValueReturn.toFixed(2)}</span>
              </div>
              <hr />
              <div className='flex justify-between font-semibold text-gray-900'>
                <span>Total {paid ? "pago" : "estimado pendente"}</span>
                <span>R$ {(totalValue - totalValueReturn).toFixed(2)}</span>
              </div>
            </div>
          </div>
          <div className='bg-white rounded-2xl shadow p-5 text-sm'>
            <h2 className='text-lg font-semibold mb-3 text-gray-700'>
              Informações do Pedido
            </h2>
            <p>
              <span className='font-medium'>Criado em:</span>{" "}
              {new Date(createdAt).toLocaleString()}
            </p>
          </div>
        </div>
        <DrawnerPayment consignmentOrderItems={consignmentOrderItems} />
      </div>
    </PaymentProvider>
  );
}
