import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './authentication/auth.module';
import { WorkoutModule } from './workout/workout.module';
import { ExerсiseModule } from './exerсise/exerсise.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    AuthModule,
    UserModule,
    WorkoutModule,
    ExerсiseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
