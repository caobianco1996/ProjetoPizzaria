# Projeto Pizzaria

API Express/TypeScript para usuários, categorias, produtos e pedidos. Usa PostgreSQL via Prisma e suporta upload de imagens de produtos.

## Requisitos

- Node.js e Yarn
- PostgreSQL
- Variável `DATABASE_URL`
- Variáveis de autenticação requeridas pelo fluxo JWT

## Desenvolvimento

```sh
yarn install
yarn prisma generate
yarn prisma migrate dev
yarn dev
```

O servidor de desenvolvimento escuta a porta 3333. Configure `DATABASE_URL` localmente e não faça commit de segredos. Confira `prisma/schema.prisma` e migrations antes de alterar o banco.

## Segurança e validação

Uploads aceitam imagens JPG, PNG ou WEBP com limite de 5 MB. Pedidos devem ser alterados apenas enquanto estiverem em rascunho; valide autorização e transições antes de usar com clientes reais. O projeto ainda precisa de testes de integração, política explícita de CORS e configuração de produção.
