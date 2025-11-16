"use client";

import useSWR from "swr";

import { ComboboxDemo } from "@/components/ComboBox";
import { api } from "@/app/lib/api/fetcher";
import { CounterItem } from "@/components/CounterItem";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function NewOrderPage() {

   const router = useRouter()

  const { data, error, isLoading } = useSWR("multi-fetch", async () => {
    const [consignments, products] = await Promise.all([
      api.get("/consignments"),
      api.get("/products"),
    ]);

    return { consignments, products };
  });


  const [products, setProducts] = useState<{ id: string; quantity?: number, name: string }[]>([]);

useEffect(() => {
  if (data?.products?.data) {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setProducts(data.products.data);
  }
}, [data]);
  const [currentConsignment, setCurrentConsignment] = useState<string>("");
  if (isLoading) return <p className='p-4'>Loading...</p>;
  if (error) return <p className='p-4 text-red-500'>{error.message}</p>;


  const searchableData = data?.consignments.data.map((consignment: { id: string; name: string }) => ({
    value: consignment.id,
    label: `${consignment.name}`,
  }));

  async function createOrder() {
    return await api.post("/consignment-order", {
      consignmentId: currentConsignment
    });
  }
  async function createOrdersProducts({orderId}: {orderId: string}) {
    return await api.post(`/consignment-order-item/${orderId}`, products
      .map((item) => ({
        itemId: item.id,
        quantitySent: item.quantity || 0,
      }))
      .filter((item) => item.quantitySent > 0)
  );
  }
  async function handleCreateOrder() {
    const order = await createOrder();
    console.log(order);
    const orderId = order.data.id;
    const response = await createOrdersProducts({orderId});
    if(response.status === 201) {
      router.push(`/consignment-order/${orderId}`)
    }

  }
  return (
    <div className='max-w-4xl mx-auto p-6 flex flex-col gap-5'>
      <h1 className='text-2xl font-bold'>Criar Novo Pedido de Consignação</h1>
      <ComboboxDemo
        onChangeValue={(value) => {
          setCurrentConsignment(value);
        }}
        frameworks={searchableData || []}
      />

      <h2 className='text-xl font-bold'>Produtos</h2>
      <ul className='flex flex-col gap-2 max-h-96 overflow-y-auto'>
        {products?.map((item) => {
          return (
            <CounterItem
              key={item.id}
              id={item.id}
              name={item.name}
              count={item.quantity || 0}
              onIncrement={() => {
                setProducts((prev) => {
                  return prev.map((it) => {
                    if (it.id === item.id) {
                      return {
                        ...it,
                        quantity: it.quantity ? it.quantity + 1 : 1,
                      };
                    }
                    return it;
                  });
                });
              }}
              onDecrement={() => {
                setProducts((prev) => {
                  return prev.map((it) => {
                    if (it.id === item.id) {
                      return {
                        ...it,
                        quantity: it.quantity ? it.quantity - 1 : 0,
                      };
                    }
                    return it;
                  });
                });
              }}
            />
          );
        })}
      </ul>
      <Button onClick={handleCreateOrder}>Criar Pedido</Button>
    </div>
  );
}
