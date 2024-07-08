import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../core/user/entities/user.entity';
import { AppStatusResponse } from '../../../dto/app-status-response.dto';
import { BaseUserService } from '../../core/user/base-user.service';
import { CreateUserRequest } from '../../core/user/dto/create-user.dto';
import { WorkoutService } from '../workout.service';
import { WorkoutEntity } from '../entity/workout.entity';
import { ExerciseEntity } from '../../core/exerсise/entities/exercise.entity';
import { CreateExerciseRequest } from '../../core/exerсise/dto/create-exercise.dto';
import { CreateWorkoutRequest } from '../dto/create-workout.dto';

describe('BaseworkoutService', () => {
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
            findAndCount: jest.fn(),
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
          provide: getRepositoryToken(WorkoutEntity),
          useValue: {
            save: jest.fn(() => WorkoutEntity),
            create: jest.fn(() => WorkoutEntity),
          },
        },
        WorkoutService,
      ],
    }).compile();

    service = module.get<WorkoutService>(WorkoutService);
    userRepository = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity));
    exerciseRepository = module.get<Repository<ExerciseEntity>>(getRepositoryToken(ExerciseEntity));
    repository = module.get<Repository<WorkoutEntity>>(getRepositoryToken(WorkoutEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne method', () => {
    it('should not find workout because of incorrect id', async () => {
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
        name: '',
        weight: 50,
        sets: 5,
        repetitions: '12',
        restTime: 0,
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

      await expect(service.findOne(savedData.id + 5)).rejects.toThrow();
    });
  });
});
