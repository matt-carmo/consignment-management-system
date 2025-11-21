"use client";
import {
  createConsignment,
  editConsignment,
  getConsignments,
} from "@/app/lib/api/consignment";

import { SheetCustom } from "@/components/sheet";
import {
  AlertDialogHeader,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { Consignment } from "@/interfaces/consignment-order.interface";

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


import useSWR, { mutate } from "swr";
import { useState } from "react";
import api from "@/app/lib/api/fetcher";
import { Spinner } from "@/components/ui/spinner";

export default function ConsignmentPage() {
  const { data, error, isLoading } = useSWR<Consignment[]>(
    "/consignments",
    getConsignments
  );
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [isCreateMode, setCreateMode] = useState(true);
  const [form, setForm] = useState({
    id: "",
    name: "",
    phone_number: "",
  });
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    setLoading(true);
    e.preventDefault();
    const res = await createConsignment(form);
    if (res) {
      window.location.href = "/consignment";
    }
    setLoading(false);
  }
  if (isLoading) return <p className='p-4'>Loading...</p>;
  if (error) return <p className='p-4 text-red-500'>{error.message}</p>;

  async function handleDeleteConsignment(id: string) {
    setLoading(true);
    const res = await api.delete(`/consignment/${id}`);

    if (res.status !== 204) throw new Error("Failed to fetch");
    mutate("/consignments");
    setLoading(false);
  }

  const handleAction = async () => {
    setLoading(true);

    if (isCreateMode) {
      await createConsignment({
        name: form.name,
        phone_number: form.phone_number,
      });
    } else {
      await editConsignment(form.id, {
        name: form.name,
        phone_number: form.phone_number,
      });
    }
    mutate("/consignments");
    setOpen(false);
    setLoading(false);
  };

  return (
    <div className='space-y-2'>
      <Button
        variant={"secondary"}
        onClick={() => {
          setOpen(true);
          setCreateMode(true);
        }}
      >
        Novo
      </Button>

      <SheetCustom
        label={isCreateMode ? "Novo consignado" : "Editar consignado"}
        loading={loading}
        open={open}
        handleAction={handleAction}
        setOpen={() => setOpen(false)}
      >
        <form className='space-y-2 px-4 ' onSubmit={handleSubmit}>
          <Input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder='Nome'
          />
          <Input
            value={form.phone_number}
            onChange={(e) => setForm({ ...form, phone_number: e.target.value })}
            placeholder='Telefone'
          />
        </form>
      </SheetCustom>

      <h1 className='text-2xl font-bold'>Consignados</h1>
      {data?.length === 0 && <p>Não há consignados cadastrados</p>}
      <ul className='border rounded-lg overflow-hidden'>
        {data?.length &&
          data?.map((consignment) => (
            <li className='border-b last:border-none' key={consignment.id}>
              <Item
                className='border-0 py-2 px-2 hover:bg-muted rounded-none cursor-pointer'
                variant='outline'
              >
                <ItemContent
                  onClick={() => {
                    // handleSetModeParams({ mode: "edit", itemId: product.id });
                    // setName(product.name);
                    // setPrice(product.price * 100);
                    setForm({
                      id: consignment.id,
                      name: consignment.name,
                      phone_number: consignment.phone_number,
                    });
                    setCreateMode(false);
                    setOpen(true);
                  }}
                  className='gap-0'
                >
                  <ItemTitle>{consignment.name}</ItemTitle>
                  <ItemDescription>{consignment.phone_number}</ItemDescription>
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
                          disabled={loading}
                          onClick={() =>
                            handleDeleteConsignment(consignment.id)
                          }
                        >
                          {loading && (
                            <ItemMedia>
                              <Spinner />
                            </ItemMedia>
                          )}
                          {!loading && "Excluir"}
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
  );
}
