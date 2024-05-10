import { EventBus } from 'quasar';

export type UploadProgressEventData = { filename: string; progress: number; estimated?: number };
export type UploadDoneEventData = { filename: string };
export const fileEventBus = new EventBus<{
  uploadProgress: (data: UploadProgressEventData) => void;
  uploadDone: (data: UploadDoneEventData) => void;
}>();
