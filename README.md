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

O servidor usa a porta 3333 por padrão; configure PORT para escolher outra. Consulte as rotas em src/routes.ts. O endpoint GET http://localhost:3333/health retorna o estado básico do servidor.

## Testes e verificação manual

O package.json não define scripts de teste, então yarn test não está configurado. Para uma verificação inicial, consulte /health. Depois, use uma rota GET existente e dados descartáveis no banco local para validar criação e leitura de registros. O cadastro valida nome, formato do e-mail e tamanho mínimo da senha; e-mails são normalizados para minúsculas.

## Cuidados conhecidos

Uploads aceitam JPG, PNG ou WEBP até 5 MB. Pedidos devem ser alterados apenas enquanto estiverem em rascunho; valide autorização e transições antes de uso com clientes. O projeto ainda precisa de testes de integração e política explícita de CORS para produção.