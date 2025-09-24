import { MetricsService } from './services/metrics.service';
import { ChartService } from './services/chart.service';
import { ListService } from './services/list.service';
import { InitService } from './services/init.service';
import { SragMetricsDto } from './dtos/sragMetrics.dto';
import { SragChartFilterDto, SragChartDataDto } from './dtos/sragChart.dto';
import { SragListFilterDto } from './dtos/sragList.dto';

export class SragService {
  static async getMetrics(region?: string, period?: string): Promise<SragMetricsDto> {
    return await MetricsService.getMetrics(region, period);
  }

  static async getChartData(filters: SragChartFilterDto): Promise<SragChartDataDto[]> {
    return await ChartService.getChartData(filters);
  }

  static async getSragList(filters: SragListFilterDto) {
    return await ListService.getSragList(filters);
  }

  static async initIngestionIfEmpty(): Promise<void> {
    return await InitService.initIngestionIfEmpty();
  }

  static async ingestAllCsvFiles(): Promise<{ files: string[]; inserted: number } | void> {
    return await InitService.ingestAllCsvFiles();
  }
}
