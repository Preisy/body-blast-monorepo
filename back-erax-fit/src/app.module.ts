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
import { ClientAnthropometricsModule } from './modules/client/antropometrics/client-anthropometrics.module';
import { AdminAntropometricsModule } from './modules/admin/antropometrics/admin-anthropomerics.module';
import { AdminPromptModule } from './modules/admin/prompt/admin-prompt.module';
import { ScheduleModule } from '@nestjs/schedule';
import { AdminFoodModule } from './modules/admin/food/admin-food.module';
import { ClientFoodModule } from './modules/client/food/client-food.module';
import { AdminNutritionModule } from './modules/admin/nutrition/admin-nutrition.module';
import { ClientNutritionModule } from './modules/client/nutrition/client-nutrition.module';

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
    AdminFileModule,
    MeModule,
    ClientAnthropometricsModule,
    AdminAntropometricsModule,
    AdminPromptModule,
    AdminFoodModule,
    ClientFoodModule,
    AdminNutritionModule,
    ClientNutritionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
