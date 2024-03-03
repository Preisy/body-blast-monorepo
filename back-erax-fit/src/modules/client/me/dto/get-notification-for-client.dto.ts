import { ApiPropertyOptional } from '@nestjs/swagger';
import { GetLatestEmptyAnthropometricsResponse } from '../../../../modules/core/anthropometrics/dto/get-latest-empty-anthropometrics';
import { GetLatestEmptyDiaryResponse } from '../../../../modules/core/diary/dto/get-diary.dto';

export class GetNotificationForClientResponse {
  @ApiPropertyOptional()
  anthropometrics: GetLatestEmptyAnthropometricsResponse;

  @ApiPropertyOptional()
  diary: GetLatestEmptyDiaryResponse;
}
