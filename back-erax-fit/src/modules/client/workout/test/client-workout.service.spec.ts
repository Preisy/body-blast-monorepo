import { Test, TestingModule } from '@nestjs/testing';
import { AppPagination } from '../../../../utils/app-pagination.util';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppStatusResponse } from '../../../../dto/app-status-response.dto';
import { ClientWorkoutService } from '../client-workout.service';
import { UserEntity } from '../../../../modules/core/user/entities/user.entity';
import { WorkoutEntity } from '../../../../modules/core/workout/entity/workout.entity';
import { ExerciseEntity } from '../../../../modules/core/exerсise/entities/exercise.entity';
import { BaseWorkoutService } from '../../../../modules/core/workout/base-workout.service';
import { CreateUserByClientRequest } from '../../me/dto/create-client-user.dto';
import { CreateExerciseRequest } from '../../../../modules/core/exerсise/dto/create-exercise.dto';
import { CreateWorkoutRequest } from '../../../../modules/core/workout/dto/create-workout.dto';
import { UpdateWorkoutRequest } from '../../../../modules/core/workout/dto/update-workout.dto';

describe('ClientWorkoutService', () => {
  let service: ClientWorkoutService;
  let repository: Repository<WorkoutEntity>;
  let userRepository: Repository<UserEntity>;
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
            findAndCount: jest.fn(() => [[], 0]),
          },
        },
        ClientWorkoutService,
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
        BaseWorkoutService,
      ],
    }).compile();

    service = module.get<ClientWorkoutService>(ClientWorkoutService);
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
      const result = await service.findAll(savedUser.id, query);

      for (const workout of result.data) {
        expect(result.data).not.toBeNull();
        expect(workout).toBe(WorkoutEntity);
      }
    });
  });

  describe('update method', () => {
    it('should update an existing workout record', async () => {
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

      const savedData = await repository.save(
        await repository.create({
          ...request,
          date: new Date(request.date),
        }),
      );
      const updateRequest: UpdateWorkoutRequest = {
        name: 'New push-ups training',
      };

      const savedAnthropometrics = await service.update(savedUser.id, savedData.id, updateRequest);
      expect(savedAnthropometrics).toBeDefined();
      expect({ data: savedAnthropometrics.data }).toBeDefined();
    });
  });
});
