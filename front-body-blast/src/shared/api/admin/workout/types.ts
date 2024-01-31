import { AppBaseEntity } from 'shared/api/base';
import { Workout as UserWorkout } from 'shared/api/workout';

export namespace Workout {
  export namespace Get {
    export interface Dto extends UserWorkout.Get.Dto {}
    export interface Response extends UserWorkout.Get.Response {}
  }

  export namespace GetById {
    export interface Dto extends AppBaseEntity.Dto {}
    export interface Response extends AppBaseEntity.Response<UserWorkout> {}
  }

  export namespace Patch {
    export interface Dto extends Omit<Partial<UserWorkout>, keyof AppBaseEntity | 'user'> {}
    export interface Response extends UserWorkout {} //TODO: double check
  }

  export namespace Post {
    export interface Dto extends Omit<UserWorkout, keyof AppBaseEntity | 'user'> {}
    export interface Response extends AppBaseEntity.Response<UserWorkout> {}
  }

  export namespace Delete {
    export interface Response extends AppBaseEntity.Response<{ status: boolean }> {}
  }
}
