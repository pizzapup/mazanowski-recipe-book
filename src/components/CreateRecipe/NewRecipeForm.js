import { useState } from "react";
import Instructions, { instructionSchema } from "./Instructions";
import ImageInput, { defaultImgUrl } from "./ImageInput";
import { writeData } from "../../firebase/dbHelpers";
import ZestIngredients, { ingredientSchema, sendAxios } from "./ZestfulApi";
import "./NewRecipeForm.css";
import axios from "axios";
import { TextField } from "@mui/material";
import CategoryInput from "./CategoryInput";

const uids = "default";

export default function NewRecipeForm() {
  const initialValues = {
    name: "",
    category: "",
    image: defaultImgUrl,
    ingredients: [],
    instructions: instructionSchema,
  };
  const [ings, setIngs] = useState("");
  const [file, setFile] = useState("");
  const [values, setValues] = useState(initialValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  function handleImageChange(e) {
    setFile(e.target.files[0]);
  }
  const getInstructions = (instr) => {
    setValues({ ...values, instructions: instr });
  };
  const getImage = (url) => {
    setValues({ ...values, image: url });
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
  function handleUpload({ file }) {
    const storageRef = ref(storage, `/recipe-imgs/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url);
          setValues({ ...values, image: url });
        });
        !file &&
          setValues({
            ...values,
            image:
              "gs://recipe-book-d5784.appspot.com/files/food-img-placeholder.jpg",
          });
      }
    );
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
    ingParse();
    writeData(values, ["posts", `user-posts/${uids}`]);
  };
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <TextField
          id="outlined-basic"
          value={values.name}
          name="name"
          label="name"
          onChange={handleInputChange}
          variant="outlined"
        />
        <TextField
          id="outlined-basic"
          value={values.category}
          name="category"
          label="category"
          onChange={handleInputChange}
          variant="outlined"
        />
        <TextField
          onChange={(e) => setIngs(e.target.value)}
          value={ings}
          name="ingredients"
          id="outlined-textarea"
          label="ingredients"
          placeholder="3/4 cup diced tomato"
          helperText="example: 2 cups white flour, 1tsp salt, 2 cloves garlic minced, 1/2 cup chicken broth"
          multiline
        />
        <Instructions getData={getInstructions} />

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
