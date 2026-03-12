"use client";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { CreateAuthorizationForm } from "./create-authorization-form";
import { useState } from "react";

export function OpenCreateAuthorizationDialogButton() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-500 hover:bg-blue-600">
          <PlusCircle />
          <span>Nova Autorização</span>
        </Button>
      </DialogTrigger>
      <CreateAuthorizationForm setOpen={setIsDialogOpen} />
    </Dialog>
  );
}
