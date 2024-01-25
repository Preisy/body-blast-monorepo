import { api } from 'shared/config/axios';
import { basePaginationRequest, useServiceAction } from 'shared/lib/utils';
import { Prompt } from './types';

export const adminPromptsService = {
  postPrompt: useServiceAction((data: Pick<Prompt, 'type' | 'photoLink' | 'videoLink'>) =>
    api.post<Prompt.Post.Response>('/admin/prompts', data),
  ),

  deletePrompt: useServiceAction((data: Prompt.Delete.Dto) =>
    api.delete<Prompt.Delete.Response>(`/admin/prompts/${data.id}`),
  ),

  patchPrompt: useServiceAction((id, data: Pick<Prompt, 'type' | 'photoLink' | 'videoLink'>) =>
    api.patch<Prompt.Patch.Response>(`/admin/prompts/${id}`, data),
  ),

  getPrompts: useServiceAction((data: Prompt.Get.Dto) =>
    api.get<Prompt.Get.Response>(
      basePaginationRequest('/admin/prompts', data),
      // `/admin/prompts?type=${data.type}&page=${data.page}&limit=${data.limit}&expanded=${data.expanded}`,
    ),
  ),
};
