import api from "@/app/lib/api/fetcher";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";

export function ModalDelete({ endpoint}: { endpoint: string }) {
  const router =  useRouter(); ;
  const handleDelete = async () => {
  
    try {
      await api.delete(endpoint);
        router.replace("/");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant='outline'>
          <Trash className='text-red-500' />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação vai excluir o registro
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Excluir</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
