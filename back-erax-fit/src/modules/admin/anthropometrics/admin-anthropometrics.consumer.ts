import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { AdminAnthropometricsService } from './admin-anthropometrics.service';

@Processor('anthropometrics')
export class AdminAnthropometricsConsumer {
  constructor(private readonly service: AdminAnthropometricsService) {}
  @Process()
  async transcode(job: Job<unknown>) {
    await this.service.createAnthropometricsQueueJob();
    await job.progress();
  }
}
