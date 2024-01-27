import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateDiaryTemplateRequest } from './create-diary-template.dto';

export class UpdateDiaryTemplateRequest extends PartialType(OmitType(CreateDiaryTemplateRequest, ['userId'])) {}
