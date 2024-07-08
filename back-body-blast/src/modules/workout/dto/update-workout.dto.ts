import { OmitType, PartialType, PickType } from '@nestjs/swagger';
import { CreateWorkoutRequest } from './create-workout.dto';

export class UpdateWorkoutRequest extends PartialType(OmitType(CreateWorkoutRequest, ['userId'])) {}
export class UpdateCommentRequest extends PickType(UpdateWorkoutRequest, ['comment']) {}
