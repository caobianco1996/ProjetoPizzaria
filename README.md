# API de pizzaria — Express, Prisma e PostgreSQL

API em Express/TypeScript para usuários, categorias, produtos e pedidos. Usa PostgreSQL via Prisma e aceita upload de imagens de produtos.

## Requisitos

- Node.js compatível com TypeScript 4.8
- Yarn
- PostgreSQL

## Configuração e execução local

1. Crie um banco PostgreSQL local.
2. Configure DATABASE_URL no ambiente ou em um arquivo .env local não versionado. Exemplo:

~~~env
DATABASE_URL="postgresql://postgres:sua-senha-local@localhost:5432/pizzaria?schema=public"
~~~

3. Na raiz do repositório:

~~~sh
yarn install
yarn prisma generate
yarn prisma migrate dev
yarn dev
~~~

O servidor de desenvolvimento escuta na porta 3333. Consulte as rotas em src/routes para localizar os endpoints disponíveis.

## Testes e verificação manual

O package.json não define scripts de teste, então yarn test não está configurado. Para uma verificação inicial, mantenha a API em execução e consulte uma rota GET existente com navegador ou curl. Para testar criação/edição, use dados descartáveis no banco local e confira o estado persistido.

## Cuidados conhecidos

Uploads aceitam JPG, PNG ou WEBP até 5 MB. Pedidos devem ser alterados apenas enquanto estiverem em rascunho; valide autorização e transições antes de uso com clientes. O projeto ainda precisa de testes de integração, política explícita de CORS e configuração própria para produção.