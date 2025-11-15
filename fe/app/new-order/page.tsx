'use client'

import useSWR from "swr";
import { getConsignments } from "../lib/api/consignment";
import { Consignment } from "@/interfaces/consignment-order.interface";
import { ComboboxDemo } from "@/components/ComboBox";

export default function NewOrderPage() {

  const { data, error, isLoading } = useSWR<Consignment[]>(
    "/consignments", 
    getConsignments
  )
  
  const searchableData = data?.map((consignment) => ({
    value: consignment.id,
    label: `${consignment.name}`,
  }))
  return (
    <div className='max-w-4xl mx-auto p-6 flex flex-col gap-5'>
      <h1 className='text-2xl font-bold'>Criar Novo Pedido de Consignação</h1>
      <ComboboxDemo onChangeValue={(value) => {console.log(value)}} frameworks={searchableData || []} />
       
       <h2 className='text-xl font-bold'>Produtos</h2>

       
    </div>
  );
}