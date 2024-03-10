import { PartialType } from '@nestjs/swagger';
import { CreatePromptRequest } from './create-prompt.dto';

export class UpdatePromptRequest extends PartialType(CreatePromptRequest) {}
