<template>
  <v-dialog v-model="dialog" max-width="500px">
    <template v-slot:activator="{ on }">
      <v-btn color="primary" dark class="mb-2" v-on="on">Edit</v-btn>
    </template>
    <v-card color="blue darken-3" dark :loading="isUpdating">
      <template v-slot:progress>
        <v-progress-linear
          absolute
          color="green lighten-3"
          height="4"
          indeterminate
        ></v-progress-linear>
      </template>
      <v-img height="200" src="/images/beautiful-harvard-university.jpg">
        <v-row align="center" justify="center">
          <div class="d-flex align-center justify-center">
            <v-img
              alt="University Logo"
              class="shrink logo-img"
              contain
              src="/images/university-logo.png"
              transition="scale-transition"
              width="100"
            />
          </div>
        </v-row>
        <v-row align="center" justify="center">
          <v-col class="text-center">
            <h3 class="headline">University System</h3>
          </v-col>
        </v-row>
      </v-img>
      <v-form @submit.native="updateForm" ref="updateForm" v-model="valid">
        <v-container>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="user.name"
                :rules="[rules.required()]"
                :disabled="isUpdating"
                filled
                color="blue-grey lighten-2"
                label="Name"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="user.email"
                :rules="[rules.required(), rules.email]"
                :disabled="isUpdating"
                filled
                color="blue-grey lighten-2"
                label="Email"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="user.department"
                :rules="[rules.required()]"
                :disabled="isUpdating"
                filled
                color="blue-grey lighten-2"
                label="Department"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn
            type="button"
            @click="resetForm"
            :loading="isUpdating"
            color="blue-grey darken-3"
            depressed
          >
            <v-icon left>mdi-update</v-icon>
            Reset
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            type="submit"
            :disabled="!valid"
            :loading="isUpdating"
            color="blue-grey darken-3"
            depressed
          >
            <v-icon left>mdi-update</v-icon>
            Update Now
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import { rules } from '../../utils/validators';
import { mapGetters, mapActions } from 'vuex';
import { updateUserInfo } from '../+store/user-state';

export default {
  name: 'EditeForm',
  data() {
    return {
      rules,
      dialog: false,
      valid: false,
      isUpdating: false,
      user: null,
    };
  },
  computed: {
    ...mapGetters('userModule', ['userInfo']),
  },
  created() {
    this.user = {
      name: this.userInfo.name,
      email: this.userInfo.email,
      department: this.userInfo.department,
    };
  },

  methods: {
    ...mapActions('userModule', [updateUserInfo]),
    async updateForm(ev) {
      ev.preventDefault();
      try {
        await this[updateUserInfo](this.user);
      } catch (err) {
        this.resetForm();
      }
      this.isUpdating = false;
      this.dialog = false;
    },
    resetForm() {
      this.user = {
        name: this.userInfo.name,
        email: this.userInfo.email,
        department: this.userInfo.department,
      };
    },
  },
};
</script>

<style scoped></style>
