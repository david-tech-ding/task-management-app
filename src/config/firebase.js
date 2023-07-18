import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAJv-vJvf585MZ0poOjBWynBBiq9W4fCl4",
  authDomain: "task-management-app-d0b1d.firebaseapp.com",
  projectId: "task-management-app-d0b1d",
  storageBucket: "task-management-app-d0b1d.appspot.com",
  messagingSenderId: "357587538083",
  appId: "1:357587538083:web:2850e62cf8ae51bf87af16",
  measurementId: "G-YB9G43E89B",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export default app;
