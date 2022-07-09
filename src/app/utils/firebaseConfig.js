import * as firebase from "firebase";
import "firebase/app";
import "firebase/storage";

var firebaseConfig = {
  apiKey: 'AIzaSyBofdd4FPGA1KZjPVqtT7FL6eXsv18sggM',
  authDomain: 'university-system-dfd77.firebaseapp.com',
  databaseURL: 'https://university-system-dfd77.firebaseio.com',
  projectId: 'university-system-dfd77',
  storageBucket: 'university-system-dfd77.appspot.com',
  messagingSenderId: '259784247962',
  appId: '1:259784247962:web:719adeab51c7a5e549ed23'
};

firebase.initializeApp(firebaseConfig);

export const dbStorage = firebase.storage();
