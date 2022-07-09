<template>
  <v-snackbar v-model="show" :color="color" :timeout="2000" :top="true">
    {{message}}
    <v-btn dark text @click="show = false">Close</v-btn>
  </v-snackbar>
</template>

<script>
import { resetSnackbar } from "../+store/snackbar-state";
export default {
  data() {
    return {
      show: false,
      message: "",
      color: ""
    };
  },

  created: function() {
    this.$store.watch(
      state => state.snackbarState.snackbar.message,
      () => {
        const msg = this.$store.state.snackbarState.snackbar.message;
        const color = this.$store.state.snackbarState.snackbar.color;

        if (msg !== "") {
          this.show = true;
          this.message = msg;
          this.color = color;
          this.$store.commit(resetSnackbar, {
            color: "",
            message: ""
          });
        }
      }
    );
  }
};
</script>