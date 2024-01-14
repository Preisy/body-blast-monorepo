import { api } from 'shared/config/axios';
import { useServiceAction } from 'shared/lib/utils';
import { Prompt } from './types';

export const adminPromptsService = {
  postPrompt: useServiceAction((data: Pick<Prompt, 'type' | 'photoLink' | 'videoLink'>) =>
    api.post<Prompt.Post.Response>('/admin/prompts', data),
  ),

  deletePrompt: useServiceAction((data: Prompt.Delete.Dto) =>
    api.delete<Prompt.Delete.Response>(`/admin/prompts/${data.id}`),
  ),

  patchPrompt: useServiceAction((data: Prompt.Patch.Dto) =>
    api.patch<Prompt.Patch.Response>(`/admin/prompts/${data.id}`, data.data),
  ),

  getPrompts: useServiceAction((data: Prompt.Get.Dto) =>
    api.get<Prompt.Get.Response>(
      `/admin/prompts?type=${data.type}&page=${data.page}&limit=${data.limit}&expanded=${data.expanded}`,
    ),
  ),
};
