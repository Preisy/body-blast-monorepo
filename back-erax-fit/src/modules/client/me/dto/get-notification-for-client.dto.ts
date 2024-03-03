import { ApiPropertyOptional } from '@nestjs/swagger';
import { GetLatestEmptyAnthropometricsResponse } from '../../../../modules/core/anthropometrics/dto/get-latest-empty-anthropometrics';

export class GetNotificationForClientResponse {
  @ApiPropertyOptional()
  anthropometrics: GetLatestEmptyAnthropometricsResponse;
}
