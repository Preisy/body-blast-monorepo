import { RouteLocationNormalized } from 'vue-router';

export const getUserIdFromRoute = (route: RouteLocationNormalized) => {
  const id = route.params.id;

  if (id instanceof Array) throw new Error("'route.params.id' instanceof Array");
  return {
    id: parseInt(id),
  };
};
