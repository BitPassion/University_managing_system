<template>
  <app-loader v-if="loading"> </app-loader>

  <v-col cols="12" md="8" v-else>
    <v-card flat tile>
      <v-window v-model="onboarding" reverse>
        <v-window-item v-for="course in courseList" :key="`card-${course._id}`">
          <app-table :courseId="course._id"></app-table>
        </v-window-item>
      </v-window>
      <v-card-actions class="justify-space-between">
        <v-btn class="btn-prev" :loading="loading" text @click.native="prev">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <v-item-group v-model="onboarding" class="text-center" mandatory>
          <v-item
            v-for="course in courseList"
            :key="`btn-${course._id}`"
            v-slot:default="{ active, toggle }"
          >
            <v-btn :input-value="active" icon @click="toggle">
              <v-icon>mdi-record</v-icon>
            </v-btn>
          </v-item>
        </v-item-group>
        <v-btn class="btn-next" :loading="loading" text @click.native="next">
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script>
import AppTable from './Table.vue';
import { AppLoader } from '../../shared/components';
import { mapGetters, mapActions } from 'vuex';
import { getAllCourses } from '../+store/course-state';
export default {
  name: 'Detail',
  components: {
    AppTable,
    AppLoader,
  },
  data() {
    return {
      // courseId: null,
      loading: false,
      onboarding: 0,
    };
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapGetters('courseModule', ['allCourses']),
    courseList() {
      return this.allCourses || [];
    },
  },
  methods: {
    ...mapActions('courseModule', [getAllCourses]),
    next() {
      this.onboarding =
        this.onboarding + 1 === this.courseList.length
          ? 0
          : this.onboarding + 1;
      const { _id } = this.courseList[this.onboarding];
      this.$router.push(`/course/${_id}`);
    },
    prev() {
      this.onboarding =
        this.onboarding - 1 < 0
          ? this.courseList.length - 1
          : this.onboarding - 1;
      const { _id } = this.courseList[this.onboarding];
      this.$router.push(`/course/${_id}`);
    },
  },
  async created() {
    this.loading = true;
    // this.courseId = this.$route.params.id;
    // await this[getCourse]({ id: this.id });
    await this[getAllCourses]();
    this.onboarding = this.allCourses.findIndex((c) => c._id === this.id);
    this.loading = false;
  },
};
</script>

<style scoped></style>
