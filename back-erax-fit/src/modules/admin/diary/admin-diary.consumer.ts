import { Process, Processor } from '@nestjs/bull';
import { AdminDiaryService } from './admin-diary.service';
import { Job } from 'bull';

@Processor('diary')
export class AdminDiaryConsumer {
  constructor(private readonly service: AdminDiaryService) {}
  @Process('schedule diary')
  async transcode(job: Job) {
    await this.service.createDiaryQueueJob();
    await job.moveToCompleted();
  }
}
