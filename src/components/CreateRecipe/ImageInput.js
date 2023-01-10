import { useState } from "react";
import Input from "../Input/Input";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase/firebase-config";

export const defaultImgUrl =
  "gs://recipe-book-d5784.appspot.com/files/food-img-placeholder.jpg";
export default function ImageInput({ getData }) {
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
