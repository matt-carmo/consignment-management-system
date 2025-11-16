'use client';
import { createConsignment } from "@/app/lib/api/consignment";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function ConsignmentCreatePage() {

  const [form, setForm] = useState({
    name: '',
    phone_number: ''
  })
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const res = await createConsignment(form)
    console.log(res)
  }
  return (
    <div>
      <h1 className='text-2xl font-bold'>Criar Novo Consignado</h1>
      <form onSubmit={handleSubmit}>
        <Input onChange={(e) => setForm({...form, name: e.target.value})} placeholder="Nome" />
        <Input onChange={(e) => setForm({...form, phone_number: e.target.value})} placeholder="Telefone" />
        <Button>Salvar</Button>
      </form>
    </div>
  );
}