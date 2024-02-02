import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../../../modules/core/user/entities/user.entity';
import { AppStatusResponse } from '../../../../dto/app-status-response.dto';
import { CreateUserByAdminRequest } from '../../user/dto/create-admin.dto';
import { BaseWorkoutService } from '../../../../modules/core/workout/base-workout.service';
import { WorkoutEntity } from '../../../../modules/core/workout/entity/workout.entity';
import { CreateExerciseRequest } from '../../../../modules/core/exerсise/dto/create-exercise.dto';
import { CreateWorkoutByAdminRequest } from '../dto/admin-create-wrokout.dto';
import { ExerciseEntity } from '../../../../modules/core/exerсise/entities/exercise.entity';
import { AdminWorkoutService } from '../admin-workout.service';
import { UserRole } from '../../../../constants/constants';

describe('BaseworkoutService', () => {
  let service: AdminWorkoutService;
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
        BaseWorkoutService,
        AdminWorkoutService,
        {
          provide: getRepositoryToken(WorkoutEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<AdminWorkoutService>(AdminWorkoutService);
    userRepository = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity));
    exerciseRepository = module.get<Repository<ExerciseEntity>>(getRepositoryToken(ExerciseEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should not create new anthrp record because of wrong data', async () => {
      const userRequest: CreateUserByAdminRequest = {
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
        role: UserRole.Client,
        canWatchVideo: false,
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

      const invalidWorkoutRequest: CreateWorkoutByAdminRequest = {
        userId: savedUser.id,
        name: 'Push-ups training',
        exercises: savedExercises,
        date: '2023-11-11',
      };

      await expect(service.create(invalidWorkoutRequest)).rejects.toThrow();
    });
  });

  describe('create', () => {
    it('should not create new workout record because user with given id not found', async () => {
      const userRequest: CreateUserByAdminRequest = {
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
        canWatchVideo: false,
        role: UserRole.Client,
      };
      const savedUser = await userRepository.save(await userRepository.create(userRequest));

      const exerciseRequest: CreateExerciseRequest = {
        name: 'push-ups',
        weight: 50,
        sets: 5,
        repetitions: '12',
        restTime: 10,
        pace: 'medium',
        photoLink: 'dickpic.jpg',
        videoLink: 'undefined/porn.mp4',
      };
      const savedExercise = await exerciseRepository.save(await exerciseRepository.create(exerciseRequest));

      savedExercises.push(savedExercise);

      const invalidWorkoutRequest: CreateWorkoutByAdminRequest = {
        userId: savedUser.id + 5,
        name: 'Push-ups training',
        exercises: savedExercises,
        date: '2023-11-11',
      };

      await expect(service.create(invalidWorkoutRequest)).rejects.toThrow();
    });
  });
});
