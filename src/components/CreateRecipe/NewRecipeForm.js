import { useEffect, useState } from "react";
import Ingredients, { EditIngredients, ingredientSchema } from "./Ingredients";
import Instructions, { instructionSchema } from "./Instructions";
import Input, { InputGroup } from "../Input/Input";
import ImageInput, { defaultImgUrl } from "./ImageInput";
import { onValue, ref, remove, update, push, child } from "firebase/database";
import { deleteData, updateData, writeData } from "../../firebase/dbHelpers";
import { db } from "../../firebase/firebase-config";
import ZestIngredients from "./ZestfulApi";
import { parse } from "recipe-ingredient-parser-v3";
const uids = "default";
export default function NewRecipeForm() {
  const initialValues = {
    name: "",
    category: "",
    image: defaultImgUrl,
    ingredients: [ingredientSchema],
    instructions: [instructionSchema],
  };
  const [values, setValues] = useState(initialValues);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const getIngredients = (ings) => {
    let newIngs = values.ingredients.concat(ingredientSchema);
    setValues({ ...values, ingredients: values.ingredients.concat(newIngs) });
  };
  const getInstructions = (instr) => {
    setValues({ ...values, instructions: instr });
  };
  const getZesty = (ings) => {
    let newIngs = values.ingredients.concat(ingredientSchema);
    setValues({ ...values, ingredients: values.ingredients.concat(newIngs) });
  };
  const getImage = (url) => {
    setValues({ ...values, image: url });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);

    writeData(values, ["posts", `user-posts/${uids}`]);
  };

  return (
    <>
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
        <ZestIngredients getData={getZesty} />

        <Instructions getData={getInstructions} />
        <ImageInput getData={getImage} />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
