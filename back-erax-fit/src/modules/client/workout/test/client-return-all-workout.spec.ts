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

describe('ClientWorkoutService', () => {
  let service: ClientWorkoutService;
  let userRepository: Repository<UserEntity>;
  let repository: Repository<WorkoutEntity>;
  let exerciseRepository: Repository<ExerciseEntity>;
  const savedExercises: ExerciseEntity[] = [];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
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
        BaseWorkoutService,
        ClientWorkoutService,
      ],
    }).compile();

    service = module.get<ClientWorkoutService>(ClientWorkoutService);
    userRepository = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity));
    repository = module.get<Repository<WorkoutEntity>>(getRepositoryToken(WorkoutEntity));
    exerciseRepository = module.get<Repository<ExerciseEntity>>(getRepositoryToken(ExerciseEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll method', () => {
    it('it should return all workout records without any input data', async () => {
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
      const result = await service.findAll(savedUser.id, new AppPagination.Request());

      for (const workout of result.data) {
        expect(result.data).not.toBeNull();
        expect(workout).toBe(WorkoutEntity);
      }
    });
  });
});
