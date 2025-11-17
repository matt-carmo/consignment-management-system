"use client";

import useSWR from "swr";

import { ComboboxDemo } from "@/components/ComboBox";
import { api } from "@/app/lib/api/fetcher";
import { CounterItem } from "@/components/CounterItem";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function NewOrderPage() {
  const router = useRouter();

  const { data, error, isLoading } = useSWR("multi-fetch", async () => {
    const [consignments, products] = await Promise.all([
      api.get("/consignments"),
      api.get("/products"),
    ]);

    return { consignments, products };
  });

  const [products, setProducts] = useState<
    { id: string; quantitySent?: number; name: string }[]
  >([]);

  useEffect(() => {
    if (data?.products?.data) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setProducts(data.products.data);
    }
  }, [data]);
  const [currentConsignment, setCurrentConsignment] = useState<string>("");
  if (isLoading) return <p className='p-4'>Loading...</p>;
  if (error) return <p className='p-4 text-red-500'>{error.message}</p>;

  const searchableData = data?.consignments.data.map(
    (consignment: { id: string; name: string }) => ({
      value: consignment.id,
      label: `${consignment.name}`,
    })
  );

  async function createOrder() {
    return await api.post("/consignment-order", {
      consignmentId: currentConsignment,
    });
  }
  async function createOrdersProducts({ orderId }: { orderId: string }) {
    const payload = products.filter((item) => (item.quantitySent || 0) > 0).map((item) => ({
      itemId: item.id,
      quantitySent: item.quantitySent,
    }));



    return await api.post(`/consignment-order-item/${orderId}`, 
       payload,
    );
  }
  async function handleCreateOrder() {
    
    const order = await createOrder();
    const orderId = order.data.id;

    const response = await createOrdersProducts({ orderId });
    if (response.status === 201) {
      router.push(`/consignment-order/${orderId}`);
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
        <CounterItem
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          items={products.map((item: any) => ({
            id: item.id,
            name: item.name,
            count: 0,
            max: 100,
            price: item.price,
          }))}
          onChangeItens={(items) => {
            setProducts(
              items.map((item) => ({
                id: item.id,
                quantitySent: item.count,
                name: item.name,
              }))
            );
          }}
        />
      </ul>
      <Button onClick={handleCreateOrder}>Criar Pedido</Button>
    </div>
  );
}
