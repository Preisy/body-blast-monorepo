import { api } from 'shared/config/axios';
import { useServiceAction } from 'shared/lib/utils';
import { PromptPage } from './types';

export const adminPromptsService = {
  postPrompt: useServiceAction((data: PromptPage.Post.Dto) =>
    api.post<PromptPage.Post.Response>('/admin/prompts', data),
  ),

  deletePrompt: useServiceAction((data: PromptPage.Delete.Dto) =>
    api.delete<PromptPage.Delete.Response>(`/admin/prompts/${data.id}`),
  ),

  patchPrompt: useServiceAction((data: PromptPage.Patch.Dto) =>
    api.patch<PromptPage.Patch.Response>(`/admin/prompts/${data.id}`, data.data),
  ),

  getPrompts: useServiceAction((data: PromptPage.Get.Dto) =>
    api.get<PromptPage.Get.Response>(`/admin/prompts`, { params: data }),
  ),
};
