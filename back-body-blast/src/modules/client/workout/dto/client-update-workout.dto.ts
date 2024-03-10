import { PickType } from '@nestjs/swagger';
import { UpdateWorkoutRequest } from '../../../../modules/core/workout/dto/update-workout.dto';

export class UpdateWorkoutByClientRequest extends PickType(UpdateWorkoutRequest, ['comment']) {}
