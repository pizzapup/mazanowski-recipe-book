import axios from "axios";
import { onValue } from "firebase/database";
import { ref } from "firebase/storage";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase/firebase-config";
// import {
//   RecipeContainer,
//   RecipeIngredients,
//   RecipeOverviewContainer,
//   RecipePageHeader,
// } from "./styles";

export default function Product() {
  const params = useParams();
  const [recipe, setRecipe] = useState({});

  const [isLoading, setIsLoading] = useState(true);

  function getRecipeDetails() {
    if (!params.id) return;
    setIsLoading(true);
    // const response = await axios.get(
    const dbRef = ref(db, `posts/${params.id}`);
    onValue(dbRef, (snapshot) => {
      const response = snapshot.val();
      const recipeData = [];
      for (let id in response) {
        recipeData.push({ id, ...recipeData[id] });
      }
      setRecipe(recipeData);
      console.log(recipeData);
      setIsLoading(false);
    });

    // `https://api.spoonacular.com/recipes/${params.id}/information`,
    // { params: { apiKey: import.meta.env.VITE_API_KEY } }
    // );
    // setRecipe(response.data);
  }

  useEffect(() => {
    getRecipeDetails();
  }, []);

  return (
    <>{isLoading ? <>loading...</> : <>{recipe.name}</>}</>
    // <RecipeContainer>
    //   {isLoading ? (
    //     <h2>Carregando...</h2>
    //   ) : (
    //     <>
    //       <RecipePageHeader title={recipe.name} />
    //       <RecipeOverviewContainer>
    //         {/* <img src={recipe.image} alt={recipe.name} /> */}
    //         <div>
    //           <p>
    //             <strong>Prep:</strong> {recipe.readyInMinutes} mins
    //           </p>
    //           <p>
    //             <strong>Servings:</strong> {recipe.servings}
    //           </p>
    //           {recipe.cuisines.length > 0 && (
    //             <p>
    //               <strong>Cuisine:</strong> {recipe.cuisines.join(", ")}
    //             </p>
    //           )}
    //         </div>
    //       </RecipeOverviewContainer>
    //       <h3>Ingredients</h3>
    //       <RecipeIngredients>
    //         {recipe.extendedIngredients.map((item) => {
    //           return (
    //             <li key={`${item.id}-${item.originalName}`}>
    //               <strong>{`${item.measures.us.amount} ${item.measures.us.unitShort} | `}</strong>
    //               {item.originalName}
    //             </li>
    //           );
    //         })}
    //       </RecipeIngredients>
    //       {recipe.instructions && (
    //         <>
    //           <h3>Instructions</h3>
    //           <h4 dangerouslySetInnerHTML={{ __html: recipe.instructions }} />
    //         </>
    //       )}
    //     </>
    //   )}
    // </RecipeContainer>
  );
}
// import { db } from "../../firebase/firebase-config";
// import { ref, update, remove } from "firebase/database";
// import { useParams } from "react-router-dom";

// export default function Product({ data, backToGallery }) {
//   const { postKey } = useParams();
//   const postRef = ref(db, `/posts/${postKey}`);
//   const deletePost = () => {
//     return remove(postRef);
//   };

//   const updatePost = (data) => {
//     const updates = {};
//     updates["/posts/" + postKey] = data;
//     return update(ref(db), updates);
//   };

//   function checkInt(number) {
//     const qty = { 0.25: "1/4", 0.5: "1/2", 0.75: "3/4" };
//     return number === Math.floor(number) ? number : qty[number];
//   }
//   function parseIngredient(ing) {
//     const infoList = [];
//     for (let info in ing) {
//       console.log(info);
//       info === "ingredientParsed" && infoList.push({ ...ing.ingredientParsed });
//     }
//     console.log(infoList);
//     return (
//       <ul>
//         {infoList.map((info, idx) => (
//           <li key={idx}>
//             {checkInt(info.quantity)} {info.unit} {info.product}
//           </li>
//         ))}
//       </ul>
//     );
//   }
//   return (
//     <>
//       <div id={data.id} className="card">
//         <div>
//           <h3>{data.name}</h3>
//           <ul>
//             <li className="ingredients">
//               <ul>
//                 {data.ingredients.map((ingredient, idx) => (
//                   <li key={idx}>{parseIngredient(ingredient)}</li>
//                 ))}
//               </ul>
//             </li>
//             <li>instructions: {data.instructions}</li>
//             <li>preheat: {data.preheat}</li>
//             <li>category: {data.category.title}</li>

//             <li title={`recipe id: ${data.id}`}>
//               recipe uploaded by: {data.username}
//             </li>
//           </ul>
//         </div>
//         <button onClick={backToGallery}>back</button>
//       </div>
//     </>
//   );
// }
