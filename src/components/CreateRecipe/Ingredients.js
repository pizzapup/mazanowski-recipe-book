import { useState } from "react";
import Input, { InputGroup } from "../Input/Input";

export const ingredientSchema = {
  preparationNotes: "",
  product: "",
  productSizeModifier: "",
  quantity: "",
  unit: "",
};
export default function Ingredients({ getData }) {
  const [ingredients, setIngredients] = useState([ingredientSchema]);
  const addIngredient = (e) => {
    let newIngredients = ingredients.concat(ingredientSchema);
    setIngredients(newIngredients);
    getData(newIngredients);
  };
  const removeIngredient = (e) => {
    console.log(e.target.id);
    let idx = parseInt(e.target.id.split("-")[2]);
    console.log("Removing ingredient " + idx);
    let newIngredients = ingredients.filter(
      (ingredient, index) => idx !== index
    );
    setIngredients(newIngredients);
    getData(newIngredients);
  };
  const handleIngredientChange = (e, index, inputType) => {
    const newIngredients = ingredients.map((ingredient, idx) => {
      if (index !== idx) {
        return ingredient;
      }
      return { ...ingredient, [inputType]: e.target.value };
    });
    setIngredients(newIngredients);
    getData(newIngredients);
  };
  return (
    <InputGroup legend="Ingredients">
      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={index}>
            <Input
              type="text"
              id={index}
              value={ingredients.product}
              name="product"
              label="product (ingredient name)"
              onChange={(e) => handleIngredientChange(e, index, "product")}
            />
            <Input
              type="text"
              id={index}
              value={ingredients.quantity}
              name="quantity"
              label="ingredient quantity"
              onChange={(e) => handleIngredientChange(e, index, "quantity")}
            />
            <Input
              type="text"
              id={index}
              value={ingredients.unit}
              name="unit"
              label="ingredient unit"
              onChange={(e) => handleIngredientChange(e, index, "unit")}
            />
            <Input
              type="text"
              id={index}
              value={ingredients.preparationNotes}
              name="preparationNotes"
              label="ingredient preparation notes"
              onChange={(e) =>
                handleIngredientChange(e, index, "preparationNotes")
              }
            />
            <button
              type="button"
              id={`ing-remove-${index}`}
              onClick={removeIngredient}
            >
              remove
            </button>
          </li>
        ))}
      </ul>
      <button type="button" onClick={addIngredient}>
        add Ingredient
      </button>
    </InputGroup>
  );
}
