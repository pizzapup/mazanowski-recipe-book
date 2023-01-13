import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { auth, db } from "../firebase-config";

const blankUserInfo = {
  displayName: "default",
  photoURL: "",
  email: "",
  uid: "0",
};

export const signUp = async (email, password, username) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    updateProfile(user, { displayName: username });
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      email: user.email,
      username: username,
      displayName: user.displayName,
    });
    return true;
  } catch (error) {
    return { error: error.message };
  }
};
export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    return true;
  } catch (error) {
    return { error: error.message };
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    return true;
  } catch (error) {
    return false;
  }
};

// export function AuthStateChange() {
//   const [userInfo, setUserInfo] = useState(blankUserInfo);
//   onAuthStateChanged(auth, (user) => {
//     if (user !== null) {
//       console.log("signed in!");
//       const displayName = user.displayName;
//       const email = user.email;
//       const photoURL = user.photoURL;
//       const emailVerified = user.emailVerified;
//       const uid = user.uid;
//       setUserInfo({
//         displayName: displayName,
//         email: email,
//         photoURL: photoURL,
//         emailVerified: emailVerified,
//         uid: uid,
//       });
//       console.log(userInfo);
//     } else {
//       setUserInfo(blankUserInfo);
//       console.log("signed out");
//     }
//   });
//   return userInfo;
// }

// export function SignOut() {
//   signOut(auth)
//     .then(() => {
//       console.log("signedout");
//       // Sign-out successful.
//       AuthStateChange();
//     })
//     .catch((error) => {
//       // An error happened.
//       console.log("error", error);
//     });
// }
// export function SignUpEmail(email, password, username) {
//   createUserWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//       // Signed in
//       console.log("hello");
//       const user = userCredential.user;
//       updateProfile(auth.currentUser, { displayName: username });
//       console.log(username);
//     })
//     .catch((error) => {
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       console.log(errorCode, errorMessage, "error");
//     });
// }
// export function SignInEmail(email, password) {
//   signInWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//       // Signed in
//       const user = userCredential.user;
//       console.log("hello");
//       console.log(user.displayName);
//       AuthStateChange();
//       // ...
//     })
//     .catch((error) => {
//       const errorCode = error.code;
//       const errorMessage = error.message;
//     });
// }
