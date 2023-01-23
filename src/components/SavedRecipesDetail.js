import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase/firebase-config";
import { onValue, ref, remove } from "firebase/database";

const SavedRecipesDetail = () => {
  const { id } = useParams();
  const dbRef = ref(db, `posts/`);
  const [ingredientsArray, setIngredientsArray] = useState();
  const [isReady, setIsReady] = useState(false);
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState();

  function checkInt(number) {
    const qty = { 0.25: "1/4", 0.5: "1/2", 0.75: "3/4" };
    return number === Math.floor(number) ? number : qty[number];
  }

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
      const resList = [];
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
  function ParseIngredient({ ing }) {
    const qtys = { 0.25: "1/4", 0.5: "1/2", 0.75: "3/4" };
    return (
      <li className="ing-item">
        <span className="ing-qty">
          {Math.floor(ing.quantity) ? ing.quantity : qtys[ing.quantity]}
        </span>
        <span className="ing-unit"> {ing.unit} </span>
        <span className="ing-product">{ing.product} </span>
      </li>
    );
  }
  return (
    <>
      {isReady && (
        <div id={recipe.id} className="product">
          <div>
            <h3>{recipe.name}</h3>
            <img alt="" src={recipe.image} />
            <ul>
              <li>
                Ingredients:
                <ul>
                  {ingredientsArray &&
                    ingredientsArray.map((i, idx) => (
                      <ParseIngredient ing={i} key={`${i}-${idx}`} />
                    ))}
                </ul>
              </li>
              <li>instructions: {recipe.instructions}</li>
              <li>preheat: {recipe.preheat}</li>
              <li>category: {recipe.category && recipe.category.title}</li>
              <li title={`recipe id: ${recipe.id}`}>
                recipe uploaded by: {recipe.username}
              </li>
            </ul>
          </div>
          {/* <button type="button">update</button>
          <button type="button" onClick={deleteRecipe}>
            delete
          </button> */}
        </div>
      )}
      <button onClick={() => navigate("/collections")}>GO BACK</button>
    </>
  );
};
export default SavedRecipesDetail;
