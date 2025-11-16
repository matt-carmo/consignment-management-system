"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useParams } from "next/navigation";
import useSWR from "swr";
import { DrawnerPayment } from "./components/DrawnerPayment";
import { PaymentProvider } from "@/app/providers/DrawnerPaymentContext";
import { ConsignmentOrder } from "@/interfaces/consignment-order.interface";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ConsignmentOrderPage() {
  const params = useParams();
  const { data, error, isLoading } = useSWR<ConsignmentOrder>(
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
          {/* Card Itens */}
          <Card className='rounded-2xl py-4 gap-0'>
            <CardHeader>
              <h2 className='text-lg font-semibold text-gray-700'>Itens</h2>
            </CardHeader>
            <CardContent className='divide-y'>
              {consignmentOrderItems.map((item) => (
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
                      {item.quantityReturned > 1 ? "s" : ""}:{" "}
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
                      {(
                        parseFloat(item.itemPriceSnapshot) * item.quantitySent
                      ).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <div>
            <Card className='rounded-2xl py-4 gap-0'>
              <CardHeader className='pb-0'>
                <h2 className='text-lg font-semibold text-gray-700 flex items-center justify-between'>
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
              </CardHeader>

              <CardContent className='text-sm space-y-2 pt-4'>
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
              </CardContent>
            </Card>
          </div>

          <Card className='rounded-2xl py-4 gap-0'>
            <CardHeader>
              <h2 className='text-lg font-semibold text-gray-700'>
                Informações do Pedido
              </h2>
            </CardHeader>

            <CardContent className='text-sm'>
              <p>
                <span className='font-medium'>Criado em:</span>{" "}
                {new Date(createdAt).toLocaleString()}
              </p>
            </CardContent>
          </Card>
        </div>

        <DrawnerPayment consignmentOrderItems={consignmentOrderItems} />
      </div>
    </PaymentProvider>
  );
}
