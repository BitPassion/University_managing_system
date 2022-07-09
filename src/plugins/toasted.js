import Vue from 'vue';
import Toasted from 'vue-toasted';

Vue.use(Toasted);

export const toastSuccess = msg => {
  return Vue.toasted.success(msg, {
    icon: 'check',
    action: {
      text: 'Cancel',
      onClick: (e, toastObject) => {
        toastObject.goAway(0);
      }
    },
    duration: 3000,
    position: 'top-center',
    theme: 'bubble',
    className: 'toast'
  });
};


export const toastError = msg => {
    return Vue.toasted.error(msg, {
      icon: 'error_outline',
      action: {
        text: 'Cancel',
        onClick: (e, toastObject) => {
          toastObject.goAway(0);
        }
      },
      duration: 3000,
      position: 'top-center',
      theme: 'bubble',
      className: 'toast'
    });
  };