import { initializeApp } from "firebase/app";
import { getStorage, ref, deleteObject } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB7xOJJKiC3gKCFjMxdK3pDfEHPwSrs25U",
  authDomain: "the-school-of-fire.firebaseapp.com",
  databaseURL:
    "https://the-school-of-fire-default-rtdb.asia-southeast1.firebasedatabase.app",
  storageBucket: "the-school-of-fire.appspot.com",
};

// * FIREBASE MODUE * //
const firebaseApp = initializeApp(firebaseConfig);
const firebaseStorage = getStorage(firebaseApp);

// storage reference
const firebaseStorageRef = ref(firebaseStorage);

export { firebaseApp, firebaseStorage, firebaseStorageRef};
