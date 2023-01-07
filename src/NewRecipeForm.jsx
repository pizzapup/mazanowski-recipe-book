import React, { useState, useEffect } from "react";
import { db } from "./firebase/firebase-config";
import { collection, addDoc, getDocs } from "firebase/firestore";

function NewRecipeForm() {
  /* defining our state variables */

  const [recipeName, setRecipeName] = useState("");
  const [ingredients, setIngredients] = useState([
    {
      name: "",
      amount: "",
    },
  ]);
  const [instructions, setInstructions] = useState([
    {
      text: "",
    },
  ]);
  const initialValues = {
    title: recipeName,
    ingredients: ingredients,
    instructions: instructions,
  };
  const [values, setValues] = useState(initialValues);
  // event handlers
  function handleRecipeNameChange(event) {
    let newName = event.target.value;
    setRecipeName(newName);
  }
  function handleRecipeInstructionChange(event) {
    let instruction = event.target.value;
    setInstructions(instruction);
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  /*
   * For the ingredients and instructions, we want the event handlers to generate new arrays,
   * NOT modify the existing ones
   */
  function handleIngredientChange(event) {
    //grab the index and the input type
    let idx = parseInt(event.target.id.split("-")[2]);
    let inputType = event.target.id.split("-")[1];

    if (inputType === "name") {
      // we only want to modify one element, easiest way to do this is to use map to generate a new array
      // the new array will be the same with the one element modified as needed
      const newIngredients = ingredients.map((ingredient, index) => {
        // check if we are at the index that we want
        if (idx !== index) {
          // if it's not the element we want to change we just return the element
          return ingredient;
        }
        // if we have the element that needs to be modified, we return the modified element
        // using object destructuring we just return the original object, with the name field modified
        return { ...ingredient, name: event.target.value };
      });

      // be sure to actually update the React state variable so it re-renders
      setIngredients(newIngredients);
    } else if (inputType === "amt") {
      const newIngredients = ingredients.map((ingredient, index) => {
        if (idx !== index) {
          return ingredient;
        }
        return { ...ingredient, amount: event.target.value };
      });
      setIngredients(newIngredients);
    }
  }

  function handleIngredientRemove(event) {
    /*
     * To remove an element, we just use the array.filter function to genereate a new array without the
     * element being deleted
     */
    console.log(event.target.id);
    let idx = parseInt(event.target.id.split("-")[2]);
    console.log("Removing ingredient " + idx);
    let newIngredients = ingredients.filter(
      (ingredient, index) => idx !== index
    );
    setIngredients(newIngredients);
  }

  function handleIngredientAdd(event) {
    /*
     * Same concept as the above methods, concat returns a new array. In this case we get a new array with an
     * element containing an empty string in both fields at the end of it
     */
    let newIngredients = ingredients.concat({ name: "", amount: "" });
    setIngredients(newIngredients);
  }

  //   /*
  //    * Instruction functions are mostly the same as the ingredient functions
  //    * Only changes here are the object property names
  //    */
  //   function handleInstructionChange(event) {
  //     let idx = parseInt(event.target.id.split("-")[1]);

  //     const newInstructions = instructions.map((instruction, index) => {
  //       if (idx !== index) {
  //         return instruction;
  //       }
  //       return { ...instruction, text: event.target.value };
  //     });

  //     setInstructions(newInstructions);
  //   }

  //   function handleInstructionRemove(event) {
  //     console.log(event.target.id);
  //     let idx = parseInt(event.target.id.split("-")[2]);
  //     console.log("Removing instruction " + idx);
  //     let newinstructions = instructions.filter(
  //       (instruction, index) => idx !== index
  //     );
  //     setInstructions(newinstructions);
  //   }

  //   function handleInstructionAdd(event) {
  //     let newInstructions = instructions.concat({ text: "" });
  //     setInstructions(newInstructions);
  //   }
  //   /*
  //    * End of Instruction Functions
  //    */

  /*
   * When the form is submitted, we want to make a POST call to our API to add the recipe
   * to our Database
   */
  //   function handleSubmit(event) {
  //     // prevent the default form submit action
  //     event.preventDefault();
  //   }
  const addRecipe = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "recipes"), values);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  return (
    <>
      <form onSubmit={addRecipe}>
        <label>
          Recipe Name
          <input
            type="text"
            name="recipe-name"
            value={values.name}
            onChange={handleRecipeNameChange}
          />
        </label>

        {ingredients.map((ing, idx) => {
          return (
            <div key={idx}>
              <label>
                Ingredient Name
                <input
                  type="text"
                  id={"ing-name-" + idx}
                  name={"ing-name-" + idx}
                  value={ing.name}
                  onChange={handleIngredientChange}
                />
              </label>
              <label>
                Ingredient Amount
                <input
                  type="text"
                  id={"ing-amt-" + idx}
                  name={"ing-amt-" + idx}
                  value={ing.amount}
                  onChange={handleIngredientChange}
                />
              </label>
              <button
                id={"ing-remove-" + idx}
                color="secondary"
                type="button"
                onClick={handleIngredientRemove}
              >
                remove ingredient
              </button>
            </div>
          );
        })}

        <button
          color="primary"
          type="button"
          onClick={handleIngredientAdd}
        >
          add ingredient
        </button>
        <label>
          Instructions:
          <textarea
            name="instructions"
            values={values.instructions}
            onChange={handleRecipeInstructionChange}
          />
        </label>
        {/* {instructions.map((instr, idx) => {
          return (
            <div key={idx}>
              <label>
                Instructions
                <input
                  type="text"
                  id={"instr-" + idx}
                  name={"instr-" + idx}
                  multiline
                  value={instr.text}
                  onChange={handleInstructionChange}
                />
              </label>
              <button
                id={"instr-remove-" + idx}
                color="secondary"
                type="button"
                onClick={handleInstructionRemove}
              >
                remove instruction
              </button>
            </div>
          );
        })}

        <button
          color="primary"
          type="button"
          onClick={handleInstructionAdd}
        >
          add instruction
        </button> */}

        <button type="submit">Submit Recipe</button>
      </form>
    </>
  );
}

export default NewRecipeForm;
