import { NotificationTypes } from 'shared/api/notification';

export default {
  notification: {
    diary: `Don't forget to fill diary!`,
    anthropometrics: `Don't forget to fill anthropometrics!`,
  } as Record<NotificationTypes, string>,
};
