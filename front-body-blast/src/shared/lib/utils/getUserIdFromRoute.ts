import { RouteLocationNormalized } from 'vue-router';

export const getUserIdFromRoute = (route: RouteLocationNormalized) => {
  const id = route.params.id;

  if (id instanceof Array) return { id: -1 };
  return {
    id: parseInt(id),
  };
};
