import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { notFound } from "next/navigation";
import { PrintAuthorizationButton } from "@/components/authorizations/print-authorization-button";
import { getAuthorizationById } from "@/actions/get-authorization-by-id";

export default async function PrintAuthorizationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // 1. Resolvendo a Promise para obter o ID como string
  const resolvedParams = await params;
  const stringId = resolvedParams.id;

  // 2. Convertendo a string para número
  const numericId = Number(stringId);

  // 3. Se não for um número válido ou estiver ausente, encerra aqui
  if (!stringId || isNaN(numericId)) {
    console.error("ID inválido recebido na URL:", stringId);
    return notFound();
  }

  const authorization = await getAuthorizationById(numericId);

  if (!authorization) return notFound();

  return (
    // O 'print:p-0' e 'print:m-0' removem as margens na hora de imprimir.
    <div className="min-h-screen bg-white text-black p-8 print:p-0 mx-auto max-w-4xl font-sans text-sm">
      {/* Componente que aciona a janela de impressão automaticamente */}
      <PrintAuthorizationButton />

      {/* Cabeçalho do Documento */}
      <div className="text-center border-b-2 border-black pb-2">
        <h1 className="text-xl font-bold uppercase">
          Termo de Responsabilidade e Saída de Ativos
        </h1>
        <p className="text-gray-600">
          Documento de Controle Interno - Controle de Patrimônio
        </p>
      </div>

      {/* Dados da Autorização */}
      <div className="grid grid-cols-2 space-y-2 mb-1 border-b-2 border-black py-2">
        <p>
          <strong>Nº da Autorização:</strong> {authorization.id}
        </p>
        <p>
          <strong>Data da Solicitação:</strong>{" "}
          {format(new Date(authorization.createdAt), "dd/MM/yyyy 'às' HH:mm", {
            locale: ptBR,
          })}
        </p>
        <p>
          <strong>Registrado por:</strong> {authorization.user.name}
        </p>
        <p>
          <strong>Responsável pela Retirada:</strong>{" "}
          {authorization.responsible}
        </p>
        <p>
          <strong>Origem:</strong> {authorization.origin}
        </p>
        <p>
          <strong>Destino:</strong> {authorization.destination}
        </p>
        <p>
          <strong>Motivo:</strong> {authorization.motive}
        </p>
      </div>

      {/* Tabela de Patrimônios */}
      <div>
        <h3 className="font-bold text-lg">Itens Autorizados:</h3>
        <table className="w-full border-collapse border border-black text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-black px-2 w-1/4">Nº Patrimônio</th>
              <th className="border border-black px-2 w-2/4">Descrição</th>
              <th className="border border-black px-2 w-1/4 text-center">
                Quantidade
              </th>
            </tr>
          </thead>
          <tbody>
            {authorization.items.map((item) => (
              <tr key={item.id}>
                <td className="border border-black px-2 font-mono">
                  {item.assetNumber}
                </td>
                <td className="border border-black px-2">
                  {item.itemDescription}
                </td>
                <td className="border border-black px-2 text-center">
                  {item.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Área de Assinaturas */}
      <div className="grid grid-cols-3 mt-15 text-xs">
        <div className="flex flex-col items-center">
          <div className="w-50 border-t border-black"></div>
          <p className="font-bold">{authorization.user.name}</p>
          <p>Visto da Autorização</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-50 border-t border-black"></div>
          <p className="font-bold">{authorization.responsible}</p>
          <p>Visto do Responsável pela Retirada</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-50 border-t border-black"></div>
          <p>Visto e Data de Retorno</p>
        </div>
      </div>
    </div>
  );
}
