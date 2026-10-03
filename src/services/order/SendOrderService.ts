import prismaClient from "../../prisma";

interface OrderRequest {
  order_id: string;
}

class SendOrderService {
  async execute({ order_id }: OrderRequest) {
    const order = await prismaClient.order.findUnique({ where: { id: order_id } });
    if (!order) throw new Error("Pedido não encontrado");
    if (!order.draft) throw new Error("Pedido já enviado");

    const itemCount = await prismaClient.item.count({ where: { order_id } });
    if (itemCount === 0) throw new Error("Adicione ao menos um item antes de enviar o pedido");

    return prismaClient.order.update({
      where: { id: order_id },
      data: { draft: false }
    });
  }
}

export { SendOrderService };
