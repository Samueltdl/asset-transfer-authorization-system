import prisma from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PackageOpen, CalendarDays } from "lucide-react";

export async function SummaryCards() {
  // Descobrir a data do primeiro dia do mês atual
  const today = new Date();
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  // Total de Movimentações no Mês
  const totalMonthMovements = await prisma.authorization.count({
    where: {
      isDeleted: false,
      createdAt: {
        gte: startOfMonth,
      },
    },
  });

  // Total de Ativos Fora (emprestados)
  const activeAssetsOut = await prisma.authorizationItem.count({
    where: {
      authorization: {
        isDeleted: false,
        authorizationStatus: "APPROVED",
        returnedAt: null,
      },
    },
  });

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
      {/* Card 1: Ativos Fora */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total de Ativos Fora
          </CardTitle>
          <PackageOpen className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{activeAssetsOut}</div>
          <p className="text-xs text-muted-foreground mt-1">
            Equipamentos aguardando devolução
          </p>
        </CardContent>
      </Card>

      {/* Card 2: Movimentações no Mês */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Movimentações (Mês)
          </CardTitle>
          <CalendarDays className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalMonthMovements}</div>
          <p className="text-xs text-muted-foreground mt-1">
            Autorizações geradas neste mês
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
