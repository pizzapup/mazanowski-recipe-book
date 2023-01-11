import { useEffect, useState } from "react";
import Instructions, { instructionSchema } from "./Instructions";
import { writeData } from "../../firebase/dbHelpers";
import "./NewRecipeForm.css";
import axios from "axios";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "../../firebase/firebase-config";
import Input, { TextArea } from "../Input/Input";
import CategoryInput from "./CategoryInput";
import { TextField } from "@mui/material";

const uids = "default";
const defaultImgUrl =
  "gs://recipe-book-d5784.appspot.com/files/food-img-placeholder.jpg";

export default function NewRecipeForm() {
  const initialValues = {
    name: "default",
    category: "uncategorized",
    image: defaultImgUrl,
    ingredients: [],
    instructions: "",
    notes: "",
  };
  const [ings, setIngs] = useState("");
  const [imgFile, setImgFile] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);
  const [values, setValues] = useState(initialValues);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const getInstructions = (instr) => {
    setValues({ ...values, instructions: instr });
  };
  const getCategory = (cat) => {
    setValues({ ...values, category: cat });
  };
  const ingParse = () => {
    const options = {
      method: "POST",
      url: "https://zestful.p.rapidapi.com/parseIngredients",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "d34fbad9damsh82dd8ff206f6231p1a950djsn8c6b8c7ab9c9",
        "X-RapidAPI-Host": "zestful.p.rapidapi.com",
      },
      data: { ingredients: parseUserInput(ings) },
    };
    axios
      .request(options)
      .then(function (response) {
        console.log(response.data.results);
        setValues({ ...values, ingredients: [response.data.results] });
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const handleUpload = (e) => {
    const imgName =
      values.name !== "default"
        ? `/recipe-img/${values.name}-image`
        : `/recipe-imgs/${imgFile.name}`;
    const storageRef = ref(storage, imgName);
    const uploadTask = uploadBytesResumable(storageRef, imgFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgUrl(downloadURL);
          setValues({ ...values, image: imgUrl });
        });
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpload();
    ingParse();
    writeData(values, ["posts", `user-posts/${uids}`]);
  };
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <Input
          value={values.name}
          name="name"
          label="name"
          onChange={handleInputChange}
        />
        <CategoryInput getData={getCategory} />
        <TextArea
          onChange={(e) => setIngs(e.target.value)}
          value={ings}
          name="ingredients"
          label="ingredients"
          placeholder="3/4 cup diced tomato"
          helperText="example: 2 cups white flour, 1tsp salt, 2 cloves garlic minced, 1/2 cup chicken broth"
          multiline
        />
        <TextArea
          value={values.notes}
          name="notes"
          label="additional info/notes:"
          onChange={handleInputChange}
        />
        <TextArea
          value={values.instructions}
          name="instructions"
          label="instructions:"
          onChange={handleInputChange}
        />
        <Input
          type="file"
          name="image"
          accept="/image/*"
          label="Upload image (optional)"
          onChange={(e) => setImgFile(e.target.files[0])}
          className="file-upload"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
export function parseUserInput(input) {
  const userIngredients = [];
  if (input.includes(",") == true) {
    input.split(",").forEach(function (item) {
      userIngredients.push(item.trim());
    });
  } else {
    userIngredients.push(input);
  }
  return userIngredients;
}
