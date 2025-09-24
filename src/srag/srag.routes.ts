import { Router } from 'express';
import { authenticateJWT } from '../_core/middlewares/auth.middleware';
import { health, getMetrics, getChartData, getSragList } from './srag.controller';

const router = Router();

/**
 * @swagger
 * /api/v1/srag/health:
 *   get:
 *     summary: Healthcheck do módulo SRAG
 *     tags: [SRAG]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: OK
 */
router.get('/health', authenticateJWT, health);

/**
 * @swagger
 * /api/v1/srag/metrics:
 *   get:
 *     summary: Obter métricas de SRAG
 *     tags: [SRAG]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: region
 *         schema:
 *           type: string
 *         description: Região (estado ou cidade)
 *         example: "SP"
 *       - in: query
 *         name: period
 *         schema:
 *           type: string
 *         description: Período no formato YYYY-MM
 *         example: "2024-01"
 *     responses:
 *       200:
 *         description: Métricas de SRAG
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SragMetricsDto'
 */
router.get('/metrics', authenticateJWT, getMetrics);

/**
 * @swagger
 * /api/v1/srag/chart:
 *   get:
 *     summary: Obter dados para gráficos de SRAG
 *     tags: [SRAG]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: period
 *         schema:
 *           type: string
 *           enum: [daily, monthly, yearly]
 *         description: Tipo de agrupamento temporal
 *         example: "monthly"
 *       - in: query
 *         name: region
 *         schema:
 *           type: string
 *         description: Região para filtrar
 *         example: "SP"
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Data de início
 *         example: "2024-01-01"
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Data de fim
 *         example: "2024-12-31"
 *       - in: query
 *         name: groupBy
 *         schema:
 *           type: string
 *           enum: [state, city]
 *         description: Tipo de agrupamento geográfico
 *         example: "state"
 *     responses:
 *       200:
 *         description: Dados para gráficos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SragChartDataDto'
 */
router.get('/chart', authenticateJWT, getChartData);

/**
 * @swagger
 * /api/v1/srag/list:
 *   get:
 *     summary: Listar casos de SRAG com filtros
 *     tags: [SRAG]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Página atual
 *         example: 1
 *       - in: query
 *         name: itemsPerPage
 *         schema:
 *           type: integer
 *         description: Itens por página
 *         example: 20
 *       - in: query
 *         name: sgUf
 *         schema:
 *           type: string
 *         description: Sigla do estado
 *         example: "SP"
 *       - in: query
 *         name: coMunRes
 *         schema:
 *           type: string
 *         description: Código do município
 *         example: "3550308"
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Data de início
 *         example: "2024-01-01"
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Data de fim
 *         example: "2024-12-31"
 *       - in: query
 *         name: evolucao
 *         schema:
 *           type: integer
 *         description: Evolução (1=Cura, 2=Óbito, 3=Óbito outras causas)
 *         example: 1
 *       - in: query
 *         name: uti
 *         schema:
 *           type: integer
 *         description: UTI (1=Sim, 2=Não, 9=Ignorado)
 *         example: 1
 *       - in: query
 *         name: vacinaCov
 *         schema:
 *           type: integer
 *         description: Vacinação COVID (1=Sim, 2=Não, 9=Ignorado)
 *         example: 1
 *     responses:
 *       200:
 *         description: Lista de casos de SRAG
 */
router.get('/list', authenticateJWT, getSragList);

export default router;
