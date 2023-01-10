import { useState } from "react";
import Input, { InputGroup } from "../Input/Input";

export const ingredientSchema = {
  name: "",
  quantity: "",
  unit: "",
};
export default function Ingredients({ getData }) {
  const [inputList, setInputList] = useState([
    { name: "", quantity: "", unit: "" },
  ]);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
    getData(inputList);
  };
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
    getData(inputList);
  };
  const handleAddClick = () => {
    setInputList([...inputList, { name: "", quantity: "", unit: "" }]);
    getData(inputList);
  };

  return (
    <div className="App">
      {inputList.map((x, i) => {
        return (
          <div className="box">
            <input
              name="name"
              placeholder="ingredient"
              value={x.name}
              onChange={(e) => handleInputChange(e, i)}
            />
            <input
              name="quantity"
              placeholder="quantity"
              value={x.quantity}
              onChange={(e) => handleInputChange(e, i)}
            />
            <input
              name="unit"
              placeholder="unit"
              value={x.unit}
              onChange={(e) => handleInputChange(e, i)}
            />
            <div>
              {inputList.length !== 1 && (
                <button onClick={() => handleRemoveClick(i)}>Remove</button>
              )}
              {inputList.length - 1 === i && (
                <button onClick={handleAddClick}>Add</button>
              )}
            </div>
          </div>
        );
      })}
      <div>{JSON.stringify(inputList)}</div>
    </div>
  );
}
// const instructionSchema = ingredientSchema;
// const [instructions, setInstructions] = useState([instructionSchema]);
// const addInstruction = (e) => {
//   let newInstructions = instructions.concat(instructionSchema);
//   setInstructions(newInstructions);
//   getData(newInstructions);
// };
// const removeInstruction = (e) => {
//   console.log(e.target.id);
//   let idx = parseInt(e.target.id.split("-")[2]);
//   console.log("Removing Instruction " + idx);
//   let newInstructions = instructions.filter(
//     (Instruction, index) => idx !== index
//   );
//   setInstructions(newInstructions);
//   getData(newInstructions);
// };
// const handleInstructionChange = (e) => {
//   let index = parseInt(e.target.id.split("-")[2]);
//   const newInstructions = instructions.map((Instruction, idx) => {
//     if (index !== idx) {
//       return Instruction;
//     }
//     return { ...Instruction, [e.target.name]: e.target.value };
//   });
//   setInstructions(newInstructions);
//   getData(newInstructions);
//   for (let i in instructions) {
//     console.log(i);
//   }
// };

// return (
//   <InputGroup legend="instructions">
//     <ul>
//       {instructions.map((instruction, idx) => (
//         <li key={idx}>
//           <Input
//             type="text"
//             id={`instr-text-${idx}`}
//             value={instructions.product}
//             name="product"
//             label="product (Instruction name)"
//             onChange={handleInstructionChange}
//           />
//           <button
//             type="button"
//             id={`instr-remove-${idx}`}
//             onClick={removeInstruction}
//           >
//             remove
//           </button>
//         </li>
//       ))}
//     </ul>
//     <button type="button" onClick={addInstruction}>
//       add Instruction
//     </button>
//   </InputGroup>
// );
// }

// import { useState } from "react";
// import Input, { InputGroup } from "../Input/Input";

// export const ingredientSchema = {
//   preparationNotes: "",
//   product: "",
//   productSizeModifier: "",
//   quantity: "",
//   unit: "",
// };
// export default function Ingredients({ getData }) {
//   const [ingredients, setIngredients] = useState([ingredientSchema]);
//   const addIngredient = (e) => {
//     let newIngredients = ingredients.concat(ingredientSchema);
//     setIngredients(newIngredients);
//     getData(newIngredients);
//   };
//   const removeIngredient = (e) => {
//     console.log(e.target.id);
//     let idx = parseInt(e.target.id.split("-")[2]);
//     console.log("Removing ingredient " + idx);
//     let newIngredients = ingredients.filter(
//       (ingredient, index) => idx !== index
//     );
//     setIngredients(newIngredients);
//     getData(newIngredients);
//   };
//   const handleIngredientChange = (e, index, inputType) => {
//     const newIngredients = ingredients.map((ingredient, idx) => {
//       if (index !== idx) {
//         return ingredient;
//       }
//       return { ...ingredient, [inputType]: e.target.value };
//     });
//     setIngredients(newIngredients);
//     getData(newIngredients);
//   };
//   return (
//     <InputGroup legend="Ingredients">
//       <ul>
//         {ingredients.map((ingredient, index) => (
//           <li key={index}>
//             <Input
//               type="text"
//               id={index}
//               value={ingredients.product}
//               name="product"
//               label="product (ingredient name)"
//               onChange={(e) => handleIngredientChange(e, index, "product")}
//             />
//             <Input
//               type="text"
//               id={index}
//               value={ingredients.quantity}
//               name="quantity"
//               label="ingredient quantity"
//               onChange={(e) => handleIngredientChange(e, index, "quantity")}
//             />
//             <Input
//               type="text"
//               id={index}
//               value={ingredients.unit}
//               name="unit"
//               label="ingredient unit"
//               onChange={(e) => handleIngredientChange(e, index, "unit")}
//             />
//             <Input
//               type="text"
//               id={index}
//               value={ingredients.preparationNotes}
//               name="preparationNotes"
//               label="ingredient preparation notes"
//               onChange={(e) =>
//                 handleIngredientChange(e, index, "preparationNotes")
//               }
//             />
//             <button
//               type="button"
//               id={`ing-remove-${index}`}
//               onClick={removeIngredient}
//             >
//               remove
//             </button>
//           </li>
//         ))}
//       </ul>
//       <button type="button" onClick={addIngredient}>
//         add Ingredient
//       </button>
//     </InputGroup>
//   );
// }
