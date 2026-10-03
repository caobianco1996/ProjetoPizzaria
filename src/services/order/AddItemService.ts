import prismaClient from "../../prisma";

interface ItemRequest {
  order_id: string;
  product_id: string;
  amount: number;
}

class AddItemService {
  async execute({ order_id, product_id, amount }: ItemRequest) {
    if (!Number.isInteger(amount) || amount <= 0) {
      throw new Error("A quantidade deve ser um número inteiro maior que zero");
    }

    const order = await prismaClient.order.findUnique({ where: { id: order_id } });
    if (!order) throw new Error("Pedido não encontrado");
    if (!order.draft || order.status) throw new Error("Não é possível alterar um pedido enviado ou finalizado");

    const product = await prismaClient.product.findUnique({ where: { id: product_id } });
    if (!product) throw new Error("Produto não encontrado");

    return prismaClient.item.create({
      data: { order_id, product_id, amount }
    });
  }
}

export { AddItemService };
