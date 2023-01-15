import { Photo, PhotoCamera } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useRef, useState } from "react";
import { Label } from "reactstrap";

export default function DragAndDrop({ handleUpload }) {
  const [dragActive, setDragActive] = useState(false);

  const inputRef = useRef(null);

  const handleDrag = function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = function (e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
    }
  };

  const handleChange = function (e) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleUpload(e);
    }
  };

  const onButtonClick = () => {
    inputRef.current.click();
  };

  return (
    <div
      id="form-file-upload"
      className="dragAndDrop"
      onDragEnter={handleDrag}
      onSubmit={(e) => e.preventDefault()}
    >
      <label
        id="label-file-upload"
        htmlFor="input-file-upload"
        className={dragActive ? "drag-active" : ""}
      >
        <span className="dragAndDropLabel">
          uploade image for recipe (optional)
        </span>
        <div className="dragAndDropText">
          <span>
            (optional image upload)
            <p>Drag and drop your image here or</p>
          </span>
          <button
            className="upload-button"
            type="button"
            onClick={onButtonClick}
          >
            <PhotoCamera />
            Click to upload from your files
          </button>
        </div>
      </label>
      <input
        ref={inputRef}
        type="file"
        id="input-file-upload"
        multiple={false}
        onChange={handleChange}
        accept="/image/*"
      />
      {dragActive && (
        <div
          id="drag-file-element"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        ></div>
      )}
    </div>
  );
}
export const ImageUploadMobile = ({ handleUpload }) => {
  return (
    <label className="file-upload">
      Upload an image (optional)
      <input hidden accept="image/*" type="file" onChange={handleUpload} />
      <PhotoCamera />
    </label>
  );
};
