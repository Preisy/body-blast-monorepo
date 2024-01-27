import { ApiProperty } from '@nestjs/swagger';

export class GetStepsByUserIdDTO {
  @ApiProperty()
  public steps: number;

  @ApiProperty()
  public stepsGoal: number;

  constructor(steps: number, stepsGoal: number) {
    this.steps = steps;
    this.stepsGoal = stepsGoal;
  }
}
