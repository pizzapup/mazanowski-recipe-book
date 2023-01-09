import { useState } from "react";
import NewRecipeForm from "./components/CreateRecipe/NewRecipeForm";
import "./styles.css";
export default function App() {
  return (
    <>
      App <NewRecipeForm />
    </>
  );
}
// function App() {
//   const initialValues = {
//     category: "",
//     title: "",
//     ingredients: [{ amount: "", unit: "", ingredient: "" }],
//     instructions: [],
//   };
//   const [values, setValues] = useState(initialValues);
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setValues({ ...values, [name]: value });
//   };
//   return (
//     <>
//       <div>
//         <form>
//           <label>
//             category
//             <input
//               type="text"
//               name="category"
//               value={values.category}
//             />
//           </label>
//           <label>
//             title
//             <input
//               type="text"
//               name="title"
//               value={values.title}
//             />
//           </label>
//           <div>
//             INGREDIENTS:{" "}
//             <div>
//               {" "}
//               {values.ingredients && values.ingredients.length > 0 ? (
//                 values.ingredients.map((friend, index) => (
//                   <label key={index}>
//                     <input name={`ingredients.${index}`} />
//                     <button
//                       type="button"
//                       onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
//                     >
//                       -
//                     </button>
//                     <button
//                       type="button"
//                       onClick={() => arrayHelpers.insert(index, "")} // insert an empty string at a position
//                     >
//                       +
//                     </button>
//                   </label>
//                 ))
//               ) : (
//                 <button
//                   type="button"
//                   onClick={() => arrayHelpers.push("")}
//                 >
//                   {/* show this when user has removed all ingredients from the list */}
//                   Add a friend
//                 </button>
//               )}
//             </div>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// }

// export default App;
