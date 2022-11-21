import { Item } from "@prisma/client";
import prismaClient from "../../prisma";

interface ItemREquest{
    item_id: string;
}

class RemoveItemService {
    async execute({item_id}: ItemREquest){

        const order = await prismaClient.item.delete({
            where:{
                id: item_id
            }
        })

        return order;
    }
}

export {RemoveItemService}