import { useState } from "react";
import Input from "../Input/Input";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase/firebase-config";

export const defaultImgUrl =
  "gs://recipe-book-d5784.appspot.com/files/food-img-placeholder.jpg";
export default function ImageInput({ getData }) {
  const [file, setFile] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  function handleImageChange(e) {
    setFile(e.target.files[0]);
  }
  function handleUpload() {
    const storageRef = ref(storage, `/recipe-imgs/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url);
          setImgUrl(url);
        });
        !file && setImgUrl(defaultImgUrl);
      }
    );
    getData(imgUrl);
  }
  return (
    <>
      <Input
        type="file"
        name="image"
        value={file}
        accept="/image/*"
        label="Upload image (optional)"
        onChange={handleImageChange}
      />
      <button type="button" onClick={handleUpload}>
        upload image
      </button>
    </>
  );
}
