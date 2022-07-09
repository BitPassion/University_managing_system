<template>
  <v-container>
    <app-loader v-if="loading"></app-loader>
    <v-card v-else class="mx-auto" width="700" elevation="24" tile>
      <v-img
        height="100%"
        src="/images/beautiful-harvard-university.jpg"
        gradient="to top right, rgba(0,0,0,.33), rgba(25,32,72,.53)"
      >
        <v-row align="start" class="fill-height">
          <v-col align-self="center" class="" cols="12" md="4">
            <v-avatar class="profile" size="164" tile>
              <v-img aspect-ratio="1" src="/images/1014-512.png"></v-img>
            </v-avatar>

            <div class="ml-4">
              <v-list-item color="rgba(0, 0, 0, .4)" dark>
                <v-list-item-content>
                  <v-list-item-title class="title"
                    >Full name:</v-list-item-title
                  >
                  <v-list-item-subtitle class="fullname">{{
                    userInfo.name
                  }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item color="rgba(0, 0, 0, .4)" dark>
                <v-list-item-content>
                  <v-list-item-title class="title">Email:</v-list-item-title>
                  <v-list-item-subtitle>{{
                    userInfo.email
                  }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </div>
            <div class="mx-10">
              <app-edit-form></app-edit-form>
            </div>
          </v-col>
          <v-col cols="12" md="8">
            <v-row align="center" justify="center">
              <div class="d-flex align-center justify-center">
                <v-img
                  alt="University Logo"
                  class="shrink logo-img"
                  contain
                  src="/images/university-logo.png"
                  transition="scale-transition"
                  width="90"
                />
              </div>
            </v-row>
            <v-row>
              <v-col>
                <v-list-item color="rgba(0, 0, 0, .4)" dark>
                  <v-list-item-content>
                    <v-list-item-title class="title"
                      >Departmant:</v-list-item-title
                    >
                    <v-list-item-subtitle>{{
                      userInfo.department
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
              <v-col>
                <v-list-item color="rgba(0, 0, 0, .4)" dark>
                  <v-list-item-content>
                    <v-list-item-title class="title"
                      >Courses:</v-list-item-title
                    >
                    <v-list-item-subtitle>
                      <v-list-item
                        color="rgba(0, 0, 0, .4)"
                        dark
                        v-for="(c, i) in courses"
                        :key="i"
                      >
                        <v-list-item-content>
                          <v-list-item-subtitle>{{ c }}</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-img>
    </v-card>
  </v-container>
</template>

<script>
import AppEditForm from './EditForm.vue';
import AppLoader from '../../shared/components/Loader.vue';
import { mapActions, mapGetters } from 'vuex';
import { getUserCourses, updateUserInfo } from '../+store/user-state';
export default {
  name: 'Profile',
  components: {
    AppEditForm,
    AppLoader,
  },
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    ...mapGetters('userModule', ['userInfo', 'userCourses']),
    courses() {
      return this.userCourses.map((c) => c.title);
    },
  },
  async created() {
    try {
      this.loading = true;
      await this[updateUserInfo]()
      await this[getUserCourses]();
    } catch (err) {
      console.error(err);
    }
    this.loading = false;
  },
  methods: {
    ...mapActions('userModule', [updateUserInfo, getUserCourses]),
  },
};
</script>

<style lang="scss" scoped></style>
