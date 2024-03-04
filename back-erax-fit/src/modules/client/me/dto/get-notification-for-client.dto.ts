import { ApiProperty } from '@nestjs/swagger';

export class GetNotificationForClientResponse {
  @ApiProperty({ description: 'Returns TRUE if empty anthropometrics record exists, otherwise returns FALSE' })
  anthropometrics: boolean;

  @ApiProperty({ description: 'Returns TRUE if empty diary record exists, otherwise returns FALSE' })
  diary: boolean;
}
