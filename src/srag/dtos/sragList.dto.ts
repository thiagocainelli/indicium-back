import { IsStringPropertyDecorator } from '../../_common/decorators/dtoProperties/isString-property.decorator';
import { IsIntPropertyDecorator } from '../../_common/decorators/dtoProperties/isInt-property.decorator';
import { IsDateStringPropertyDecorator } from '../../_common/decorators/dtoProperties/isDateString-property.decorator';

/**
 * @swagger
 * components:
 *   schemas:
 *     SragListFilterDto:
 *       type: object
 *       properties:
 *         page:
 *           type: integer
 *           description: Página atual
 *           example: 1
 *         itemsPerPage:
 *           type: integer
 *           description: Itens por página
 *           example: 20
 *         sgUf:
 *           type: string
 *           description: Sigla do estado
 *           example: "SP"
 *         coMunRes:
 *           type: string
 *           description: Código do município de residência
 *           example: "3550308"
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
 *         evolucao:
 *           type: integer
 *           description: Evolução do caso (1=Cura, 2=Óbito, 3=Óbito por outras causas)
 *           example: 1
 *         uti:
 *           type: integer
 *           description: Internação em UTI (1=Sim, 2=Não, 9=Ignorado)
 *           example: 1
 *         vacinaCov:
 *           type: integer
 *           description: Vacinação COVID (1=Sim, 2=Não, 9=Ignorado)
 *           example: 1
 */
export class SragListFilterDto {
  @IsIntPropertyDecorator({
    description: 'Página atual',
    example: 1,
    required: false,
  })
  page?: number;

  @IsIntPropertyDecorator({
    description: 'Itens por página',
    example: 20,
    required: false,
  })
  itemsPerPage?: number;

  @IsStringPropertyDecorator({
    description: 'Sigla do estado',
    example: 'SP',
    required: false,
  })
  sgUf?: string;

  @IsStringPropertyDecorator({
    description: 'Código do município de residência',
    example: '3550308',
    required: false,
  })
  coMunRes?: string;

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

  @IsIntPropertyDecorator({
    description: 'Evolução do caso (1=Cura, 2=Óbito, 3=Óbito por outras causas)',
    example: 1,
    required: false,
  })
  evolucao?: number;

  @IsIntPropertyDecorator({
    description: 'Internação em UTI (1=Sim, 2=Não, 9=Ignorado)',
    example: 1,
    required: false,
  })
  uti?: number;

  @IsIntPropertyDecorator({
    description: 'Vacinação COVID (1=Sim, 2=Não, 9=Ignorado)',
    example: 1,
    required: false,
  })
  vacinaCov?: number;
}
