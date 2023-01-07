import "./styles.css";
import { db } from "./firebase/firebase-config";
import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";

const Todo = () => {
  const [recipe, setRecipe] = useState("");
  const [recipeList, setRecipeList] = useState([]);
  const initialValues = {
    title: "cornbread",
    servings: 2,
    time: { hour: 1, min: 30 },
    ingredients: [
      { name: "corn", amount: "1 cob" },
      { name: "bread", amount: "1 loaf" },
    ],
    instructions: [
      { instruction: "add to bowl" },
      { instruction: "preheat oven" },
    ],
  };
  const [values, setValues] = useState(initialValues);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const addRecipe = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "recipes"), values);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const fetchRecipeList = async () => {
    await getDocs(collection(db, "recipes")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setRecipeList(newData);
      console.log(recipeList, newData, "test");
    });
  };
  useEffect(() => {
    fetchRecipeList();
  }, []);

  return (
    <section>
      <div>
        <div>
          <div>
            <input
              type="text"
              name="title"
              value={values.title}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="time"
              value={values.time}
              onChange={handleInputChange}
            />
          </div>

          <button
            type="submit"
            onClick={addRecipe}
          >
            Submit
          </button>
        </div>

        <ul>
          {recipeList?.map((recipe, i) => (
            <li key={i}>{recipe.title}</li>
          ))}
        </ul>
      </div>
    </section>
  );
};
