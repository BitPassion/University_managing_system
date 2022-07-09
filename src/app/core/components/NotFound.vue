<template>
  <v-img src="/images/HTML-Yeti-404-Page.gif" aspect-ratio="2.32" class="page-404 ma-8 d-flex align-center">
    <router-link :to="{ name: 'home' }" class="ma-10  d-flex justify-end"
      ><v-btn color="primary"  width="300" class="page-404 ma-6"
        >Go Home</v-btn
      ></router-link
    >
  </v-img>
</template>

<script>
export default {
  name: 'NotFound'
};
</script>

<style scoped>
.page-404 {
  border-radius: 30px;
}
</style>
