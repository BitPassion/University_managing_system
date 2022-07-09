<template>
  <v-col cols="12" md="12" align="center">
    <v-card width="600" elevation="20">
      <v-card-text>
        <v-form
          @submit.native="createCourse"
          v-model="valid"
          class="pa-6 submit"
        >
          <v-col cols="12" md="12" align="center">
            <h2>Create Course</h2>
          </v-col>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="title"
                :rules="[rules.required('Title')]"
                prepend-icon="label"
                label="Title"
              ></v-text-field>
              <v-text-field
                v-model.number="duration"
                :rules="[rules.required('Duration'), rules.range(0, 100)]"
                prepend-icon="access_alarms"
                label="Duration"
              ></v-text-field>

              <v-file-input
                v-model="selectedFile"
                label="Image"
                prepend-icon="mdi-camera"
                :rules="[rules.required('Image')]"
                ref="file"
              ></v-file-input>
            </v-col>
            <v-col cols="12" md="6">
              <v-menu
                ref="startMenu"
                v-model="startMenu"
                :close-on-content-click="false"
                :nudge-right="40"
                :return-value.sync="startDate"
                transition="scale-transition"
                min-width="290px"
                offset-y
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="startDate"
                    :rules="[rules.required()]"
                    class="mt-3"
                    label="Start Date"
                    prepend-icon="event"
                    dense
                    readonly
                    hide-details
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="startDate" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="startMenu = false"
                    >Cancel</v-btn
                  >
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.startMenu.save(startDate)"
                    >OK</v-btn
                  >
                </v-date-picker>
              </v-menu>
              <v-textarea
                v-model="description"
                :rules="[rules.required('Description'), rules.length(150)]"
                prepend-icon="comment"
                label="Description"
                counter="150"
                no-resize
                rows="5"
                row-height="15"
              ></v-textarea>
            </v-col>
            <v-col cols="12" md="12" align="center">
              <v-divider></v-divider>
              <v-container class="actions">
                <v-btn
                  type="submit"
                  :disabled="!valid"
                  color="success"
                  class="mr-4"
                  width="200"
                  >Create</v-btn
                >
              </v-container>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
import { mapActions } from 'vuex';
import { createCourse } from '../+store/course-state';
import { rules } from '../../utils/validators';
export default {
  name: 'Create',
  data() {
    return {
      rules,
      startMenu: false,
      valid: false,
      title: '',
      duration: '',
      selectedFile: null,
      startDate: null,
      description: '',
      students: [],
    };
  },
  methods: {
    ...mapActions('courseModule', [createCourse]),
    async createCourse(ev) {
      ev.preventDefault();
      await this[createCourse]({
        title: this.title,
        duration: this.duration,
        startDate: this.startDate,
        available: true,
        description: this.description,
        selectedFile: this.selectedFile,
        imageUrl: null,
        students: this.students,
      });
      this.$router.push('/course/list');
    },
  },
};
</script>

<style lang="scss" scoped></style>
