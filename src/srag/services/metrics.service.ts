import { Prisma } from 'prisma-outputs/postgres-client';
import prisma from '../../_core/prisma.pg';
import { SragMetricsDto } from '../dtos/sragMetrics.dto';

export class MetricsService {
  static async getMetrics(region?: string, period?: string): Promise<SragMetricsDto> {
    const whereClause: Prisma.SRAGWhereInput = {
      AND: [],
    };

    whereClause.AND = [];

    if (region) {
      whereClause.AND.push({
        sgUf: region,
      });
    }

    if (period) {
      const year = period.split('-')[0];
      const month = period.split('-')[1];
      const startDate = new Date(parseInt(year), parseInt(month) - 1, 1);
      const endDate = new Date(parseInt(year), parseInt(month), 0);

      whereClause.AND.push({
        dtSinPri: {
          gte: startDate,
          lte: endDate,
        },
      });
    }

    // Buscar dados do período atual
    const currentData = await prisma.sRAG.findMany({
      where: whereClause,
      select: {
        evolucao: true,
        uti: true,
        vacinaCov: true,
        dtSinPri: true,
      },
    });

    // Buscar dados do período anterior para calcular taxa de aumento
    const previousPeriodWhere = { ...whereClause };
    previousPeriodWhere.AND = [];

    if (period) {
      const year = period.split('-')[0];
      const month = period.split('-')[1];
      const prevMonth = parseInt(month) - 1;
      const prevYear = prevMonth === 0 ? parseInt(year) - 1 : parseInt(year);
      const prevMonthAdjusted = prevMonth === 0 ? 12 : prevMonth;

      const prevStartDate = new Date(prevYear, prevMonthAdjusted - 1, 1);
      const prevEndDate = new Date(prevYear, prevMonthAdjusted, 0);

      previousPeriodWhere.AND.push({
        dtSinPri: {
          gte: prevStartDate,
          lte: prevEndDate,
        },
      });
    }

    const previousData = await prisma.sRAG.findMany({
      where: previousPeriodWhere,
      select: {
        evolucao: true,
        uti: true,
        vacinaCov: true,
        dtSinPri: true,
      },
    });

    // Calcular métricas
    const totalCases = currentData.length;
    const totalDeaths = currentData.filter((c) => c.evolucao === 2).length;
    const totalIcu = currentData.filter((c) => c.uti === 1).length;
    const totalVaccinated = currentData.filter((c) => c.vacinaCov === 1).length;

    const previousCases = previousData.length;
    const previousDeaths = previousData.filter((c) => c.evolucao === 2).length;
    const previousIcu = previousData.filter((c) => c.uti === 1).length;
    const previousVaccinated = previousData.filter((c) => c.vacinaCov === 1).length;

    // Calcular taxas
    const caseIncreaseRate =
      previousCases > 0 ? ((totalCases - previousCases) / previousCases) * 100 : 0;

    const mortalityRate = totalCases > 0 ? (totalDeaths / totalCases) * 100 : 0;

    const icuOccupancyRate = totalCases > 0 ? (totalIcu / totalCases) * 100 : 0;

    const vaccinationRate = totalCases > 0 ? (totalVaccinated / totalCases) * 100 : 0;

    return {
      caseIncreaseRate: Math.round(caseIncreaseRate * 100) / 100,
      mortalityRate: Math.round(mortalityRate * 100) / 100,
      icuOccupancyRate: Math.round(icuOccupancyRate * 100) / 100,
      vaccinationRate: Math.round(vaccinationRate * 100) / 100,
      period: period || 'geral',
      region: region || 'Brasil',
    };
  }
}
