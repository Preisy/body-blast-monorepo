import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsDefined, ValidateNested } from 'class-validator';

export class StepsByWeek {
  @ApiProperty()
  public steps: number;

  @ApiProperty()
  public stepsGoal: number;

  @ApiProperty()
  public startDate: string;

  @ApiProperty()
  public endDate: string;

  constructor(steps: number, stepsGoal: number, startDate: string, endDate: string) {
    this.steps = steps;
    this.stepsGoal = stepsGoal;
    this.startDate = startDate;
    this.endDate = endDate;
  }
}

export class GetStepsByUserIdDTO {
  @IsDefined()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => StepsByWeek)
  @ApiProperty({ type: [StepsByWeek] })
  public weeks: StepsByWeek[];

  constructor(weeks: StepsByWeek[]) {
    this.weeks = weeks;
  }
}
