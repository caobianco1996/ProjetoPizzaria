import prismaClient from '../../prisma';
import { hash } from 'bcryptjs';
import { AppError } from '../../errors/AppError';

interface UserRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  async execute({ name, email, password }: UserRequest) {
    const normalizedName = typeof name === 'string' ? name.trim() : '';
    const normalizedEmail =
      typeof email === 'string' ? email.trim().toLowerCase() : '';

    if (!normalizedName) {
      throw new AppError(400, 'Informe um nome.');
    }
    if (
      normalizedEmail.length > 254 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)
    ) {
      throw new AppError(400, 'Informe um e-mail válido.');
    }
    if (typeof password !== 'string' || password.length < 8) {
      throw new AppError(400, 'A senha deve ter pelo menos 8 caracteres.');
    }

    const userAlreadyExists = await prismaClient.user.findFirst({
      where: {
        email: {
          equals: normalizedEmail,
          mode: 'insensitive'
        }
      }
    });

    if (userAlreadyExists) {
      throw new AppError(409, 'Já existe uma conta com este e-mail.');
    }

    const passwordHash = await hash(password, 10);
    return prismaClient.user.create({
      data: {
        name: normalizedName,
        email: normalizedEmail,
        password: passwordHash,
      },
      select: {
        id: true,
        name: true,
        email: true
      }
    });
  }
}

export { CreateUserService };
