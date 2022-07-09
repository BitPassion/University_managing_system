<template>
  <v-app class="app">
    <app-snackBar></app-snackBar>
    <v-app-bar app color="primary" dark height="85">
      <app-navbar @onDrawer="drawer = $event"></app-navbar>
    </v-app-bar>
    <v-content>
      <app-sidenav :drawer="drawer" @onDrawer="drawer = $event"></app-sidenav>
      <v-container>
        <v-row align="center" justify="center">
           <transition name="slide-fade" mode="out-in">
          <router-view  />
          </transition>
        </v-row>
      </v-container>
    </v-content>
    <app-footer></app-footer>
  </v-app>
</template>

<script>
import { AppNavbar, AppFooter, AppSidenav } from './core/components';
import { AppSnackBar } from './shared/components';

export default {
  name: 'App',
  components: {
    AppNavbar,
    AppSidenav,
    AppFooter,
    AppSnackBar
  },

  data() {
    return {
      drawer: false
    };
  }
};
</script>

<style lang="scss">
.app {
  background-image: url('../../public/images/higher-ed.jpg') !important;
  background-size: cover !important;
}
.router-link {
  text-decoration: none;
}
.toast {
  font-size: 20px !important;
  padding: 30px !important;
  height: 50px !important;

  a {
    color: white !important;
  }
}

.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
@media (min-width: 1024px) {
  .side-nav {
    display: none;
  }
}
@media (max-width: 1024px) {
  .side-nav {
    display: block;
    margin-right: 100px;
  }
}
</style>
