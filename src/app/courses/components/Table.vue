<template>
  <v-data-table
    :headers="headers"
    :items="students"
    sort-by="name"
    height="300"
    :items-per-page="5"
    :loading="loading"
  >
    <template v-slot:top>
      <v-toolbar flat color="white" height="150">
        <v-avatar class="mr-6">
          <v-img
            aspect-ratio="1"
            class="grey lighten-2 white--text align-end"
            :src="course.imageUrl"
          ></v-img>
        </v-avatar>
        <div class="d-flex">
          <span class="blue--text darken-2 mr-2">Course:</span>
          <p class="mr-6">{{ course.title }}</p>
          <span class="blue--text darken-2 mr-2">Duration:</span>
          <p class="mr-6">{{ course.duration }} weeks</p>
          <span class="blue--text darken-2 mr-2">Start:</span>
          <p class="mr-6">{{ course.startDate }}</p>
        </div>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2 add-btn" v-on="on"
              >Add Student</v-btn
            >
          </template>
          <v-card>
            <v-form
              @submit.prevent="save"
              ref="saveStudentForm"
              v-model="valid"
            >
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <template v-if="formTitle !== 'Edit Student'">
                      <h3 class="title">
                        Select student from student list
                      </h3>
                      <v-col cols="12" sm="8">
                        <v-select
                          :items="allStudents"
                          v-model="selectedStudent"
                          item-text="name"
                          return-object
                          dense
                          label="Select student..."
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="4">
                        <v-btn
                          color="blue darken-1"
                          text
                          class="add-student mb-2"
                          :disabled="!selectedStudent"
                          @click="select"
                          >Select</v-btn
                        >
                      </v-col>
                    </template>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedStudent.name"
                        label="Name"
                        :rules="[rules.required()]"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedStudent.town"
                        label="Town"
                        :rules="[rules.required()]"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedStudent.age"
                        label="Age"
                        :rules="[rules.required()]"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedStudent.groupe"
                        label="Groupe"
                        :rules="[rules.required()]"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="reset">Reset</v-btn>
                <v-btn color="blue darken-1" type="submit" text>Save</v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.action="{ item }">
      <v-icon small class="mr-2" @click="editStudent(item)">mdi-pencil</v-icon>
      <v-icon
        v-if="course._acl.creator === userInfo._id"
        small
        @click="deleteStudent(item)"
        >mdi-delete</v-icon
      >
    </template>
  </v-data-table>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { rules } from '../../utils/validators';
import {
  getAllStudents,
  postStudent,
  updateStudent,
  removeStudent,
} from '../+store/course-state';

export default {
  name: 'Course',
  data() {
    return {
      rules,
      valid: true,
      drawer: false,
      group: null,
      loading: false,
      headers: [
        {
          text: 'Full name',
          align: 'start',
          value: 'name',
        },
        { text: 'Town', value: 'town' },
        { text: 'Age', value: 'age' },
        { text: 'Groupe', value: 'groupe' },
        { text: 'Actions', value: 'action', sortable: false },
      ],
      dialog: false,
      editedIndex: -1,
      students: [],
      editedStudent: {
        name: '',
        town: '',
        age: '',
        groupe: '',
        courses: [],
      },
      selectedStudent: null,
      defaultStudent: {
        name: '',
        town: '',
        age: '',
        groupe: '',
        courses: [],
      },
      url: this.$route.params.id,
    };
  },

  props: {
    courseId: {
      type: String,
      required: true,
    },
  },

  computed: {
    ...mapGetters('courseModule', ['currentCourse', 'allStudents']),
    ...mapGetters('userModule', ['userInfo']),

    course() {
      return this.currentCourse(this.courseId);
    },
    formTitle() {
      return this.editedIndex === -1 ? 'Add Student' : 'Edit Student';
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  created() {
    this.students = this.course.students;
    this[getAllStudents]();
  },
  methods: {
    ...mapActions('courseModule', [
      getAllStudents,
      postStudent,
      updateStudent,
      removeStudent,
    ]),

    editStudent(student) {
      this.dialog = true;
      this.editedIndex = this.students.indexOf(student);
      this.editedStudent = Object.assign({}, student);
    },

    deleteStudent(student) {
      if (!confirm('Are you sure you want to delete this student?')) {
        return;
      }
      this[removeStudent]({ student, course: this.course });
      this.students = this.students.filter((s) => s !== student);
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedStudent = Object.assign({}, this.defaultStudent);
        this.editedIndex = -1;
      }, 300);
    },
    save() {
      if (this.editedIndex > -1) {
        this[updateStudent]({ student: this.editedStudent });

        Object.assign(this.students[this.editedIndex], this.editedStudent);
      } else {
        const action = this.selectedStudent ? updateStudent : postStudent;
        this.editedStudent.courses = this.editedStudent.courses.concat(
          this.course._id
        );
        this.students = this.students.concat(this.editedStudent);
        this[action]({ student: this.editedStudent });
      }
      this.close();
    },
    reset() {
      this.editedStudent = this.defaultStudent;
      this.$refs.saveStudentForm.reset();
    },
    select() {
      this.editedStudent = this.selectedStudent;
    },
  },
};
</script>

<style lang="scss" scoped>
span {
  font-weight: bold;
  color: #3d88d2;
}
@media (max-width: 1200px) {
  .toolbar-title {
    font-size: 16px;
  }
  div.col-md-3.col-12 {
    padding: 0px;
  }
  .add-btn {
    width: 50px;
  }
}
</style>
