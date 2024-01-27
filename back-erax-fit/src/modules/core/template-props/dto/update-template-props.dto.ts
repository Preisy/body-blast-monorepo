import { PartialType } from '@nestjs/swagger';
import { CreateTemplatePropsRequest } from './create-template-props.dto';

export class UpdateTemplatePropsRequest extends PartialType(CreateTemplatePropsRequest) {}
