import { IsNumberPropertyDecorator } from '../decorators/dtoProperties/isNumber-property.decorator';
import { IsStringPropertyDecorator } from '../decorators/dtoProperties/isString-property.decorator';

export class ExceptionDto {
  @IsNumberPropertyDecorator({
    description: 'Error code',
    required: true,
    example: 400,
  })
  statusCode!: number;

  // Short description of the error
  @IsStringPropertyDecorator({
    description: 'Error description',
    required: true,
    example: 'Bad Request',
  })
  error!: string;

  // Detailed error message
  @IsStringPropertyDecorator({
    description: 'Error message',
    required: true,
    example: 'Bad Request',
  })
  message!: string;
}
