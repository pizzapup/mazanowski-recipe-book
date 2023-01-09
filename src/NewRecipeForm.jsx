// import React, { useState, useEffect } from "react";
// import { db, storage } from "./firebase/firebase-config";
// import { collection, addDoc, getDocs } from "firebase/firestore";
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import axios from "axios";
// import Ingredients from "./ZestfulApi";
// import Input from "./Input";
// import { NewRecipe } from "./UploadImg";

// function NewRecipeForm() {
//   const [file, setFile] = useState("");
//   const [recipeImg, setRecipeImg] = useState("");
//   const [name, setName] = useState("");
//   const [recipeCategory, setRecipeCategory] = useState("");
//   const [zestyIng, setZestyIng] = useState();
//   const [values, setValues] = useState({});
//   const [ingredients, setIngredients] = useState([
//     {
//       preparationNotes: "",
//       product: "",
//       productSizeModifier: "",
//       quantity: "",
//       unit: "",
//     },
//   ]);

//   const [instructions, setInstructions] = useState([
//     {
//       text: "",
//     },
//   ]);
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setValues({ ...values, [name]: value });
//   };
//   function handlenameChange(e) {
//     setName(e.target.value);
//   }
//   function handleRecipeCatChange(e) {
//     setRecipeCategory(e.target.value);
//   }

//   function handleImageChange(e) {
//     setFile(e.target.files[0]);
//   }
//   function handleUpload() {
//     const storageRef = ref(storage, `/recipe-imgs/${file.name}`);
//     const uploadTask = uploadBytesResumable(storageRef, file);
//     uploadTask.on(
//       "state_changed",
//       (snapshot) => {},
//       (err) => console.log(err),
//       () => {
//         getDownloadURL(uploadTask.snapshot.ref).then((url) => {
//           console.log(url);
//           setRecipeImg(url);
//         });
//         !file &&
//           setRecipeImg(
//             "gs://recipe-book-d5784.appspot.com/files/food-img-placeholder.jpg"
//           );
//       }
//     );
//   }

//   function handleIngredientChange(e) {
//     let idx = parseInt(e.target.id.split("-")[2]);
//     let inputType = e.target.id.split("-")[1];
//     if (inputType === "name") {
//       const newIngredients = ingredients.map((ingredient, index) => {
//         if (idx !== index) {
//           return ingredient;
//         }
//         return { ...ingredient, name: e.target.value };
//       });
//       setIngredients(newIngredients);
//     } else if (inputType === "amt") {
//       const newIngredients = ingredients.map((ingredient, index) => {
//         if (idx !== index) {
//           return ingredient;
//         }
//         return { ...ingredient, amount: e.target.value };
//       });
//       setIngredients(newIngredients);
//     } else if (inputType === "preparation") {
//       const newIngredients = ingredients.map((ingredient, index) => {
//         if (idx !== index) {
//           return ingredient;
//         }
//         return { ...ingredient, preparation: e.target.value };
//       });
//       setIngredients(newIngredients);
//     }
//   }

