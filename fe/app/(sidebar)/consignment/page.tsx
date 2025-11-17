"use client";
import { getConsignments } from "@/app/lib/api/consignment";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Consignment } from "@/interfaces/consignment-order.interface";
import Link from "next/link";

import useSWR from "swr";

export default function ConsignmentPage() {
  const { data, error, isLoading } = useSWR<Consignment[]>(
    "/consignments",
    getConsignments
  );

  if (isLoading) return <p className='p-4'>Loading...</p>;
  if (error) return <p className='p-4 text-red-500'>{error.message}</p>;
  if (!data?.length)
    return (
      <p className='p-4'>{error?.message || "Resultados não encontrados"}</p>
    );
  return (
    <div>
      <Link href={"/consignment/create"} >
        <Button>Novo</Button>
      </Link>
      <h1 className='text-2xl font-bold'>Consignados</h1>
      <ul>
        {data?.map((item) => {
          return (
            <Card key={item.id}>
              <CardHeader>
                <CardTitle>{item.name}</CardTitle>
                <CardDescription>{item.phone_number}</CardDescription>
              </CardHeader>
            </Card>
          );
        })}
      </ul>
    </div>
  );
}
