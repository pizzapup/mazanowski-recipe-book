import React, { useState, useEffect } from "react";
import { db, storage } from "./firebase/firebase-config";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
function NewRecipeForm() {
  const [file, setFile] = useState("");
  const [recipeImg, setRecipeImg] = useState("");
  const [recipeName, setRecipeName] = useState("");
  const [recipeCategory, setRecipeCategory] = useState("");
  const [ingredients, setIngredients] = useState([
    {
      name: "",
      amount: "",
      unit: "",
    },
  ]);
  const [instructions, setInstructions] = useState([
    {
      text: "",
    },
  ]);
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
          setRecipeImg(url);
        });
        !file &&
          setRecipeImg(
            "gs://recipe-book-d5784.appspot.com/files/food-img-placeholder.jpg"
          );
      }
    );
  }
  function handleRecipeNameChange(e) {
    setRecipeName(e.target.value);
  }
  function handleRecipeCatChange(e) {
    setRecipeCategory(e.target.value);
  }
  function handleIngredientChange(e) {
    let idx = parseInt(e.target.id.split("-")[2]);
    let inputType = e.target.id.split("-")[1];
    // const newIngredients = ingredients.map((ingredient, index) => {
    //   if (idx !== index) {
    //     return ingredient;
    //   }
    //   return { ...ingredient, [inputType]: e.target.value };
    // });
    // setIngredients(newIngredients);
    if (inputType === "name") {
      const newIngredients = ingredients.map((ingredient, index) => {
        if (idx !== index) {
          return ingredient;
        }
        return { ...ingredient, name: e.target.value };
      });
      setIngredients(newIngredients);
    } else if (inputType === "amt") {
      const newIngredients = ingredients.map((ingredient, index) => {
        if (idx !== index) {
          return ingredient;
        }
        return { ...ingredient, amount: e.target.value };
      });
      setIngredients(newIngredients);
    } else if (inputType === "unit") {
      const newIngredients = ingredients.map((ingredient, index) => {
        if (idx !== index) {
          return ingredient;
        }
        return { ...ingredient, unit: e.target.value };
      });
      setIngredients(newIngredients);
    }
  }

  function handleIngredientRemove(e) {
    console.log(e.target.id);
    let idx = parseInt(e.target.id.split("-")[2]);
    console.log("Removing ingredient " + idx);
    let newIngredients = ingredients.filter(
      (ingredient, index) => idx !== index
    );
    setIngredients(newIngredients);
  }
  function handleIngredientAdd(e) {
    let newIngredients = ingredients.concat({ name: "", amount: "" });
    setIngredients(newIngredients);
  }
  function handleInstructionChange(e) {
    let idx = parseInt(e.target.id.split("-")[1]);
    const newInstructions = instructions.map((instruction, index) => {
      if (idx !== index) {
        return instruction;
      }
      return { ...instruction, text: e.target.value };
    });
    setInstructions(newInstructions);
  }
  function handleInstructionRemove(e) {
    console.log(e.target.id);
    let idx = parseInt(e.target.id.split("-")[2]);
    console.log("Removing instruction " + idx);
    let newinstructions = instructions.filter(
      (instruction, index) => idx !== index
    );
    setInstructions(newinstructions);
  }
  function handleInstructionAdd(e) {
    let newInstructions = instructions.concat({ text: "" });
    setInstructions(newInstructions);
  }

  const submitRecipe = async (e) => {
    e.preventDefault();
    handleUpload();
    const values = {
      name: recipeName,
      category: recipeCategory,
      ingredients: ingredients,
      instructions: instructions,
      img: recipeImg,
    };
    try {
      const docRef = await addDoc(collection(db, "recipes"), values);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  return (
    <>
      <form onSubmit={submitRecipe}>
        <label>
          Recipe Name
          <input
            type="text"
            name="recipe-name"
            value={recipeName}
            onChange={handleRecipeNameChange}
          />
        </label>
        <label>
          Recipe Category
          <input
            type="text"
            name="recipe-category"
            value={recipeCategory}
            onChange={handleRecipeCatChange}
          />
        </label>
        <fieldset>
          <legend>Ingredients</legend>
          {ingredients.map((ing, idx) => {
            return (
              <ul key={idx}>
                <li>
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
                </li>
                <li>
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
                </li>
                <li>
                  <label>
                    Measurement Unit
                    <input
                      type="text"
                      id={"ing-unit-" + idx}
                      name={"ing-unit-" + idx}
                      value={ing.unit}
                      onChange={handleIngredientChange}
                    />
                  </label>
                </li>
                <button
                  id={"ing-remove-" + idx}
                  type="button"
                  onClick={handleIngredientRemove}
                >
                  remove
                </button>
              </ul>
            );
          })}
          <button
            type="button"
            onClick={handleIngredientAdd}
          >
            add another ingredient
          </button>
        </fieldset>

        <fieldset>
          <legend>Instructions</legend>
          {instructions.map((instr, idx) => {
            return (
              <div key={idx}>
                <label>
                  Instruction
                  <input
                    type="text"
                    id={"instr-" + idx}
                    name={"instr-" + idx}
                    value={instr.text}
                    onChange={handleInstructionChange}
                  />
                </label>
                <button
                  id={"instr-remove-" + idx}
                  type="button"
                  onClick={handleInstructionRemove}
                >
                  remove
                </button>
              </div>
            );
          })}

          <button
            type="button"
            onClick={handleInstructionAdd}
          >
            add another instruction
          </button>
        </fieldset>
        <label>
          Upload image (optional)
          <input
            type="file"
            accept="/image/*"
            onChange={handleImageChange}
          />
        </label>
        <button type="submit">Submit Recipe</button>
      </form>
      <div>
        <div></div>
      </div>
    </>
  );
}

export default NewRecipeForm;
