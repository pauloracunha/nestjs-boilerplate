import { ValidationError, ValidationPipe } from '@nestjs/common';
import { ValidatorOptions } from 'class-validator';

export interface ValidationPipeOptions extends ValidatorOptions {
  exceptionFactory?: (errors: ValidationError[]) => any;
}

export { ValidationPipe };
