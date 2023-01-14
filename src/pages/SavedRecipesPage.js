import {
  Container,
  Col,
  Row,
  Card,
  CardBody,
  CardTitle,
  Button,
} from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import SavedRecipesListCard from "../components/SavedRecipesListCard";
import { Outlet } from "react-router-dom";
import { CardGrid } from "../components/CardGrid";
import { onValue, ref } from "firebase/database";
import { db } from "../firebase/firebase-config";
const SavedRecipesPage = () => {
  const navigate = useNavigate();
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

  //Dummy Data, placeholder for fetching data from backend:
  const dummyData = [
    {
      id: 644387,
      name: "Garlicky Kale",
      image: "https://spoonacular.com/recipeImages/644387-312x231.jpg",
      imageType: "jpg",
      category: { title: "appetizers and dips" },
      isFb: 0,
    },
    {
      id: 716627,
      name: "Easy Homemade Rice and Beans",
      image: "https://spoonacular.com/recipeImages/716627-312x231.jpg",
      imageType: "jpg",
      category: { title: "appetizers and dips" },
      isFb: 0,
    },
    {
      id: 782600,
      name: "Quinoa Salad with Vegetables and Cashews",
      image: "https://spoonacular.com/recipeImages/782600-312x231.jpg",
      imageType: "jpg",
      category: { title: "appetizers and dips" },
      isFb: 0,
    },
    {
      id: 782600,
      name: "Quinoa Salad with Vegetables and Cashews",
      image: "https://spoonacular.com/recipeImages/782600-312x231.jpg",
      imageType: "jpg",
      postKey: "yes",
      category: { title: "appetizers and dips" },
      instructions: "instructions here",
      notes: "notese",
      preheat: "350",
      isFb: 0,
      ingredients: [
        {
          confidence: "",
          ingredientParsed: {
            product: "ingredient name",
            quantity: 1,
            unit: "pound",
          },
        },
      ],
    },
  ];
  console.log("dummy", dummyData, "test", recipeDbList);
  return (
    <Container>
      <h2 className="text-center">Your Saved Recipes</h2>
      <CardGrid>
        {dummyData.map((data) => {
          return <SavedRecipesListCard data={data} />;
        })}
        {recipeDbList &&
          recipeDbList.map((data) => {
            return <SavedRecipesListCard data={data} />;
          })}
        {/* {recipeDbList.map((data, idx) => {
          return (
            <SavedRecipesListCard
              data={data}
              postKey={data.id}
             
              idx={idx}
            />
          );
        })} */}
      </CardGrid>
      <h2 className="text-center">Your Collections</h2>

      <CardGrid>
        <Card
          className="p-3 my-2 text-center"
          style={{
            maxWidth: "18rem",
            backgroundColor: "#123B1F",
            border: "none",
            fontFamily: "Vibur, cursive",
          }}
        >
          <CardBody>
            <CardTitle tag="h4" className="text-white">
              Thanksgiving 2022
            </CardTitle>
          </CardBody>
          <Button
            onClick={() => {
              navigate("/collections/detail");
            }}
            className="btn btn-light"
          >
            View My Collection
          </Button>
        </Card>
      </CardGrid>

      <Outlet />
    </Container>
  );
};

export default SavedRecipesPage;
