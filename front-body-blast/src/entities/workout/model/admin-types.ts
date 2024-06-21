import { Workout as UserWorkout } from 'entities/workout';
import { AppBaseEntity, AppPagination } from 'shared/api';
import { User } from 'shared/api/user';

export namespace AdminWorkout {
  export namespace Get {
    export interface Dto extends AppPagination.DateDto {
      userId: User['id'];
    }
    export interface Response extends UserWorkout.Get.Response {}
  }

  export namespace GetById {
    export interface Dto extends AppBaseEntity.Dto {}
    export interface Response extends AppBaseEntity.Response<UserWorkout> {}
  }

  export namespace Patch {
    export interface Dto extends Pick<UserWorkout, 'name' | 'date' | 'comment' | 'cycle'> {
      exercises: Omit<UserWorkout['exercises'][number], keyof AppBaseEntity | 'workoutId'>[];
    }
    export interface Response extends AppBaseEntity.Response<UserWorkout> {}
  }

  export namespace Post {
    export interface Dto extends Pick<UserWorkout, 'name' | 'date' | 'comment' | 'userId' | 'cycle'> {
      exercises: Omit<UserWorkout['exercises'][number], keyof AppBaseEntity | 'workoutId'>[];
    }
    export interface Response extends AppBaseEntity.Response<UserWorkout> {}
  }

  export namespace Delete {
    export interface Response {
      status: boolean;
    }
  }
}
