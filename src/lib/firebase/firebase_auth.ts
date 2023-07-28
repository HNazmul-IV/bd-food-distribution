import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { firebase_app } from "./app";
import Swal from "sweetalert2";

export const firebaseAuth = getAuth(firebase_app);

export async function loginWithEmail(email: string, password: string) {
  signInWithEmailAndPassword(firebaseAuth, email, password).then((res) => {
    console.log(res);
  });
}

export async function createUserWithEmail({ email = "", password = "", display_name = "" }) {
  createUserWithEmailAndPassword(firebaseAuth, email, password)
    .then((result) => {
      console.log(result);
      if (firebaseAuth.currentUser) {
        updateProfile(firebaseAuth.currentUser, {
          displayName: display_name,
        });
      }
    })
    .catch((error) => Swal.fire("Registration Failed", error.message, "error"));
}

onAuthStateChanged(firebaseAuth, (user) => {
  if (user) {
    console.log({ updated_user: user });
  }
});

export function logout() {
  signOut(firebaseAuth)
    .then(() => {
      console.log("successfully logged out");
      return true;
    })
    .catch((error) => {
      console.warn(error);
      return false;
    });
}
