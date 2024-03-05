import { Notify } from 'quasar';
import { AppContext, render } from 'vue';
import { SNotification } from 'shared/ui/SNotification';
import { NotificationTypes } from './types';

export function showNotification(appContext: AppContext, notificationType: NotificationTypes) {
  Notify.create({
    position: 'top',
    classes: 'q-diary-notification rounded-0.75rem flex flex-row p-0',
    message: '',
    color: 'primary',
  });

  // Push macrotask to queue, because Notify.create takes time to create html element
  setTimeout(() => {
    const anchor = document.querySelector('.q-diary-notification');
    if (!anchor) {
      console.error('No .q-diary-notification element');
      return;
    }

    const comp = h(SNotification, { type: notificationType });
    // comp.appContext = { ...appContext };
    render(comp, anchor);
  });
}
