import { IsNumberPropertyDecorator } from '../../_common/decorators/dtoProperties/isNumber-property.decorator';
import { IsStringPropertyDecorator } from '../../_common/decorators/dtoProperties/isString-property.decorator';

/**
 * @swagger
 * components:
 *   schemas:
 *     SragMetricsDto:
 *       type: object
 *       properties:
 *         caseIncreaseRate:
 *           type: number
 *           description: Taxa de aumento de casos de SRAG
 *           example: 15.5
 *         mortalityRate:
 *           type: number
 *           description: Taxa de mortalidade por SRAG
 *           example: 8.2
 *         icuOccupancyRate:
 *           type: number
 *           description: Taxa de ocupação de UTI
 *           example: 75.3
 *         vaccinationRate:
 *           type: number
 *           description: Taxa de vacinação da população
 *           example: 85.7
 *         period:
 *           type: string
 *           description: Período das métricas
 *           example: "2024-01"
 *         region:
 *           type: string
 *           description: Região (estado ou cidade)
 *           example: "SP"
 */
export class SragMetricsDto {
  @IsNumberPropertyDecorator({
    description: 'Taxa de aumento de casos de SRAG',
    example: 15.5,
    required: false,
  })
  caseIncreaseRate?: number;

  @IsNumberPropertyDecorator({
    description: 'Taxa de mortalidade por SRAG',
    example: 8.2,
    required: false,
  })
  mortalityRate?: number;

  @IsNumberPropertyDecorator({
    description: 'Taxa de ocupação de UTI',
    example: 75.3,
    required: false,
  })
  icuOccupancyRate?: number;

  @IsNumberPropertyDecorator({
    description: 'Taxa de vacinação da população',
    example: 85.7,
    required: false,
  })
  vaccinationRate?: number;

  @IsStringPropertyDecorator({
    description: 'Período das métricas',
    example: '2024-01',
    required: false,
  })
  period?: string;

  @IsStringPropertyDecorator({
    description: 'Região (estado ou cidade)',
    example: 'SP',
    required: false,
  })
  region?: string;
}
