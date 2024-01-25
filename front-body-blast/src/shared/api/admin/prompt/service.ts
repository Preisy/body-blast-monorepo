//TODO: REMOVE
/* eslint-disable @typescript-eslint/no-unused-vars */
import { requestSimulator, useServiceAction } from 'shared/lib/utils';
import { Prompt } from './types';

export const adminPromptsService = {
  postPrompts: useServiceAction((data: Array<Prompt>) =>
    // return api.post<Auth.Response>('/admin/prompt', data);
    requestSimulator<Prompt.Response>({ msg: 'Some response to ' }),
  ),
  getPrompts: useServiceAction(() =>
    // return api.post<Auth.Response>('/admin/prompt', data);
    requestSimulator<Array<Prompt>>([
      { photo: 'https://random.imagecdn.app/500/350', video: '/', type: 'Промт1' },
      { photo: 'https://random.imagecdn.app/500/350', video: '/', type: 'Промт11' },
    ]),
  ),
};
