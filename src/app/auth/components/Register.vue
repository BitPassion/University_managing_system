<template>
  <v-col cols="12" md="12" align="center">
    <v-card class="px-2 py-8" elevation="20" width="600">
      <v-card-title class="d-flex justify-center">
        <h2>Registration</h2>
      </v-card-title>
      <v-card-text>
        <v-form @submit.native="register" ref="registerForm" v-model="valid">
          <v-container class="d-flex justify-space-between">
            <v-container class="mr-4">
              <v-text-field
                v-model="username"
                prepend-icon="account_box"
                :loading="loading"
                :rules="[rules.required('Username'), rules.max(10)]"
                label="Username"
                type="text"
              ></v-text-field>
              <v-text-field
                v-model="password"
                name="password"
                prepend-icon="lock"
                :loading="loading"
                :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required('Password'), rules.min(6)]"
                :type="showPass ? 'text' : 'password'"
                label="Password"
                class="input-group--focused"
                @click:append="showPass = !showPass"
              ></v-text-field>
              <v-text-field
                v-model="rePassword"
                name="rePassword"
                prepend-icon="lock"
                :loading="loading"
                :append-icon="showRepeatPass ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[
                  rules.required('Repeat password'),
                  rules.sameAs(password),
                ]"
                :type="showRepeatPass ? 'text' : 'password'"
                label="Repeat Password"
                class="input-group--focused"
                @click:append="showRepeatPass = !showRepeatPass"
              ></v-text-field>
              <v-checkbox
                v-model="checkbox"
                :rules="[(v) => !!v || 'You must agree to continue!']"
                label="Do you agree?"
                required
              ></v-checkbox>
            </v-container>
            <v-container>
              <v-text-field
                v-model="name"
                prepend-icon="account_box"
                :loading="loading"
                :rules="[rules.required('Name')]"
                label="Name"
                type="text"
                required
              ></v-text-field>
              <v-text-field
                v-model="email"
                prepend-icon="email"
                :loading="loading"
                :rules="[rules.required('Email'), rules.email]"
                label="E-mail"
                type="email"
                required
              ></v-text-field>
              <v-text-field
                v-model="department"
                prepend-icon="account_balance"
                :loading="loading"
                :rules="[rules.required()]"
                label="Department"
                type="text"
                required
              ></v-text-field>
            </v-container>
          </v-container>
          <v-container class="d-flex justify-space-between actions">
            <v-btn
              type="submit"
              :loading="loading"
              :disabled="!valid"
              color="success"
              class="mr-4 submit-btn"
              width="300"
              >Register</v-btn
            >
            <v-btn
              color="error"
              class="mr-4 reset-btn"
              type="button"
              @click="reset"
              width="100"
              >Reset</v-btn
            >
          </v-container>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions class="d-flex justify-center ">
        <span class="mr-4">
          Already have an account?
        </span>
        <router-link :to="{ path: '/auth/login' }">Login</router-link>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script>
import { rules } from '../../utils/validators';
import { register } from '../+store/auth-state';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Register',
  data() {
    return {
      rules,
      valid: true,
      checkbox: false,
      showRepeatPass: false,
      showPass: false,
      name: '',
      password: '',
      rePassword: '',
      username: '',
      email: '',
      department: '',
    };
  },
  computed: {
    ...mapGetters({
      loading: 'isLoading',
    }),
  },
  methods: {
    ...mapActions([register]),
    async register(ev) {
      ev.preventDefault();
      try {
        await this[register]({
          username: this.username,
          password: this.password,
          name: this.name,
          email: this.email,
          department: this.department,
        });
        this.$router.push('/auth/login');
      } catch (err) {
        this.$store.commit('isLoading');
        this.$refs.registerForm.reset();
      }
    },
    reset() {
      this.$refs.registerForm.reset();
    },
  },
};
</script>

<style scoped>
@media (max-width: 1200px) {
  .submit-btn {
    width: 200px !important;
  }
  .reset-btn {
    width: 80px !important;
  }
}
</style>
