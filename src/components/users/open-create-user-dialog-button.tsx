"use client";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { CreateUserForm } from "./create-user-form";
import { useState } from "react";

export function OpenCreateUserDialogButton() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-500 hover:bg-blue-600">
          <PlusCircle />
          <span>Novo Usuário</span>
        </Button>
      </DialogTrigger>
      <CreateUserForm setOpen={setIsDialogOpen} />
    </Dialog>
  );
}
