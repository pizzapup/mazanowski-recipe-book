import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
  signInAnonymously,
} from "firebase/auth";
import { auth, firestore } from "../firebase-config";
import { addUserDoc, updateDocData, writeData } from "../dbHelpers";
import { doc, setDoc, updateDoc } from "firebase/firestore";
const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState({});

  function logIn(email, password) {
    try {
      const userCredential = signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      return true;
    } catch (error) {
      return { error: error.message };
    }
  }

  const signInAnon = async () => {
    try {
      const response = await signInAnonymously(auth);
      const user = response.user;
      const uid = user.uid;
      const data = {
        uid: user.uid,
        username: "default",
        displayName: "default",
        isAnon: true,
      };

      const userRef = doc(firestore, "users", uid);
      await setDoc(userRef, data);
      addUserDoc(uid, data);
    } catch (error) {
      console.log(error);
    }
  };

  async function signUp(email, password, username) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const uid = user.uid;
      const data = {
        uid: user.uid,
        email: user.email,
        displayName: username,
      };
      updateProfile(user, data);
      // writeData(data, [`users/${uid}`]);
      addUserDoc(uid, data);
      return true;
    } catch (error) {
      return { error: error.message };
    }
  }

  function logOut() {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      console.log("Auth", currentuser);
      setUser(currentuser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <userAuthContext.Provider
      value={{ user, logIn, signUp, logOut, signInAnon }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
