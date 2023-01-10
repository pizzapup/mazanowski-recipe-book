import { useState } from "react";
import { ingredientSchema } from "./Ingredients";
import Instructions, { instructionSchema } from "./Instructions";
import Input from "../Input/Input";
import ImageInput, { defaultImgUrl } from "./ImageInput";
import { writeData } from "../../firebase/dbHelpers";
import ZestIngredients from "./ZestfulApi";
import "./NewRecipeForm.css";
import axios from "axios";

const uids = "default";

export default function NewRecipeForm() {
  const initialValues = {
    name: "",
    category: "",
    image: defaultImgUrl,
    ingredients: [ingredientSchema],
    instructions: instructionSchema,
  };
  const [values, setValues] = useState(initialValues);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const getIngredients = (ingr) => {
    setValues({ ...values, ingredients: ingr });
  };

  const getInstructions = (instr) => {
    setValues({ ...values, instructions: instr });
  };
  const getImage = (url) => {
    setValues({ ...values, image: url });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
    writeData(values, ["posts", `user-posts/${uids}`]);
  };
  const [newData, setNewData] = useState();
  const getIngData = (ing) => {
    setNewData(ing);
  };
  const handleIngSubmit = (e) => {
    const ingData = getIngData;
    axios
      .request(ingData)
      .then(function (response) {
        console.log(response.data.results);
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={values.name}
          name="name"
          label={"name"}
          onChange={handleInputChange}
        />
        <Input
          type="text"
          value={values.category}
          name="category"
          label="category"
          onChange={handleInputChange}
        />
        <ZestIngredients getData={getIngredients} />
        <Instructions getData={getInstructions} getIngData={getIngData} />
        <ImageInput getData={getImage} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
