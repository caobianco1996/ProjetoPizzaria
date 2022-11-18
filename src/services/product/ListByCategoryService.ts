import prismaClient from "../../prisma";

interface ProductRequest{
    category_id: string; // Só quero que me mande o category_id
}

class ListByCategoryService{
    async execute({category_id}: ProductRequest){
        // id-bebidas

        const findByCategory = await prismaClient.product.findMany({
            where:{
                category_id: category_id // busca todos os produtos onde a category_id for igual ao que mandou como parametro
            }
        });

        return findByCategory;
    }
}

export { ListByCategoryService}