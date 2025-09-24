import { Prisma } from 'prisma-outputs/postgres-client';
import prisma from '../../_core/prisma.pg';
import { SragChartFilterDto, SragChartDataDto } from '../dtos/sragChart.dto';

export class ChartService {
  static async getChartData(filters: SragChartFilterDto): Promise<SragChartDataDto[]> {
    try {
      const { period = 'monthly', region, startDate, endDate, groupBy = 'state' } = filters;

      const whereClause: Prisma.SRAGWhereInput = {
        AND: [],
      };

      whereClause.AND = [];

      if (region) {
        if (groupBy === 'state') {
          whereClause.AND.push({
            sgUf: {
              equals: region,
              mode: 'insensitive',
            },
          });
        } else {
          whereClause.AND.push({
            coMunRes: {
              equals: region,
              mode: 'insensitive',
            },
          });
        }
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

      if (whereClause.AND.length > 0) {
        whereClause.AND = whereClause.AND;
      }

      const rawData = await prisma.sRAG.findMany({
        where: whereClause,
        select: {
          dtSinPri: true,
          evolucao: true,
          uti: true,
          vacinaCov: true,
          sgUf: true,
          coMunRes: true,
        },
        take: 10000,
      });

      const groupedData = this.groupDataByPeriod(rawData, period, groupBy);

      return groupedData;
    } catch (error) {
      console.error('Error in ChartService.getChartData:', error);
      throw new Error('Failed to fetch chart data');
    }
  }

  private static groupDataByPeriod(
    data: Array<{
      dtSinPri: Date | null;
      evolucao: number | null;
      uti: number | null;
      vacinaCov: number | null;
      sgUf: string | null;
      coMunRes: string | null;
    }>,
    period: string,
    groupBy: string,
  ): SragChartDataDto[] {
    const groups: { [key: string]: SragChartDataDto } = {};

    for (const item of data) {
      if (!item.dtSinPri) continue;

      try {
        const date = new Date(item.dtSinPri);

        if (isNaN(date.getTime())) continue;

        let periodKey: string;
        let regionKey: string;

        switch (period) {
          case 'daily':
            periodKey = date.toISOString().split('T')[0];
            break;
          case 'monthly':
            periodKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
            break;
          case 'yearly':
            periodKey = String(date.getFullYear());
            break;
          default:
            periodKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        }

        if (groupBy === 'state') {
          regionKey = item.sgUf || 'N/A';
        } else {
          regionKey = item.coMunRes || 'N/A';
        }

        const key = `${periodKey}-${regionKey}`;

        if (!groups[key]) {
          groups[key] = {
            date: this.createDateFromPeriodKey(period, periodKey),
            cases: 0,
            deaths: 0,
            icuOccupancy: 0,
            vaccinations: 0,
            region: regionKey,
          };
        }

        const currentGroup = groups[key] as SragChartDataDto;

        currentGroup.cases = (currentGroup.cases || 0) + 1;

        if (item.evolucao === 2) {
          currentGroup.deaths = (currentGroup.deaths || 0) + 1;
        }

        if (item.uti === 1) {
          currentGroup.icuOccupancy = (currentGroup.icuOccupancy || 0) + 1;
        }

        if (item.vacinaCov === 1) {
          currentGroup.vaccinations = (currentGroup.vaccinations || 0) + 1;
        }
      } catch (error) {
        console.warn('Error processing item:', error, item);
        continue;
      }
    }

    return Object.values(groups).sort(
      (a: SragChartDataDto, b: SragChartDataDto) =>
        new Date(a.date).getTime() - new Date(b.date).getTime(),
    );
  }

  private static createDateFromPeriodKey(period: string, periodKey: string): Date {
    try {
      if (period === 'daily') {
        return new Date(periodKey);
      } else if (period === 'monthly') {
        return new Date(periodKey + '-01');
      } else if (period === 'yearly') {
        return new Date(periodKey + '-01-01');
      }
      return new Date(periodKey + '-01');
    } catch (error) {
      console.warn('Error creating date from period key:', periodKey);
      return new Date();
    }
  }
}
