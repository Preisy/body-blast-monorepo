import { NotificationTypes } from 'shared/api/notification';

export default {
  notification: {
    diary: `Заполни дневник!`,
    anthropometrics: `Заполни антропометрию!`,
  } as Record<NotificationTypes, string>,
};
