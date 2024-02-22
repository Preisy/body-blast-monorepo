import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from '../../../../modules/core/user/entities/user.entity';
import { AppStatusResponse } from '../../../../dto/app-status-response.dto';
import { Repository } from 'typeorm';
import { CreateUserByClientRequest } from '../../me/dto/create-client-user.dto';
import { BaseWorkoutService } from '../../../../modules/core/workout/base-workout.service';
import { WorkoutEntity } from '../../../../modules/core/workout/entity/workout.entity';
import { CreateWorkoutRequest } from '../../../../modules/core/workout/dto/create-workout.dto';
import { ExerciseEntity } from '../../../../modules/core/exerсise/entities/exercise.entity';
import { CreateExerciseRequest } from '../../../../modules/core/exerсise/dto/create-exercise.dto';
import { AppPagination } from '../../../../utils/app-pagination.util';
import { ClientWorkoutService } from '../client-workout.service';
import { ClientWorkoutController } from '../client-workout.controller';
import { BaseUserService } from '../../../../modules/core/user/base-user.service';
import { AuthService } from '../../../../modules/authentication/auth.service';
import { JwtService } from '@nestjs/jwt';
import { TokenEntity } from '../../../../modules/authentication/entities/token.entity';
import { RequestWithUser } from '../../../../modules/authentication/types/requestWithUser.type';

describe('ClientWorkoutController', () => {
  let controller: ClientWorkoutController;
  let userRepository: Repository<UserEntity>;
  let repository: Repository<WorkoutEntity>;
  let exerciseRepository: Repository<ExerciseEntity>;
  const savedExercises: ExerciseEntity[] = [];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientWorkoutController],
      providers: [
        BaseUserService,
        AuthService,
        JwtService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            save: jest.fn(() => UserEntity),
            create: jest.fn(() => UserEntity),
            findOne: jest.fn(() => UserEntity),
            delete: jest.fn(() => AppStatusResponse),
            findAndCount: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(WorkoutEntity),
          useValue: {
            save: jest.fn(() => WorkoutEntity),
            create: jest.fn(() => WorkoutEntity),
            findOne: jest.fn(() => WorkoutEntity),
            delete: jest.fn(() => AppStatusResponse),
            findAndCount: jest.fn(() => [[], 0]),
          },
        },
        {
          provide: getRepositoryToken(ExerciseEntity),
          useValue: {
            save: jest.fn(() => ExerciseEntity),
            create: jest.fn(() => ExerciseEntity),
          },
        },
        {
          provide: getRepositoryToken(TokenEntity),
          useClass: Repository,
        },
        BaseWorkoutService,
        ClientWorkoutService,
      ],
    }).compile();

    controller = module.get<ClientWorkoutController>(ClientWorkoutController);
    userRepository = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity));
    repository = module.get<Repository<WorkoutEntity>>(getRepositoryToken(WorkoutEntity));
    exerciseRepository = module.get<Repository<ExerciseEntity>>(getRepositoryToken(ExerciseEntity));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAll method', () => {
    it('it should not return all workout records because it is forbidden', async () => {
      const userRequest: CreateUserByClientRequest = {
        email: 'test1@mail.ru',
        password: 'Qwertyuiop1',
        firstName: 'Test',
        lastName: 'User',
        age: 33,
        weight: 80,
        weightInYouth: 70,
        height: 190,
        heartDesease: 'none',
        nutritRestrict: 'none',
        gastroDeseases: 'none',
        allergy: 'none',
        kidneyDesease: 'none',
        goals: 'Achieve volume of Arnold Schwarzenegger',
        sportsExp: 'push-ups',
        mealIntolerance: 'none',
        insulinResistance: false,
        muscleDesease: 'none',
        loadRestrictions: 'none',
      };
      const savedUser = await userRepository.save(await userRepository.create(userRequest));

      const exerciseRequest: CreateExerciseRequest = {
        name: 'Push-ups',
        weight: 50,
        sets: 5,
        repetitions: '12',
        restTime: 90,
        pace: 'medium',
        photoLink: 'dickpic.jpg',
        videoLink: 'undefined/porn.mp4',
      };
      const savedExercise = await exerciseRepository.save(await exerciseRepository.create(exerciseRequest));

      savedExercises.push(savedExercise);

      const request: CreateWorkoutRequest = {
        userId: savedUser.id,
        name: 'Push-ups training',
        exercises: savedExercises,
        date: '2023-11-11',
      };

      for (let i = 0; i < 5; ++i) {
        await repository.save(await repository.create(request));
      }

      const requestWithUser = {} as RequestWithUser;
      await expect(controller.getAll(requestWithUser, new AppPagination.Request())).rejects.toThrow();
    });
  });
});
