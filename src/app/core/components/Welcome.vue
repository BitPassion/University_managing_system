<template>
  <v-container>
    <v-col class="text-center content">
      <v-row rows="12" md="12">
        <v-img
          src="images/university-logo.png"
          class="my-3"
          contain
          height="200"
        />
      </v-row>
      <v-row
        rows="12"
        md="12"
        class="mb-4 d-flex flex-column"
        align="center"
        justify="center"
      >
        <h1 class="display-2 font-weight-bold mb-3">
          Welcome to
          <br />University System
        </h1>

        <p class="subheading font-regular title ">
          In this system, you can start to create course then
          <br />add new student to it
        </p>
      </v-row>

      <v-row class="mb-5 d-flex flex-column" rows="12" md="12" v-if="isAuth">
        <h2 class="headline font-weight-bold mb-3">
          Check courses or create new course
        </h2>
        <div>
          <router-link :to="{ path: '/course/list' }" class="router-link">
            <v-btn color="primary" class="mr-4 mb-4" width="300"
              >All Courses</v-btn
            >
          </router-link>
          <router-link :to="{ path: '/course/create' }" class="router-link">
            <v-btn color="primary" class="mr-4 mb-4" width="300"
              >Create Create</v-btn
            >
          </router-link>
        </div>
      </v-row>
      <v-row class="mb-5 d-flex flex-column" rows="12" v-else>
        <h2 class="headline font-weight-bold mb-3">
          Join to out university system
        </h2>
        <div>
          <router-link :to="{ path: '/auth/login' }" class="router-link">
            <v-btn color="primary" class="mr-4 mb-4" width="300"
              >Login</v-btn
            ></router-link
          >

          <router-link :to="{ path: '/auth/register' }" class="router-link">
            <v-btn color="primary" class="mr-4 mb-4" width="300"
              >Register</v-btn
            >
          </router-link>
        </div>
      </v-row>
    </v-col>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'Welcome',
  computed: {
    ...mapGetters(['isAuth'])
  }
};
</script>

<style lang="scss" scoped>
.content {
  background-color: rgba(225,226,226,.3);
  border-radius: 20px;
}
.welcome {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
