# 📦 Sistema de Autorização de Saída de Patrimônio

Uma aplicação web full-stack desenvolvida com o intuito de modernizar, digitalizar e automatizar o controle de movimentação de ativos físicos.

O sistema substitui o controle manual, tradicionalmente feito através de planilhas eletrônicas (Excel), oferecendo um fluxo de aprovação seguro, registro detalhado de itens por número de patrimônio e geração de termos de responsabilidade para impressão.

## ✨ Funcionalidades

- **Autenticação e Autorização:** Controle de acesso seguro com níveis de permissão (_ADMIN_ e _USER_).

- **Gestão de Autorizações:** Criação de solicitações de saída contendo origem, destino, responsável pela retirada, motivo, observações e a lista de itens com seus respectivos números de patrimônio.

- **Fluxo de Status:** Acompanhamento do ciclo de vida da autorização (PENDENTE, APROVADA e DEVOLVIDA).

- **Impressão de Termos:** Geração de documento para impressão do termo de responsabilidade no momento da aprovação.

- **Gestão de Usuários:** Interface administrativa para cadastro, edição e inativação de contas do sistema.

- **Tabelas Inteligentes:** Listagem de dados com paginação otimizada direto no banco de dados.

## 🛠️ Tecnologias Utilizadas

### O projeto foi construído utilizando as seguintes tecnologias e ferramentas:

- **Frontend:** Next.js (App Router), React, TypeScript, Tailwind CSS.

- **Componentes e UI:** shadcn/ui, Lucide Icons.

- **Formulários e Validação:** React Hook Form e Zod.

- **Backend:** Next.js Server Actions e Route Handlers.

- **Banco de Dados:** PostgreSQL 15.

- **ORM:** Prisma (v7).

- **Infraestrutura:** Docker e Docker Compose.

## 🚀 Como Executar o Projeto Localmente

### Pré-requisitos:

- Certifique-se de ter o Node.js (versão 20+) e o PostgreSQL instalados na sua máquina.

### Passos para Instalação

- **Clone o repositório:**

  ```
  git clone https://github.com/Samueltdl/asset-transfer-authorization-system.git

  cd asset-transfer-authorization-system
  ```

- **Instale as dependências:**

  ```
  npm install
  ```

- **Configure as Variáveis de Ambiente:**

  Renomeie o arquivo `.env.example` para `.env` na raiz do projeto e configure as credenciais do banco e a chave de autenticação (pode ser gerada uma aleatória em: https://generate-secret.vercel.app/32).

  ```
  DATABASE_URL="Sua url de conexão com o banco de dados"
  AUTH_SECRET="Sua chave secreta do Auth.js"
  ```

- **Suba o schema no seu banco de dados:**

  ```
  npx prisma db push
  ```

- **Gere o Prisma Client:**

  ```
  npx prisma generate
  ```

- **Rode a seed de criação do usuário administrador inicial:**

  ```
  npx prisma db seed
  ```

  **OBS:** As credenciais do usuário gerado na seed são:
  - e-mail: admin@admin.com.br
  - senha: admin

- **Inicie o Servidor de Desenvolvimento:**

  ```
  npm run dev
  ```

### - Acesse a aplicação em http://localhost:3000.

##

### 🤝 Autor

Desenvolvido por Samuel Trindade de Lemos

Bacharel em Sistemas de Informação pela FURG
