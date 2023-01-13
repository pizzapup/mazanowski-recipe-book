import { db, firestore } from "./firebase-config";
import { ref, push, child, update, remove, onValue } from "firebase/database";
import { collection, doc, setDoc, updateDoc } from "firebase/firestore";

export async function writeDocData(updates, dbTarget) {
  const dataRef = doc(firestore, dbTarget);
  await updateDoc(dataRef, updates);
}

export async function writeData(values, dbTarget, ...props) {
  const postKey =
    props.postKey && props.postKey !== "none"
      ? props.postKey
      : push(child(ref(db), `${dbTarget[0]}`)).key;
  const postData = { ...values };
  const updates = {};
  dbTarget.map((location) => (updates[`/${location}/` + postKey] = postData));
  try {
    await update(ref(db), updates);
    alert("Data saved successfully!" + console.table(values));
  } catch (error) {
    alert("The write failed...");
  }
}

export async function updateData(values, postKey, dbTarget) {
  const updates = {};
  dbTarget.map((location) => (updates[`/${location}/${postKey}`] = values));
  try {
    await update(ref(db), updates);
    alert("Data saved successfully!" + console.table(values));
  } catch (error) {
    alert("The write failed...");
  }
}

export async function deleteData(postKey, dbTarget) {
  const updates = {};
  dbTarget.map((location) => remove(ref(db, `/${location}/${postKey}`)));
  try {
    await update(ref(db), updates);
    alert("Data removed successfully!");
  } catch (error) {
    alert("The write failed...");
  }
}

export async function addUserDoc(uid, data) {
  const usersRef = doc(firestore, "users", uid);
  await setDoc(usersRef, data);
}
export async function updateDocData(dbTarget, updates) {
  const dataRef = doc(firestore, dbTarget);
  await updateDoc(dataRef, updates);
}
