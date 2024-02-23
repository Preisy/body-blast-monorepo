import { z } from 'zod';
import { AppBaseEntity } from '../base';
import { AppPagination } from '../pagination';
import { User } from '../user';

export interface Diary extends AppBaseEntity {
  cycle: Nullable<number>;
  date: string; // ISO format
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
          value: z.coerce.number(),
        }),
      ),
      steps: z.coerce.number(),
      activity: z.string().min(1),
    });
}
