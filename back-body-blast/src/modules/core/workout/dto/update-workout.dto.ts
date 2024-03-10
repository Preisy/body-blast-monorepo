import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateWorkoutRequest } from './create-workout.dto';

export class UpdateWorkoutRequest extends PartialType(OmitType(CreateWorkoutRequest, ['userId'])) {}
