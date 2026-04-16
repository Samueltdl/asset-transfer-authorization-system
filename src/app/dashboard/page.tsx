import { SummaryCards } from "@/components/dashboard/summary-cards";

export const dynamic = "force-dynamic";

export default function DashboardPage() {
  return (
    <div className="flex flex-col space-y-6 px-6 pb-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Visão geral do controle de patrimônios e autorizações.
        </p>
      </div>

      <SummaryCards />
    </div>
  );
}
