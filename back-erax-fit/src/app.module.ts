import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AdminFileModule } from './modules/admin/file/admin-file.module';
import { AdminWorkoutModule } from './modules/admin/workout/admin-workout.module';
import { AuthModule } from './modules/authentication/auth.module';
import { ClientFileModule } from './modules/client/file/client-file.module';
import { ClientWorkoutModule } from './modules/client/workout/client-workout.module';
import { AdminUserModule } from './modules/admin/user/admin-user.module';
import { MeModule } from './modules/client/me/me.module';
import { ClientAnthropometricsModule } from './modules/client/anthropometrics/client-anthropometrics.module';
import { AdminAntropometricsModule } from './modules/admin/anthropometrics/admin-anthropomerics.module';
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
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    DatabaseModule,
    AuthModule,
    AdminUserModule,
    AdminWorkoutModule,
    ClientFileModule,
    ClientWorkoutModule,
    ClientFileModule,
    ClientBonusVideoModule,
    AdminFileModule,
    MeModule,
    ClientAnthropometricsModule,
    AdminAntropometricsModule,
    AdminPromptModule,
    AdminDiaryTemplateModule,
    AdminBonusVideoModule,
    AdminFoodModule,
    ClientFoodModule,
    AdminNutritionModule,
    ClientNutritionModule,
    AdminDiaryModule,
    ClientDiaryModule,
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
        },
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
