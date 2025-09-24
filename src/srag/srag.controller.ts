import { Request, Response } from 'express';
import { SragService } from './srag.service';

export const health = async (_req: Request, _res: Response) => {
  _res.status(200).json({ status: 'ok' });
};

export const getMetrics = async (req: Request, res: Response): Promise<void> => {
  const region = req.query.region as string;
  const period = req.query.period as string;

  const response = await SragService.getMetrics(region, period);
  res.json(response);
};

export const getChartData = async (req: Request, res: Response): Promise<void> => {
  const filters = {
    period: req.query.period as 'daily' | 'monthly' | 'yearly',
    region: req.query.region as string,
    startDate: req.query.startDate ? new Date(req.query.startDate as string) : undefined,
    endDate: req.query.endDate ? new Date(req.query.endDate as string) : undefined,
    groupBy: req.query.groupBy as 'state' | 'city',
  };

  const response = await SragService.getChartData(filters);
  res.json(response);
};

export const getSragList = async (req: Request, res: Response): Promise<void> => {
  const filters = {
    page: req.query.page ? Number(req.query.page) : undefined,
    itemsPerPage: req.query.itemsPerPage ? Number(req.query.itemsPerPage) : undefined,
    sgUf: req.query.sgUf as string,
    coMunRes: req.query.coMunRes as string,
    startDate: req.query.startDate ? new Date(req.query.startDate as string) : undefined,
    endDate: req.query.endDate ? new Date(req.query.endDate as string) : undefined,
    evolucao: req.query.evolucao ? Number(req.query.evolucao) : undefined,
    uti: req.query.uti ? Number(req.query.uti) : undefined,
    vacinaCov: req.query.vacinaCov ? Number(req.query.vacinaCov) : undefined,
  };

  const response = await SragService.getSragList(filters);
  res.json(response);
};
