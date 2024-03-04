import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetNotificationForClientResponse {
  @ApiPropertyOptional()
  anthropometrics: boolean;

  @ApiPropertyOptional()
  diary: boolean;
}