//   function handleIngredientRemove(e) {
//     console.log(e.target.id);
//     let idx = parseInt(e.target.id.split("-")[2]);
//     console.log("Removing ingredient " + idx);
//     let newIngredients = ingredients.filter(
//       (ingredient, index) => idx !== index
//     );
//     setIngredients(newIngredients);
//   }
//   function handleIngredientAdd(e) {
//     let newIngredients = ingredients.concat({ name: "", amount: "" });
//     setIngredients(newIngredients);
//   }
//   function handleInstructionChange(e) {
//     let idx = parseInt(e.target.id.split("-")[1]);
//     const newInstructions = instructions.map((instruction, index) => {
//       if (idx !== index) {
//         return instruction;
//       }
//       return { ...instruction, text: e.target.value };
//     });
//     setInstructions(newInstructions);
//   }
//   function handleInstructionRemove(e) {
//     console.log(e.target.id);
//     let idx = parseInt(e.target.id.split("-")[2]);
//     console.log("Removing instruction " + idx);
//     let newinstructions = instructions.filter(
//       (instruction, index) => idx !== index
//     );
//     setInstructions(newinstructions);
//   }
//   function handleInstructionAdd(e) {
//     let newInstructions = instructions.concat({ text: "" });
//     setInstructions(newInstructions);
//   }
//   const getZesty = (ings) => {
//     setZestyIng(ings);
//   };
//   const submitRecipe = async (e) => {
//     e.preventDefault();
//     handleUpload();
//     const values = {
//       name: name,
//       category: recipeCategory,
//       ingredients: ingredients,
//       instructions: instructions,
//       img: recipeImg,
//       zesty: zestyIng,
//     };
//     try {
//       const docRef = await addDoc(collection(db, "recipes"), values);
//       console.log("Document written with ID: ", docRef.id);
//     } catch (e) {
//       console.error("Error adding document: ", e);
//     }
//   };
//   return (
//     <>
//       <NewRecipe />
//       {/* <form onSubmit={submitRecipe}>
//         <Ingredients getZesty={getZesty} />
//         <Input type="text" name="recipe-name" value={name} />
//         <label>
//           Recipe Name
//           <input
//             type="text"
//             name="recipe-name"
//             value={name}
//             onChange={handlenameChange}
//           />
//         </label>
//         <label>
//           Recipe Category
//           <input
//             type="text"
//             name="recipe-category"
//             value={recipeCategory}
//             onChange={handleRecipeCatChange}
//           />
//         </label>
//         <fieldset className="fieldset-ingredients">
//           <legend>Ingredients</legend>
//           <ul>
//             <li className="ing">
//               <div>Ingredient Name</div>
//               <div>Amount</div>
//               <div>Measurement Unit</div>
//             </li>
//             {ingredients.map((ing, idx) => {
//               return (
//                 <li key={idx}>
//                   <div>(o)</div>
//                   <label className="ing-name">
//                     <span className="sr-only">Ingredient Name</span>
//                     <input
//                       type="text"
//                       id={"ing-name-" + idx}
//                       name={"ing-name-" + idx}
//                       value={ing.name}
//                       onChange={handleIngredientChange}
//                     />
//                   </label>
//                   <label className="ing-amt">
//                     <span className="sr-only">Ingredient Amount</span>
//                     <input
//                       type="text"
//                       id={"ing-amt-" + idx}
//                       name={"ing-amt-" + idx}
//                       value={ing.amount}
//                       onChange={handleIngredientChange}
//                     />
//                   </label>
//                   <label className="ing-unit">
//                     <span className="sr-only">Measurement Unit</span>
//                     <input
//                       type="text"
//                       id={"ing-unit-" + idx}
//                       name={"ing-unit-" + idx}
//                       value={ing.unit}
//                       onChange={handleIngredientChange}
//                     />
//                   </label>{" "}
//                   <label className="ing-prep">
//                     <span className="sr-only">Preparation</span>
//                     <input
//                       type="text"
//                       id={"ing-prep-" + idx}
//                       name={"ing-prep-" + idx}
//                       value={ing.prep}
//                       onChange={handleIngredientChange}
//                     />
//                   </label>
//                   <button
//                     id={"ing-remove-" + idx}
//                     type="button"
//                     onClick={handleIngredientRemove}
//                   >
//                     remove
//                   </button>
//                 </li>
//               );
//             })}
//           </ul>
//           <button type="button" onClick={handleIngredientAdd}>
//             add another ingredient
//           </button>
//         </fieldset>

//         <fieldset>
//           <legend>Instructions</legend>
//           {instructions.map((instr, idx) => {
//             return (
//               <div key={idx}>
//                 <label>
//                   Instruction
//                   <input
//                     type="text"
//                     id={"instr-" + idx}
//                     name={"instr-" + idx}
//                     value={instr.text}
//                     onChange={handleInstructionChange}
//                   />
//                 </label>
//                 <button
//                   id={"instr-remove-" + idx}
//                   type="button"
//                   onClick={handleInstructionRemove}
//                 >
//                   remove
//                 </button>
//               </div>
//             );
//           })}

//           <button type="button" onClick={handleInstructionAdd}>
//             add another instruction
//           </button>
//         </fieldset>
//         <label>
//           Upload image (optional)
//           <input type="file" accept="/image/*" onChange={handleImageChange} />
//         </label>
//         <button type="submit">Submit Recipe</button>
//       </form>
//       <div>
//         <div></div>
//       </div> */}
//     </>
//   );
// }

// export default NewRecipeForm;
