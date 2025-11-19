"use client";
import { getConsignments } from "@/app/lib/api/consignment";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

  return (
    <div className='space-8-4'>
      <Link href={"/consignment/create"}>
        <Button>Novo</Button>
      </Link>
      <h1 className='text-2xl font-bold'>Consignados</h1>
      {data?.length === 0 && <p>Não há consignados cadastrados</p>}
      {data?.length &&
        data?.map((consignment) => (
          <Card key={consignment.id}>
            <CardHeader>
              <CardTitle>{consignment.name}</CardTitle>
              <CardDescription>{consignment.phone_number}</CardDescription>
            </CardHeader>
          </Card>
        ))}
    </div>
  );
}
