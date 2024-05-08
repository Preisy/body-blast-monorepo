import { Workout as UserWorkout } from 'entities/workout';
import { AppBaseEntity } from 'shared/api';
import { AppPagination } from 'shared/api';
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
    export interface Dto extends Omit<Partial<UserWorkout>, keyof AppBaseEntity | 'user'> {}
    export interface Response extends AppBaseEntity.Response<UserWorkout> {}
  }

  export namespace Post {
    export interface Dto extends Omit<UserWorkout, keyof AppBaseEntity | 'user'> {}
    export interface Response extends AppBaseEntity.Response<UserWorkout> {}
  }

  export namespace Delete {
    export interface Response {
      status: boolean;
    }
  }
}
