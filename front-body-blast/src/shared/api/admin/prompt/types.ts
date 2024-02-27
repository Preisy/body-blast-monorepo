import { ComposerTranslation } from 'vue-i18n';
import { z } from 'zod';
import { AppBaseEntity } from 'shared/api/base';
import { AppPagination } from 'shared/api/pagination';

export interface Prompt extends AppBaseEntity {
  type: string;
  photoLink: string;
  videoLink: string;
}

export namespace Prompt {
  export namespace Post {
    export interface Dto {
      type: string;
      photo: File;
      video: File;
    }

    export interface Response extends AppBaseEntity.Response<Prompt> {}
  }
  export namespace Get {
    export interface Dto extends AppPagination.BaseDto {
      type: string;
    }

    export interface Response extends AppPagination.Response<Prompt> {}
  }
  export namespace Patch {
    export interface Dto extends Post.Dto {}

    export interface Response extends AppBaseEntity.Response<Prompt> {}
  }
  export namespace Delete {
    export interface Dto extends Pick<AppBaseEntity, 'id'> {}

    export interface Response {
      status: boolean;
    }
  }

  export const validation = (t: ComposerTranslation) =>
    z.object({
      type: z.string().min(1),
      photo: z.instanceof(File, { message: t('admin.prompt.errors.fileInput') }),
      video: z.instanceof(File, { message: t('admin.prompt.errors.fileInput') }),
    });
}
