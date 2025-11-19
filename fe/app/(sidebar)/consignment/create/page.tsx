"use client";
import { createConsignment } from "@/app/lib/api/consignment";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function ConsignmentCreatePage() {
  const [form, setForm] = useState({
    name: "",
    phone_number: "",
  });

  const [loading, setLoading] = useState(false);
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    setLoading(true);
    e.preventDefault();
    const res = await createConsignment(form);
    if (res) {
      window.location.href = "/consignment";
    }
    setLoading(false);
  }
  return (
    <div className='mx-auto'>
      <Button className="rounded-full" variant={"secondary"} asChild>
        <Link href={"/consignment"}><ArrowLeft /></Link>
      </Button>
      <h1 className='text-2xl font-bold'>Criar Novo Consignado</h1>
      <form className='space-y-2' onSubmit={handleSubmit}>
        <Input
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder='Nome'
        />
        <Input
          onChange={(e) => setForm({ ...form, phone_number: e.target.value })}
          placeholder='Telefone'
        />
        {loading ? (
          <Button disabled><LoaderCircle className="animate-spin" /></Button>
        ) : (
          <Button type='submit'>Criar</Button>
        )}
      </form>
    </div>
  );
}
