import { PartialType } from '@nestjs/swagger';
import { CreateAnthropometricsRequest } from './create-anthropometrics.dto';

export class UpdateAnthropometricsRequest extends PartialType(CreateAnthropometricsRequest) {}
