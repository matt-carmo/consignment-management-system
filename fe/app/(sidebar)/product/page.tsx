"use client";
import api from "@/app/lib/api/fetcher";
import { getAllProducts } from "@/app/lib/api/product";

import {
  AlertDialogHeader,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

import {
  Item,
  ItemContent,
  ItemTitle,
  ItemDescription,
  ItemActions,
} from "@/components/ui/item";

import { formatMoneyBRL } from "@/lib/formatMoneyBRL";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

import { Trash } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import { useState } from "react";

import useSWR, { mutate } from "swr";
import { SheetCustom } from "@/components/sheet";
import BRLInput from "@/components/BRLCurrencyInput";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Product() {
  const searchParams = useSearchParams();

  const { data, error, isLoading } = useSWR<
    { id: string; name: string; price: number }[]
  >(
    "/products", // <- KEY
    getAllProducts // <- FETCHER, SEM EXECUTAR
  );
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const router = useRouter();
  if (isLoading) return <p className='p-4'>Loading...</p>;
  if (error) return <p className='p-4 text-red-500'>{error.message}</p>;
  const isCreateMode = searchParams.get("mode") === "create";
  const handleSetModeParams = ({
    mode,
    itemId,
  }: {
    mode: "create" | "edit";
    itemId?: string;
  }) => {
    const params = new URLSearchParams(searchParams.toString());
    if (mode === "create") {
      params.set("mode", "create");
      params.delete("id");
    } else {
      params.set("mode", "edit");
      params.set("id", itemId as string);
    }
    router.replace(`?${params.toString()}`);
    return params.toString();
  };

  const handleEditProduct = async ({ id }: { id: string }) => {
    setLoading(true);
    const res = await api.put(`/product/${id}`, {
      name,
      price,
    });
    if (res.status !== 200) throw new Error("Failed to update product");
  };

  const handleDeleteProduct = async ({ id }: { id: string }) => {
    setLoading(true);
    const res = await api.delete(`/product/${id}`);
    if (res.status !== 204) throw new Error("Failed to delete product");
    mutate("/products");
    setOpen(false);
    setLoading(false);
  };
  const handleAction = async () => {
    setLoading(true);
    if (isCreateMode) {
      await handleCreateProduct();
    } else {
      await handleEditProduct({ id: searchParams.get("id") as string });
    }
    mutate("/products");
    setOpen(false);
    setLoading(false);
  };
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
    <div className='space-y-2'>
      <Button  onClick={() => {
        handleSetModeParams({ mode: "create" });
        setName("");
        setPrice(0);
        setOpen(true);
      }} variant='secondary'>Novo</Button>
      <SheetCustom
        label={isCreateMode ? "Novo produto" : "Editar produto"}
        loading={loading}
        open={open}
        handleAction={handleAction}
        setOpen={() => setOpen(false)}
      >
        <div className='grid flex-1 auto-rows-min gap-6 px-4'>
          <div className='grid gap-3'>
            <Label htmlFor='name'>Nome</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              id='name'
            />
          </div>
          <div className='grid gap-3'>
            <Label htmlFor='price'>Preço</Label>
            <BRLInput onChange={(e) => setPrice(e)} value={price} />
          </div>
        </div>
      </SheetCustom>

      <h1 className='text-2xl font-bold'>Produtos</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <ul className='border rounded-lg'>
          {data?.map((product) => (
            <li className='border-b last:border-none' key={product.id}>
              <Item
                className='border-0 py-2 px-2 hover:bg-muted rounded-none cursor-pointer'
                variant='outline'
              >
                <ItemContent
                  onClick={() => {
                    handleSetModeParams({ mode: "edit", itemId: product.id });
                    setName(product.name);
                    setPrice(product.price * 100);
                    setOpen(true);
                  }}
                  className='gap-0'
                >
                  <ItemTitle>{product.name}</ItemTitle>
                  <ItemDescription>
                    {formatMoneyBRL(product.price)}
                  </ItemDescription>
                </ItemContent>
                <ItemActions>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant='ghost' size='sm'>
                        <Trash className='text-red-500' />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Essa ação vai excluir o registro do produto
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() =>
                            handleDeleteProduct({ id: product.id })
                          }
                        >
                          Continuar
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </ItemActions>
              </Item>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
