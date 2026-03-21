"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PencilIcon, Eye, CircleChevronDown } from "lucide-react";
import { UserWithRelations } from "@/types";
import { UpdateUserForm } from "./update-user-form";
import { Dialog, DialogTrigger } from "../ui/dialog";

export function DropdownMenuUserActions({
  user,
  currentUserRole,
}: {
  user: UserWithRelations;
  currentUserRole: string;
}) {
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="cursor-pointer">
          <CircleChevronDown className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="cursor-pointer"
            onSelect={(e) => e.preventDefault()}
          >
            <Eye />
            Ver Detalhes
          </DropdownMenuItem>

          {currentUserRole === "ADMIN" && (
            <>
              <Dialog
                open={isUpdateDialogOpen}
                onOpenChange={setIsUpdateDialogOpen}
              >
                <DialogTrigger asChild>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onSelect={(e) => e.preventDefault()}
                  >
                    <PencilIcon />
                    Editar
                  </DropdownMenuItem>
                </DialogTrigger>
                <UpdateUserForm user={user} setOpen={setIsUpdateDialogOpen} />
              </Dialog>
            </>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
