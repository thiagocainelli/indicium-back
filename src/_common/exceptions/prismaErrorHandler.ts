import { Prisma } from '../../../prisma-outputs/postgres-client';
import { HttpException } from './httpException';

// Função para tratar erros do Prisma
export function handlePrismaError(error: any) {
  console.log(error);

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2002':
        throw new HttpException(409, `Duplicate field: ${error.meta?.target}`);
      case 'P2025':
        throw new HttpException(404, 'Record not found');
      default:
        throw new HttpException(400, `Database error: ${error.message}`);
    }
  }

  if (error instanceof HttpException) {
    throw error;
  }

  throw new HttpException(500, 'Unexpected database error');
}
