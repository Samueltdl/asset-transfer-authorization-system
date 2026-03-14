"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";

export function PrintAuthorizationButton() {
  // Abre a janela de impressão assim que a página carregar
  useEffect(() => {
    window.print();
  }, []);

  return (
    // O print:hidden esconde este botão na hora que o PDF for gerado ou impresso.
    <div className="mb-6 flex justify-end print:hidden">
      <Button
        onClick={() => window.print()}
        className="bg-blue-500 hover:bg-blue-600 text-white cursor-pointer"
      >
        <Printer className="mr-2 w-4 h-4" />
        Imprimir Novamente
      </Button>
    </div>
  );
}
