import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase/firebase-config";
import { onValue, ref, remove } from "firebase/database";

import RecipeDetail from "./RecipeDetail/RecipeDetail";

const SavedRecipesDetail = () => {
  const { id } = useParams();
  const dbRef = ref(db, `posts/`);
  const [ingredientsArray, setIngredientsArray] = useState();
  const [isReady, setIsReady] = useState(false);
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState();

  function getIngs(ings) {
    const ingList = [];
    for (let ing in ings) {
      ingList.push(ings[ing].ingredientParsed);
    }
    setIngredientsArray(ingList);
    return ingList;
  }

  useEffect(() => {
    const dbRef = ref(db, `posts/${id}`);
    onValue(dbRef, (snapshot) => {
      const res = snapshot.val();
      for (let id in res) {
        id === "ingredients" && getIngs(res[id]);
      }
      setRecipe(res);
      setIsReady(true);
    });
  }, []);

  const deleteRecipe = () => {
    const dbRef = ref(db, `posts/${id}`);
    remove(dbRef);
    navigate("/collections");
  };

  return (
    <>
      {isReady && (
        <RecipeDetail recipe={recipe} ingredientsArray={ingredientsArray} />
      )}
      <button onClick={() => navigate("/collections")}>GO BACK</button>
    </>
  );
};
export default SavedRecipesDetail;
