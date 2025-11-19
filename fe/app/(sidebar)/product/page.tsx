"use client";
import api from "@/app/lib/api/fetcher";
import { getAllProducts } from "@/app/lib/api/product";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
  SheetFooter,
  Sheet,
} from "@/components/ui/sheet";
import { Label } from "@radix-ui/react-label";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";

import useSWR, { mutate } from "swr";

export default function Product() {
  const { data, error, isLoading } = useSWR<{ id: string; name: string, price: number}[]>(
    "/products", // <- KEY
    getAllProducts // <- FETCHER, SEM EXECUTAR
  );
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  if (isLoading) return <p className='p-4'>Loading...</p>;
  if (error) return <p className='p-4 text-red-500'>{error.message}</p>;

  const handleCreateProduct = async () => {
    const res = await api.post("/product", {
      name,
      price,
    });
    if (res.status !== 201) throw new Error("Failed to create product");
    mutate("/products");
    setOpen(false);
    setLoading(false);
  };
  return (
    <div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant='outline'>Novo</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Produto</SheetTitle>
            <SheetDescription>Insira os dados do produto</SheetDescription>
          </SheetHeader>
          <div className='grid flex-1 auto-rows-min gap-6 px-4'>
            <div className='grid gap-3'>
              <Label htmlFor='name'>Nome</Label>
              <Input onChange={(e) => setName(e.target.value)} id='name' />
            </div>
            <div className='grid gap-3'>
              <Label htmlFor='price'>Preço</Label>
              <Input
                onChange={(e) => setPrice(Number(e.target.value))}
                id='price'
              />
            </div>
          </div>
          <SheetFooter>
            {loading ? (
              <Button disabled>
                <LoaderCircle className='animate-spin' />
              </Button>
            ) : (
              <Button onClick={handleCreateProduct}>Save changes</Button>
            )}
            <SheetClose asChild>
              <Button variant='outline'>Close</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <h1 className='text-2xl font-bold'>Produtos</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <ul className='space-y-3'>
          {data?.map((product) => (
            <li
              key={product.id}
              className='flex items-center justify-between p-4 rounded-xl border bg-white shadow-sm hover:shadow-md transition'
            >
              <span className='text-gray-900 font-medium'>{product.name}</span>
              <span className='text-green-600 font-semibold'>
                R$ {product.price}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
