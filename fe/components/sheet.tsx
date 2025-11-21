import { LoaderCircle } from "lucide-react";
import { Button } from "./ui/button";
import {  SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetClose, Sheet } from "./ui/sheet";
import { JSX } from "react";


export function SheetCustom({ label, children, handleAction, loading, open, setOpen}: { open: boolean, setOpen: (open: boolean) => void, label: string, children: JSX.Element, handleAction: () => void, loading: boolean }): JSX.Element {
 
  return (
    <Sheet open={open} onOpenChange={setOpen}>
    
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            {label}
          </SheetTitle>
          <SheetDescription>Insira os dados do produto</SheetDescription>
        </SheetHeader>
        {children}
        <SheetFooter>
          {loading ? (
            <Button disabled>
              <LoaderCircle className='animate-spin' />
            </Button>
          ) : (
            <Button onClick={handleAction}>Salvar</Button>
          )}
          <SheetClose asChild>
            <Button variant='outline'>Cancelar</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
