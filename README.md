## University System

You could view University System App [Here](https://university-system-vuejs.herokuapp.com/)

## Idea
University System app is an application that allows you to created and manage new course.
Every user could add, create and edit students, but the only the creator of the course is could delete it.

## Public part
* Anonymus user
  * On landing page login and register link are provided.
  * User has access to register page.
  * User has access to login page.
## Private part
* Authorized user
  * User could create a new course.
  * User has access to all created courses.
  * User has access to his own profile page.
## Design
* Responsive
## Functionality
* Create course
  * Choose a file from file system and upload it to firebase storage.
* Courses
  * Access to detail page for every course.
  * If current user is creator of the course, he could add, edit and delete new students. 
  * If current user isn`t creator of the course he couldn't delete student.
* Profile
  * Show info for current logged user.
  * User could edit his profile information.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run unit tests
```
npm run test
```
