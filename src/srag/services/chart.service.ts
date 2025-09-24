import { Prisma } from 'prisma-outputs/postgres-client';
import prisma from '../../_core/prisma.pg';
import { SragChartFilterDto, SragChartDataDto } from '../dtos/sragChart.dto';

export class ChartService {
  static async getChartData(filters: SragChartFilterDto): Promise<SragChartDataDto[]> {
    const { period = 'monthly', region, startDate, endDate, groupBy = 'state' } = filters;

    const whereClause: Prisma.SRAGWhereInput = {
      AND: [],
    };
    whereClause.AND = [];

    if (region) {
      if (groupBy == 'state') {
        whereClause.AND.push({
          sgUf: region,
        });
      } else {
        whereClause.AND.push({
          coMunRes: region,
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

    // Buscar dados brutos
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
    });

    // Agrupar dados por período
    const groupedData = this.groupDataByPeriod(rawData, period, groupBy);

    return groupedData;
  }

  private static groupDataByPeriod(
    data: any[],
    period: string,
    groupBy: string,
  ): SragChartDataDto[] {
    const groups: { [key: string]: SragChartDataDto } = {};

    data.forEach((item) => {
      if (!item.dtSinPri) return;

      const date = new Date(item.dtSinPri);
      let periodKey: string;
      let regionKey: string;

      // Determinar chave do período
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

      // Determinar chave da região
      if (groupBy === 'state') {
        regionKey = item.sgUf || 'N/A';
      } else {
        regionKey = item.coMunRes || 'N/A';
      }

      const key = `${periodKey}-${regionKey}`;

      if (!groups[key]) {
        groups[key] = {
          date:
            period === 'daily'
              ? date
              : new Date(periodKey + (period === 'monthly' ? '-01' : '-01-01')),
          cases: 0,
          deaths: 0,
          icuOccupancy: 0,
          vaccinations: 0,
          region: regionKey,
        };
      }

      // Contar casos
      if (groups[key].cases) {
        groups[key].cases++;
      }

      // Contar óbitos
      if (item.evolucao === 2) {
        if (groups[key].deaths) {
          groups[key].deaths++;
        }
      }

      // Contar UTI
      if (item.uti === 1) {
        if (groups[key].icuOccupancy) {
          groups[key].icuOccupancy++;
        }
      }

      // Contar vacinações
      if (item.vacinaCov === 1) {
        if (groups[key].vaccinations) {
          groups[key].vaccinations++;
        }
      }
    });

    // Converter para array e ordenar por data
    return Object.values(groups).sort(
      (a: SragChartDataDto, b: SragChartDataDto) =>
        new Date(a.date).getTime() - new Date(b.date).getTime(),
    ) as SragChartDataDto[];
  }
}
