import { Prisma } from 'prisma-outputs/postgres-client';
import prisma from '../../_core/prisma.pg';
import { SragListFilterDto } from '../dtos/sragList.dto';
import { HttpException } from '@/_common/exceptions/httpException';

export class ListService {
  static async getSragList(filters: SragListFilterDto) {
    try {
      const {
        page = 1,
        itemsPerPage = 20,
        sgUf,
        coMunRes,
        startDate,
        endDate,
        evolucao,
        uti,
        vacinaCov,
      } = filters;

      const whereClause: Prisma.SRAGWhereInput = {
        AND: [],
      };
      whereClause.AND = [];

      if (sgUf) {
        whereClause.AND.push({
          sgUf: sgUf,
        });
      }

      if (coMunRes) {
        whereClause.AND.push({
          coMunRes: coMunRes,
        });
      }

      if (startDate && endDate) {
        const newStartDate = new Date(startDate);
        const newEndDate = new Date(endDate);
        newStartDate.setHours(0, 0, 0, 0);
        newEndDate.setHours(23, 59, 59, 999);

        whereClause.AND.push({
          dtSinPri: {
            gte: newStartDate,
            lte: newEndDate,
          },
        });
      }

      if (evolucao) {
        whereClause.AND.push({
          evolucao: evolucao,
        });
      }

      if (uti) {
        whereClause.AND.push({
          uti: uti,
        });
      }

      if (vacinaCov) {
        whereClause.AND.push({
          vacinaCov: vacinaCov,
        });
      }

      const skip = (page - 1) * itemsPerPage;

      const [data, total] = await Promise.all([
        prisma.sRAG.findMany({
          where: whereClause,
          skip,
          take: itemsPerPage,
          orderBy: {
            dtSinPri: 'desc',
          },
          select: {
            uuid: true,
            nuNotific: true,
            dtNotific: true,
            dtSinPri: true,
            sgUf: true,
            coMunRes: true,
            csSexo: true,
            idadeNumerica: true,
            evolucao: true,
            uti: true,
            dtEntUti: true,
            dtSaiUti: true,
            vacinaCov: true,
            dose1Cov: true,
            dose2Cov: true,
            doseRef: true,
            createdAt: true,
          },
        }),
        prisma.sRAG.count({ where: whereClause }),
      ]);

      const totalPages = Math.ceil(total / itemsPerPage);

      return {
        data,
        pagination: {
          page,
          itemsPerPage,
          total,
          totalPages,
          hasNext: page < totalPages,
          hasPrev: page > 1,
        },
      };
    } catch (error) {
      throw new HttpException(400, 'Erro ao buscar lista de SRAG');
    }
  }
}
