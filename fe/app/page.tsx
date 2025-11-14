"use client";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Package } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import useSWR from "swr";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Falha ao carregar os dados");
  }
  return res.json();
};
export default function ConsignmentOrderPage() {
  const params = useParams();

  const {
    data = [],
    error,
    isLoading,
  } = useSWR(`http://localhost:8080/consignment-orders`, fetcher);
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
  if (!data.length) return <p className='p-4'>{data.message}</p>;


  return (
    <div className='px-4 pt-8'>
      <ul className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {data.map((order: any) => (
          <li key={order.id}>
            <Link href={`/consignment-order/${order.id}`}>
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
