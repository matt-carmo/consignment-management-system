"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ConsignmentOrder } from "@/interfaces/consignment-order.interface";
import { Package, Plus } from "lucide-react";
import Link from "next/link";
import useSWR from "swr";
import { getOrders } from "../lib/api/orders";


// import { fetcher } from "./lib/api/fetcher";


export default function ConsignmentOrderPage() {
   const { data, error, isLoading } = useSWR<ConsignmentOrder[]>(
    "/consignment-orders", // <- KEY
    getOrders                // <- FETCHER, SEM EXECUTAR
  );
  console.log(data, error, isLoading);
  const formattedDate = (date: Date) => {
    const dateObj = new Date(date);
    if (!dateObj) return "";
    return dateObj.toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (isLoading) return <p className='p-4'>Loading...</p>;
  if (error) return <p className='p-4 text-red-500'>{error.message}</p>;
  if (!data)
    return (
      <p className='p-4'>{error?.message || "Resultados não encontrados"}</p>
    );

  return (
    <div className='px-4 pt-4  container mx-auto'>
      <div className='mb-6'>
        <Link href={"/new-order"} className='rounded-full'>
          <Button variant='default' className='flex items-center gap-2'>
            <Plus className='w-4 h-4' />
            Novo pedido
          </Button>
        </Link>
      </div>
      <ul className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {data.map((order) => (
          <li key={order.id}>
            <Link
              href={`/consignment-order/${order.id}?name=${order.consignment.name}&phone_number=${order.consignment.phone_number}&created_at=${order.createdAt}`}
            >
              <Card
                className={`border-0 border-l-8 ${
                  order.paid ? "border-green-500" : "border-orange-500"
                }`}
              >
                <CardHeader>
                  <CardTitle className='flex items-center justify-between'>
                    {order.consignment.name}{" "}
                    <span className='text-gray-400 text-sm'>#{order.id}</span>
                  </CardTitle>
                  <CardDescription>
                    {formattedDate(order.createdAt)}
                  </CardDescription>
                </CardHeader>
                <CardContent className='flex items-center gap-2'>
                  <Package className='w-5 h-5 text-gray-600' />
                  <p> {order.quantitySent} items</p>
                </CardContent>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
