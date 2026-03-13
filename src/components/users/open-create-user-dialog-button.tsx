"use client";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { CreateUserForm } from "./create-user-form";
import { useState } from "react";
import { toast } from "sonner";

export function OpenCreateUserDialogButton({ isAdmin }: { isAdmin: boolean }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Função para verificar se o usuário é admin antes de abrir o dialog
  const handleOpenClick = () => {
    if (!isAdmin) {
      toast.error("Apenas administradores podem criar novos usuários.");
      return;
    }
    setIsDialogOpen(true);
  };

  return (
    <>
      <Button
        className="bg-blue-500 hover:bg-blue-600"
        onClick={handleOpenClick}
      >
        <PlusCircle />
        <span>Novo Usuário</span>
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <CreateUserForm setOpen={setIsDialogOpen} />
      </Dialog>
    </>
  );
}
