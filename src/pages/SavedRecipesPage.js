import React, { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard/RecipeCard";
import { Outlet } from "react-router-dom";
import { CardGrid } from "../components/CardGrid";
import { onValue, ref } from "firebase/database";
import { auth, db } from "../firebase/firebase-config";
import { Hero, HeroLoggedOut } from "../components/Hero/Hero";
// import { dummyData } from "../data/dummyData";
const SavedRecipesPage = () => {
  const [recipeDbList, setRecipeDbList] = useState();
  const user = auth.currentUser;
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

  return (
    <div className="gallery-page">
      <div className="gallery-page-heading">
        <h2>Uploaded Recipes</h2>
        <p>
          note: search and filtering options will be added once more recipes are
          uploaded
        </p>
      </div>
      <CardGrid>
        {/* {dummyData.map((data) => {
          return <RecipeCard data={data} />;
        })} */}
        {user !== null ? (
          recipeDbList &&
          recipeDbList.map((data, idx) => {
            return <RecipeCard data={data} key={`key-${idx}`} />;
          })
        ) : (
          <HeroLoggedOut page={<h3>Login to view recipes</h3>} />
        )}
      </CardGrid>

      <Outlet />
    </div>
  );
};

export default SavedRecipesPage;
