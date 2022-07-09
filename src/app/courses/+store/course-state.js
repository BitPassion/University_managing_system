// import { setSnackbarSuccess } from '../../shared/+store/snackbar-state';
import { http } from '../../services/httpClient';
import { dbStorage } from '../../utils/firebaseConfig';
import { toastSuccess, toastError } from '@/plugins/toasted';

const initialState = {
  allCourses: [],
  allStudents: [],
  course: {
    _id: null,
  },
  courseSearch: null,
};

export const actionTypes = {
  getAllCourses: 'GET ALL COURSES SUCCESS',
  getCourse: 'GET SINGLE COURSE SUCCESS',
  deleteCourse: 'DELETE COURSE SUCCESS',
  createCourse: 'CREATE NEW COURSE SUCCESS',
  getAllStudents: 'students/GET ALL STUDENTS SUCCESS',
  postStudent: 'students/POST STUDENT SUCCESS',
  updateStudent: 'students/UPDATE STUDENT SUCCESS',
  removeStudent: 'students/REMOVE STUDENT FROM COURSE SUCCESS',
  getCourseSearch: 'SEARCH COURSES SUCCESS',
  resetCourses: 'RESET ALL COURSES AND SEARCH COURSE',
};

export const {
  getAllCourses,
  getAllStudents,
  getCurrentCourseInfo,
  postStudent,
  updateStudent,
  removeStudent,
  getCourse,
  getCourseStudents,
  deleteCourse,
  createCourse,
  getCourseSearch,
  resetCourses,
} = actionTypes;

const getters = {
  allCourses: (state) => state.allCourses,
  allStudents: (state) => state.allStudents,
  currentCourse: (state) => (id) => state.allCourses.find((c) => c._id == id),
  courseSearch: (state) => state.courseSearch,
};

const actions = {
  async [getAllCourses]({ commit }) {
    const { data: courses } = await http.get('courses');
    const list = courses.map(async (course) => {
      const { data: students } = await http.get(
        `students/?query={"courses":"${course._id}"}`
      );
      return { ...course, students };
    });
    Promise.all(list).then((data) => {
      commit(getAllCourses, data);
    });
  },
  async [getCourse]({ commit }, payload) {
    const { id } = payload;
    const { data: students } = await http.get(
      `students/?query={"courses":"${id}"}`
    );
    const { data: courses } = await http.get(`courses/?query={"_id":"${id}"}`);
    const data = Object.assign(courses[0], { students });
    commit(getCourse, data);
  },
  async [deleteCourse]({ commit, state }, payload) {
    if (!confirm('Are you sure you want to delete this course?')) {
      return;
    }
    const { id } = payload;
    const { data: students } = await http.get('students');
    students
      .filter((s) => s.courses.includes(id))
      .map((s) => {
        s.courses = s.courses.filter((c) => c !== id);
        return s;
      })
      .forEach((student) => {
        http.put(`students/${student._id}`, student);
      });
    await http.delete(`courses/${id}`);
    const { imageTitle } = state.allCourses.find((c) => c._id == id);
    dbStorage
      .ref()
      .child(`images/${imageTitle}`)
      .delete()
      .then(() => {
        const newListCourses = state.allCourses.filter((c) => c._id !== id);
        commit(deleteCourse, newListCourses);
        toastSuccess('Successfully Deleted');
      });
  },
  async [getAllStudents]({ commit }) {
    try {
      const { data: students } = await http.get('students');
      commit(getAllStudents, students);
    } catch (err) {
      toastError(`Something went wrong! ${err}`);
    }
  },
  async [postStudent](_, payload) {
    try {
      const { student } = payload;
      await http.post('students', student);
      toastSuccess('Successfully create student!');
    } catch (err) {
      toastError(`Something went wrong! ${err}`);
    }
  },
  async [removeStudent](_, payload) {
    try {
      const { student, course } = payload;
      student.courses = student.courses.filter((c) => c !== course._id);
      await http.put(`students/${student._id}`, student);
      toastSuccess('Successfully remove student!');
    } catch (err) {
      toastError(`Something went wrong! ${err}`);
    }
  },
  async [updateStudent](_, payload) {
    try {
      const { student } = payload;
      await http.put(`students/${student._id}`, student);
      toastSuccess('Successfully !');
    } catch (err) {
      toastError(`Something went wrong! ${err}`);
    }
    // dispatch(setSnackbarSuccess, {
    //   message: 'Successfully Updated'
    // });
  },
  async [createCourse]({ commit, state }, payload) {
    const { selectedFile } = payload;
    const task = dbStorage
      .ref()
      .child(`images/${selectedFile.name}`)
      .put(selectedFile);
    task.on(
      'state_changed',
      (snapshot) => {
        console.log(snapshot);
      },
      (error) => console.error(error),
      async function () {
        try {
          const url = await task.snapshot.ref.getDownloadURL();
          const { data: course } = await http.post('courses', {
            ...payload,
            imageUrl: url,
            imageTitle: selectedFile.name,
          });
          const newListCourses = state.allCourses.concat(course);
          commit(createCourse, newListCourses);
          toastSuccess('Successfully create course!');
        } catch (err) {
          toastError(`Something went wrong! ${err}`);
        }
      }
    );
  },
  async [getCourseSearch]({ commit, getters }, payload) {
    const { searchInput } = payload;
    const foundCourses = getters.allCourses.filter((c) =>
      c.title.toLowerCase().includes(searchInput.toLowerCase())
    );
    commit(getCourseSearch, foundCourses);
  },
  async [resetCourses]({ commit }) {
    commit(resetCourses);
  },
};

const mutations = {
  [getAllCourses](state, payload) {
    Object.assign(state, { allCourses: payload });
  },
  [createCourse](state, payload) {
    Object.assign(state, { allCourses: payload });
  },
  [getCourse](state, payload) {
    Object.assign(state, { course: payload });
  },
  [deleteCourse](state, payload) {
    Object.assign(state, { allCourses: payload });
  },
  [getAllStudents](state, payload) {
    Object.assign(state, { allStudents: payload });
  },
  [getCourseSearch](state, payload) {
    Object.assign(state, { courseSearch: payload });
  },
  [resetCourses](state) {
    Object.assign(state, { courseSearch: null });
  },
};

export default {
  namespaced: true,
  getters,
  mutations,
  actions,
  state: initialState,
};
