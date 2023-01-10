import React, { useState } from "react";
import { TextField } from "@mui/material";
import axios from "axios";

export const ingredientSchema = {
  name: "",
  quantity: "",
  unit: "",
};

export function sendAxios(data) {
  const options = {
    method: "POST",
    url: "https://zestful.p.rapidapi.com/parseIngredients",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": "d34fbad9damsh82dd8ff206f6231p1a950djsn8c6b8c7ab9c9",
      "X-RapidAPI-Host": "zestful.p.rapidapi.com",
    },
    data: { ingredients: data },
  };
  axios
    .request(options)
    .then(function (response) {
      console.log(response.data.results);
    })
    .catch(function (error) {
      console.error(error);
    });
}
export default function ZestIngredients({ getData }) {
  const [userInput, setUserInput] = useState("");

  function parseUserInput(input) {
    const userIngredients = [];
    if (input.includes(",") == true) {
      input.split(",").forEach(function (item) {
        userIngredients.push(item.trim());
      });
    } else {
      userIngredients.push(input);
    }
    return userIngredients;
  }

  const handleUserInput = (e) => {
    const newParse = parseUserInput(e.target.value);
    console.log(newParse);
    setUserInput(newParse);
    getData(newParse);
  };

  return (
    <>
      <TextField
        onChange={handleUserInput}
        value={userInput}
        name="ingredients"
        id="outlined-textarea"
        label="ingredients"
        placeholder="3/4 cup diced tomato"
        helperText="example: 2 cups white flour, 1tsp salt, 2 cloves garlic minced, 1/2 cup chicken broth"
        multiline
      />
    </>
  );
}
