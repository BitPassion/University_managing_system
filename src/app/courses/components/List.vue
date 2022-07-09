<template>
  <v-container>
    <app-loader v-if="!loading"></app-loader>
    <v-row v-else>
      <v-col cols="12" md="3" v-if="isFound">
        <div class="font-weight-bold" align="center" justify="center">
          <h1 class="my-10">Not Found Course</h1>
          <router-link :to="{ path: '/course/create' }" class="router-link">
            <v-btn color="primary" width="250">Create Create</v-btn>
          </router-link>
        </div>
      </v-col>
      <v-col
        v-else
        cols="12"
        md="3"
        v-for="course in courseSearch || allCourses"
        :key="course._id"
      >
        <v-card class="mx-auto" width="400" elevation="20">
          <v-img
            aspect-ratio="1"
            class="grey lighten-2 white--text align-end"
            height="200px"
            :src="course.imageUrl"
            :lazy-src="course.imageUrl"
          >
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular
                  indeterminate
                  color="blue lighten-2"
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>

          <v-card-title class="font-weight-bold blue--text darken-2">
            <div class="title">{{ course.title }}</div>
          </v-card-title>

          <v-card-subtitle
            v-if="course.available"
            :class="{ available: course.available }"
            class="pb-0 d-flex subtitle align-center font-weight-bold justify-space-between"
          >
            <div class="blue--text darken-2">Start: {{ course.startDate }}</div>
            <div class="green--text darken-2">
              <v-icon large color="green darken-2">present_to_all</v-icon>
              Available
            </div>
          </v-card-subtitle>
          <v-card-subtitle
            v-else
            class="pb-0 d-flex subtitle align-center justify-end"
          >
            <v-icon large color="red darken-2">cancel_presentation</v-icon>
            <div>Closed</div>
          </v-card-subtitle>

          <v-card-text class="text--primary">
            <div>{{ course.description }}</div>
          </v-card-text>
          <v-card-actions>
            <router-link
              class="router-link btn-detail"
              :to="{ name: 'course-detail', params: { id: course._id } }"
            >
              <v-btn color="primary" class="mr-4">View</v-btn>
            </router-link>
            <v-btn
              v-if="course._acl.creator === userInfo._id"
              color="error"
              class="mr-4 btn-delete"
              @click.native="deleteCourse({ id: course._id })"
              >Delete</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AppLoader from '@/app/shared/components/Loader.vue';
import { mapGetters, mapActions } from 'vuex';
import {
  getAllCourses,
  deleteCourse,
  resetCourses,
} from '../+store/course-state';
export default {
  name: 'List',
  components: {
    AppLoader,
  },
  data() {
    return {
      loading: true,
    };
  },
  computed: {
    ...mapGetters('courseModule', ['allCourses', 'courseSearch']),
    ...mapGetters('userModule', ['userInfo']),
    isFound() {
      return this.courseSearch !== null && this.courseSearch.length === 0;
    },
  },
  created() {
    this.loading = false;
    this[getAllCourses]().then(() => (this.loading = true));
  },
  destroyed() {
    this[resetCourses]();
  },
  methods: {
    ...mapActions('courseModule', [getAllCourses, deleteCourse, resetCourses]),
    deleteCourse(id) {
      this[deleteCourse](id);
    },
  },
};
</script>

<style lang="scss" scoped></style>
