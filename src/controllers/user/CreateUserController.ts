import {Request, response, Response} from 'express'

import {CreateUserService} from '../../services/user/CreateUserService'

class CreateUserController{
    async handle(req: Request, res: Response){
        const {name, email, password} = req.body;

        const createUserService = new CreateUserService(); // Inicializa o serviço
        
        const user = await createUserService.execute({
            name,
            email,
            password
        }); //executa o serviço

        return res.json(user) // retorna pro controller
    }
}

export {CreateUserController}