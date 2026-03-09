"use client";

import {
  LayoutDashboard,
  PlusCircle,
  History,
  LogOut,
  ShieldCheck,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Dialog, DialogTrigger } from "./ui/dialog";
import { useState } from "react";
import { CreateAuthorizationForm } from "./create-authorization-form";
import { logout } from "@/lib/actions";

const menuItems = [
  {
    title: "Painel Geral",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Histórico / Gestão",
    url: "/dashboard/authorizations",
    icon: History,
  },
];

export function AppSidebar() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center gap-2 font-semibold text-primary">
          <ShieldCheck className="h-6 w-6" />
          <span className="truncate">Sistema de Ativos</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Gestão de Ativos</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              <SidebarMenuItem>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <SidebarMenuButton
                      className="cursor-pointer"
                      tooltip="Nova Autorização"
                    >
                      <PlusCircle />
                      <span>Nova Autorização</span>
                    </SidebarMenuButton>
                  </DialogTrigger>
                  <CreateAuthorizationForm />
                </Dialog>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="cursor-pointer" onClick={logout}>
              <LogOut />
              <span>Sair do Sistema</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
