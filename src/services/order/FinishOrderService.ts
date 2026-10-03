import prismaClient from "../../prisma";

interface OrderRequest {
  order_id: string;
}

class FinishOrderService {
  async execute({ order_id }: OrderRequest) {
    const order = await prismaClient.order.findUnique({ where: { id: order_id } });
    if (!order) throw new Error("Pedido não encontrado");
    if (order.draft) throw new Error("Envie o pedido antes de finalizá-lo");
    if (order.status) throw new Error("Pedido já finalizado");

    return prismaClient.order.update({
      where: { id: order_id },
      data: { status: true }
    });
  }
}

export { FinishOrderService };
