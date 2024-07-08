import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AdminFileModule } from './modules/admin/file/admin-file.module';
import { AuthModule } from './modules/authentication/auth.module';
import { ClientFileModule } from './modules/client/file/client-file.module';
import { AdminUserModule } from './modules/admin/user/admin-user.module';
import { MeModule } from './modules/client/me/me.module';
import { AdminPromptModule } from './modules/admin/prompt/admin-prompt.module';
import { ScheduleModule } from '@nestjs/schedule';
import { AdminDiaryTemplateModule } from './modules/admin/diary-template/admin-diary-template.module';
import { AdminBonusVideoModule } from './modules/admin/bonus-video/admin-bonus-video.module';
import { ClientBonusVideoModule } from './modules/client/bonus-video/client-bonus-video.module';
import { AdminFoodModule } from './modules/admin/food/admin-food.module';
import { ClientFoodModule } from './modules/client/food/client-food.module';
import { AdminNutritionModule } from './modules/admin/nutrition/admin-nutrition.module';
import { ClientNutritionModule } from './modules/client/nutrition/client-nutrition.module';
import { ClientDiaryModule } from './modules/client/diary/client-diary.module';
import { AdminDiaryModule } from './modules/admin/diary/admin-diary.module';
import { AppLoggerModule } from './logger/app-logger.module';
import { AdminLogsModule } from './modules/admin/logging/admin-logs.module';
import { TelegramModule } from './modules/telegram/telegram.module';
import { WorkoutModule } from './modules/workout/workout.module';
import { AnthropometricsModule } from './modules/anthropometrics/anthropometrics.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    DatabaseModule,
    AuthModule,
    AdminUserModule,
    ClientFileModule,
    ClientFileModule,
    ClientBonusVideoModule,
    AdminFileModule,
    MeModule,
    AdminPromptModule,
    AdminDiaryTemplateModule,
    AdminBonusVideoModule,
    AdminFoodModule,
    ClientFoodModule,
    AdminNutritionModule,
    ClientNutritionModule,
    AdminDiaryModule,
    ClientDiaryModule,
    AppLoggerModule,
    AdminLogsModule,
    TelegramModule,
    WorkoutModule,
    AnthropometricsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
