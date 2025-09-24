import { IsStringPropertyDecorator } from '../../_common/decorators/dtoProperties/isString-property.decorator';
import { IsDateStringPropertyDecorator } from '../../_common/decorators/dtoProperties/isDateString-property.decorator';
import { IsEnumPropertyDecorator } from '../../_common/decorators/dtoProperties/isEnum-property.decorator';
import { IsNumberPropertyDecorator } from '../../_common/decorators/dtoProperties/isNumber-property.decorator';

/**
 * @swagger
 * components:
 *   schemas:
 *     SragChartFilterDto:
 *       type: object
 *       properties:
 *         period:
 *           type: string
 *           enum: [daily, monthly, yearly]
 *           description: Tipo de agrupamento temporal
 *           example: "monthly"
 *         region:
 *           type: string
 *           description: Região para filtrar (estado ou cidade)
 *           example: "SP"
 *         startDate:
 *           type: string
 *           format: date
 *           description: Data de início do período
 *           example: "2024-01-01"
 *         endDate:
 *           type: string
 *           format: date
 *           description: Data de fim do período
 *           example: "2024-12-31"
 *         groupBy:
 *           type: string
 *           enum: [state, city]
 *           description: Tipo de agrupamento geográfico
 *           example: "state"
 */
export class SragChartFilterDto {
  @IsEnumPropertyDecorator({
    description: 'Tipo de agrupamento temporal',
    example: 'monthly',
    required: false,
    enum: ['daily', 'monthly', 'yearly'],
    enumName: 'PeriodType',
  })
  period?: 'daily' | 'monthly' | 'yearly';

  @IsStringPropertyDecorator({
    description: 'Região para filtrar (estado ou cidade)',
    example: 'SP',
    required: false,
  })
  region?: string;

  @IsDateStringPropertyDecorator({
    description: 'Data de início do período',
    example: '2024-01-01',
    required: false,
  })
  startDate?: Date;

  @IsDateStringPropertyDecorator({
    description: 'Data de fim do período',
    example: '2024-12-31',
    required: false,
  })
  endDate?: Date;

  @IsEnumPropertyDecorator({
    description: 'Tipo de agrupamento geográfico',
    example: 'state',
    required: false,
    enum: ['state', 'city'],
    enumName: 'GroupByType',
  })
  groupBy?: 'state' | 'city';
}

/**
 * @swagger
 * components:
 *   schemas:
 *     SragChartDataDto:
 *       type: object
 *       properties:
 *         date:
 *           type: string
 *           format: date
 *           description: Data do registro
 *           example: "2024-01-01"
 *         cases:
 *           type: integer
 *           description: Número de casos
 *           example: 150
 *         deaths:
 *           type: integer
 *           description: Número de óbitos
 *           example: 12
 *         icuOccupancy:
 *           type: integer
 *           description: Ocupação de UTI
 *           example: 45
 *         vaccinations:
 *           type: integer
 *           description: Número de vacinações
 *           example: 1200
 *         region:
 *           type: string
 *           description: Região (estado ou cidade)
 *           example: "SP"
 */
export class SragChartDataDto {
  @IsDateStringPropertyDecorator({
    description: 'Data do registro',
    example: '2024-01-01',
    required: true,
  })
  date!: Date;

  @IsNumberPropertyDecorator({
    description: 'Número de casos',
    example: 150,
    required: false,
  })
  cases?: number;

  @IsNumberPropertyDecorator({
    description: 'Número de óbitos',
    example: 12,
    required: false,
  })
  deaths?: number;

  @IsNumberPropertyDecorator({
    description: 'Ocupação de UTI',
    example: 45,
    required: false,
  })
  icuOccupancy?: number;

  @IsNumberPropertyDecorator({
    description: 'Número de vacinações',
    example: 1200,
    required: false,
  })
  vaccinations?: number;

  @IsStringPropertyDecorator({
    description: 'Região (estado ou cidade)',
    example: 'SP',
    required: false,
  })
  region?: string;
}
