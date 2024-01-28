import { ComposerTranslation } from 'vue-i18n';
import { z } from 'zod';

export interface Prompt {
  type: string;
  photo: File | string;
  video: File | string;
}

export namespace Prompt {
  export interface Dto {
    prompts: Array<Prompt>;
  }

  export interface Response {
    msg: string;
  }

  export const validation = (t: ComposerTranslation) =>
    z.object({
      type: z.string().min(1),
      photo: z.instanceof(File, { message: t('admin.prompt.errors.fileInput') }),
      video: z.instanceof(File, { message: t('admin.prompt.errors.fileInput') }),
    });
}
