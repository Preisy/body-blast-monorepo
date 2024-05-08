import { AppBaseEntity } from 'shared/api';
import { AppPagination } from 'shared/api';
import { User } from '.';

export namespace AdminUser {
  export namespace GetById {
    export interface Response extends AppBaseEntity.Response<User> {}
  }

  export namespace Get {
    export interface Dto extends AppPagination.BaseDto {}
    export interface Response extends AppPagination.Response<User> {}
  }

  export namespace GetSteps {
    export interface Dto {
      id: AppBaseEntity.Dto['id'];
      pagination?: AppPagination.DateDto;
    }
    export interface Response {
      weeks: Array<{
        steps: number;
        stepsGoal: number;
        startDate: string;
        endDate: string;
      }>;
    }
  }

  export namespace Patch {
    export interface Dto {
      id: AppBaseEntity.Dto['id'];
      user: Partial<User>;
    }
    export interface Response extends AppBaseEntity.Response<User> {}
  }
  export namespace Delete {
    export interface Dto extends AppBaseEntity.Dto {}
    export interface Response {
      status: boolean;
    }
  }
}
