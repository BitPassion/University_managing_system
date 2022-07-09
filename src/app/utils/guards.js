import store from '../app-state';

export const globalAuthGuard = function(to, from, next) {
  if (to.matched.some(route => route.meta.auth)) {
    if (!store.getters.isAuth) {
      next({ name: 'login' });
    }
    next();
  }
  next();
};

export const authGuard = function(to, from, next) {
  if (!store.getters.isAuth) {
    next({ name: 'login' });
  }
  next();
};

export const innerGuard = function(to, from, next) {
  if (store.getters.isAuth) {
    next('/');
  }
  next();
};
