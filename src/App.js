import "./styles.css";
import { db } from "./firebase/firebase-config";
import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";

const Todo = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [recipe, setRecipe] = useState("");
  const [recipeList, setRecipeList] = useState("");
  const addRecipe = async () => {
    try {
      const docRef = await addDoc(collection(db, "recipes"), {
        title: "cornbread",
        ingredients: [{ name: "corn" }, { name: "bread" }],
        instructions: [
          { instruction: "add to bowl" },
          { instruction: "preheat oven" },
        ],
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  const addAda = async () => {
    try {
      const docRef = await addDoc(collection(db, "users"), {
        first: "Ada",
        last: "Lovelace",
        born: 1815,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  // const addTodo = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const docRef = await addDoc(collection(db, "todos"), {
  //       todo: todo,
  //     });
  //     console.log("Document written with ID: ", docRef.id);
  //   } catch (e) {
  //     console.error("Error adding document: ", e);
  //   }
  // };

  // const fetchPost = async () => {
  //   await getDocs(collection(db, "users")).then((querySnapshot) => {
  //     const newData = querySnapshot.docs.map((doc) => ({
  //       ...doc.data(),
  //       id: doc.id,
  //     }));
  //     setTodos(newData);
  //     console.log(todos, newData, "test");
  //   });
  //   // querySnapshot.forEach((doc) => {
  //   //   console.log(`${doc.id} => ${doc.data()}`);
  //   //   console.table(doc.data());
  //   // });
  //   // await getDocs(collection(db, "todos")).then((querySnapshot) => {
  //   //   const newData = querySnapshot.docs.map((doc) => ({
  //   //     ...doc.data(),
  //   //     id: doc.id,
  //   //   }));
  //   //   setTodos(newData);
  //   //   console.log(todos, newData);
  //   // });
  // };
  const fetchRecipeList = async () => {
    await getDocs(collection(db, "recipes")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setRecipeList(newData);
      console.log(recipeList, newData, "test");
    });
    // querySnapshot.forEach((doc) => {
    //   console.log(`${doc.id} => ${doc.data()}`);
    //   console.table(doc.data());
    // });
    // await getDocs(collection(db, "todos")).then((querySnapshot) => {
    //   const newData = querySnapshot.docs.map((doc) => ({
    //     ...doc.data(),
    //     id: doc.id,
    //   }));
    //   setTodos(newData);
    //   console.log(todos, newData);
    // });
  };
  useEffect(() => {
    fetchPost();
    fetchRecipeList();
  }, []);

  return (
    <section>
      <div>
        <div>
          <div>
            <input
              type="text"
              onChange={(e) => setTodo(e.target.value)}
            />
          </div>

          <button
            type="submit"
            onClick={addAda}
          >
            Submit
          </button>
        </div>

        <div>
          {recipeList?.map((recipe, i) => (
            <p key={i}>{recipe.recipe}</p>
          ))}
        </div>
      </div>
    </section>
  );
};

function App() {
  return (
    <>
      <Todo />
    </>
  );
}

export default App;
