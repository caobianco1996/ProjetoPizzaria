import { Request, Response } from "express";
import { CreateCategoryService } from "../../services/category/CreateCategoryService";

class CreateCategoryController{
    async handle(req: Request, res: Response){
        const { name } = req.body;
        
        const createCategoryService = new CreateCategoryService(); // Chama o serviço

        const category = await createCategoryService.execute({
            name
        }); // espera o serviço ser executado

        return res.json(category);
    }
}

export {CreateCategoryController}