import { ApiProperty } from '@nestjs/swagger';

export class GetPromptsByAdminRequest {
  @ApiProperty()
  public type: string;
}
