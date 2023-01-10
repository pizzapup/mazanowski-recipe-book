import React, { useEffect, useState } from "react";
import axios from "axios";
import Input, { InputGroup } from "../Input/Input";
import Ingredients from "./Ingredients";
import { writeData } from "../../firebase/dbHelpers";
import { parse } from "recipe-ingredient-parser-v3";

const instructions =
  "Add ingredients in bulk. Separate each ingredient by commas. You can add additional info such as quantity, unit of measurement (cups, oz, box), and preparation (diced, sliced, whole) to each entry. Example: 2lbs flour, 2tsp vanilla extract, 3 cups water, 2 cloves garlic minced";

export default function ZestIngredients({ getData, getPostKey, postKey }) {
  const [userInput, setUserInput] = useState("");
  const [ingData, setIngData] = useState([]);
  const [zestful, setZestful] = useState([]);
  const userIngredients = [];
  function parseUserInput() {
    if (userInput.includes(",") == true) {
      userInput.split(",").forEach(function (item) {
        userIngredients.push(item.trim());
      });
      console.log(userIngredients);
    } else {
      userIngredients.push(userInput);
    }
    console.log(userIngredients);
    return userIngredients;
  }
  const options = {
    method: "POST",
    url: "https://zestful.p.rapidapi.com/parseIngredients",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": "d34fbad9damsh82dd8ff206f6231p1a950djsn8c6b8c7ab9c9",
      "X-RapidAPI-Host": "zestful.p.rapidapi.com",
    },
    data: { ingredients: ingData },
  };

  function handleUserInput(e) {
    setUserInput(e.target.value);
  }
  const handleIngredientSubmit = (e) => {
    e.preventDefault();
    setIngData(parseUserInput());
    axios
      .request(options)
      .then(function (response) {
        setZestful(response.data.results);
        getData(response.data.results);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <InputGroup legend="ingredients">
      <Input
        label="ingredients"
        type="text"
        value={userInput}
        name="userinput"
        onChange={handleUserInput}
      />
      <button type="button" onClick={handleIngredientSubmit}>
        click to submit userinput
      </button>
    </InputGroup>
  );
}
