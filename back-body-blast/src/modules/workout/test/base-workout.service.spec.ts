import { Test, TestingModule } from '@nestjs/testing';
import { AppPagination } from '../../../utils/app-pagination.util';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppStatusResponse } from '../../../dto/app-status-response.dto';
import { UserEntity } from '../../core/user/entities/user.entity';
import { BaseUserService } from '../../core/user/base-user.service';
import { CreateUserRequest } from '../../core/user/dto/create-user.dto';
import { WorkoutService } from '../workout.service';
import { WorkoutEntity } from '../entity/workout.entity';
import { CreateWorkoutRequest } from '../dto/create-workout.dto';
import { ExerciseEntity } from '../../core/exerсise/entities/exercise.entity';
import { CreateExerciseRequest } from '../../core/exerсise/dto/create-exercise.dto';

describe('BaseWorkoutService', () => {
  let service: WorkoutService;
  let repository: Repository<WorkoutEntity>;
  let userRepository: Repository<UserEntity>;
  let exerciseRepository: Repository<ExerciseEntity>;
  const savedExercises: ExerciseEntity[] = [];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BaseUserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            save: jest.fn(() => UserEntity),
            create: jest.fn(() => UserEntity),
            findOne: jest.fn(() => UserEntity),
            delete: jest.fn(() => AppStatusResponse),
            findAndCount: jest.fn(() => [[], 0]),
          },
        },
        WorkoutService,
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
            findOne: jest.fn(() => ExerciseEntity),
            delete: jest.fn(() => AppStatusResponse),
            findAndCount: jest.fn(() => [[], 0]),
          },
        },
      ],
    }).compile();

    service = module.get<WorkoutService>(WorkoutService);
    repository = module.get<Repository<WorkoutEntity>>(getRepositoryToken(WorkoutEntity));
    userRepository = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity));
    exerciseRepository = module.get<Repository<ExerciseEntity>>(getRepositoryToken(ExerciseEntity));
  });

  describe('findAll method', () => {
    it('it should return paginated workout records', async () => {
      const query: AppPagination.Request = {
        limit: 10,
        page: 1,
      };

      const userRequest: CreateUserRequest = {
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
      const result = await service.findAll(query);

      for (const workout of result.data) {
        expect(result.data).not.toBeNull();
        expect(workout).toBe(WorkoutEntity);
      }
    });
  });

  describe('delete method', () => {
    it('should delete a workout record by its ID', async () => {
      const userRequest: CreateUserRequest = {
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

      const savedData = await repository.save(await repository.create(request));

      const affected = await service.deleteOne(savedData.id);
      expect(affected).toBeDefined();
      expect(affected).toEqual({ status: false });
    });
  });
});
