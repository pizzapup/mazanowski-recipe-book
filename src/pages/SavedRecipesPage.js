import React, { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard/RecipeCard";
import { Outlet } from "react-router-dom";
import { CardGrid } from "../components/CardGrid";
import { onValue, ref } from "firebase/database";
import { db } from "../firebase/firebase-config";
// import { dummyData } from "../data/dummyData";
const SavedRecipesPage = () => {
  const [recipeDbList, setRecipeDbList] = useState();

  useEffect(() => {
    const dbRef = ref(db, `posts/`);
    onValue(dbRef, (snapshot) => {
      const res = snapshot.val();
      const resList = [];
      for (let id in res) {
        resList.push({ id, ...res[id] });
        console.log("test1", { id, ...res[id] });
      }
      setRecipeDbList(resList);
      console.log("test2", resList);
    });
  }, []);

  // console.log("dummy", dummyData, "test", recipeDbList);
  return (
    <div>
      <h2 className="text-center">Your Saved Recipes</h2>
      <CardGrid>
        {/* {dummyData.map((data) => {
          return <RecipeCard data={data} />;
        })} */}
        {recipeDbList &&
          recipeDbList.map((data) => {
            return <RecipeCard data={data} />;
          })}
      </CardGrid>

      <Outlet />
    </div>
  );
};

export default SavedRecipesPage;
