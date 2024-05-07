import { z } from 'zod';
import { AppBaseEntity, AppPagination, ISODate, User } from 'shared/api';

export interface Diary extends AppBaseEntity {
  cycle: Nullable<number>;
  date: ISODate; // ISO format
  sum: Nullable<number>;
  activity: Nullable<string>;
  steps: Nullable<number>;
  user?: User;
  userId: number;
  props?: Array<Diary.Prop>;
}

export namespace Diary {
  export interface Prop extends AppBaseEntity {
    label: string;
    value: number;
    diary: string;
    diaryId: number;
  }

  export namespace Get {
    export interface Dto extends AppPagination.DateDto {}
    export interface Response extends AppPagination.Response<Diary> {}
  }

  export namespace GetById {
    export interface Response extends AppBaseEntity.Response<Diary> {}
  }

  export namespace Patch {
    export interface Dto extends Partial<Pick<Diary, 'activity' | 'steps' | 'props'>> {}
    export interface Response extends AppBaseEntity.Response<Diary> {}
  }

  export const validation = () =>
    z.object({
      props: z.array(
        z.object({
          label: z.string(),
          value: z.coerce.number().min(1),
        }),
      ),
      steps: z.coerce.number().min(1),
      activity: z.string().min(1),
    });
}
