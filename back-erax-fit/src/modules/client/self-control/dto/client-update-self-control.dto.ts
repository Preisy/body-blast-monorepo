import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsDefined, IsNumber, IsString, Length, Min } from 'class-validator';
import { UpdateSelfControlRequest } from 'src/modules/core/self-control/dto/update-self-control.dto';

export class UpdateSelfControlByClientRequest extends OmitType(UpdateSelfControlRequest, ['behaviour', 'date']) {
  @IsDefined()
  @IsNumber()
  @ApiProperty()
  @Min(0)
  public steps: number;

  @IsDefined()
  @IsString()
  @ApiProperty()
  @Length(1, 255)
  public activity: string;
}
