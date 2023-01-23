import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import veggiedip from "../assets/imgs/veggiedip.jpg";
import bowl from "../assets/imgs/bowl.jpg";
import bowl2 from "../assets/imgs/bowl2.jpg";
import breakfast from "../assets/imgs/breakfast.jpg";
import eggtoast from "../assets/imgs/eggtoast.jpg";
import pasta from "../assets/imgs/pasta.jpg";
import pie from "../assets/imgs/pie.jpg";
import toast from "../assets/imgs/toast.jpg";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
const filter = createFilterOptions();
const LandingPage = (props) => {
  const [value, setValue] = React.useState(null);
  const navigate = useNavigate();

  const [dietType, setDietType] = useState("");
  const [foodIntolerances, setIntolerances] = useState([]);
  const [cardOneSelected, setCardOneSelected] = useState(false);
  const [cardTwoSelected, setCardTwoSelected] = useState(false);
  const [cardThreeSelected, setCardThreeSelected] = useState(false);
  const [cardFourSelected, setCardFourSelected] = useState(false);
  const [cardFiveSelected, setCardFiveSelected] = useState(false);
  const [cardSixSelected, setCardSixSelected] = useState(false);
  const [cardSevenSelected, setCardSevenSelected] = useState(false);
  const [cardEightSelected, setCardEightSelected] = useState(false);
  const [values, setValues] = useState();
  console.log(dietType);
  console.log(foodIntolerances);

  const clickHandlerCardOne = (e) => {
    setCardOneSelected(!cardOneSelected);
    if (cardOneSelected === false) {
      setDietType("vegetarian");
      setCardTwoSelected(false);
    } else {
      setDietType("");
    }
  };

  const clickHandlerCardTwo = (e) => {
    setCardTwoSelected(!cardTwoSelected);
    if (cardTwoSelected === false) {
      setDietType("vegan");
      setCardOneSelected(false);
    } else {
      setDietType("");
    }
  };
  const clickHandlerIntolerances = (e) => {
    //
  };
  const clickHandlerCardThree = (e) => {
    setCardThreeSelected(true);
    setIntolerances((intolerance) => [...intolerance, "seafood"]);
  };

  const clickHandlerCardFour = (e) => {
    setCardFourSelected(true);
    setIntolerances((intolerance) => [...intolerance, "gluten"]);
  };

  const clickHandlerCardFive = (e) => {
    setCardFiveSelected(true);
    setIntolerances((intolerance) => [...intolerance, "treenut"]);
  };

  const clickHandlerCardSix = (e) => {
    setCardSixSelected(true);
    setIntolerances((intolerance) => [...intolerance, "shellfish"]);
  };

  const clickHandlerCardSeven = (e) => {
    setCardSevenSelected(true);
    setIntolerances((intolerance) => [...intolerance, "dairy"]);
  };

  const clickHandlerCardEight = (e) => {
    setCardEightSelected(true);
    setIntolerances((intolerance) => [...intolerance, "soy"]);
  };

  const clearIntolerances = (e) => {
    setCardOneSelected(false);
    setCardTwoSelected(false);
    setCardThreeSelected(false);
    setCardFourSelected(false);
    setCardFiveSelected(false);
    setCardSixSelected(false);
    setCardSevenSelected(false);
    setCardEightSelected(false);
    setIntolerances([]);
  };

  const handleSubmit = (e) => {
    props.func(foodIntolerances);
    props.func2(dietType);
    navigate("/recipes");
  };
  const dietaryRestrictions = [
    { title: "vegetarian", type: "diet" },
    { title: "vegan", type: "diet" },
    { title: "gluten", type: "allergy/intolerance" },
    { title: "shellfish", type: "allergy/intolerance" },
    { title: "peanut", type: "allergy/intolerance" },
    { title: "soy", type: "allergy/intolerance" },
    { title: "eggs", type: "allergy/intolerance" },
  ];
  return (
    <>
      <Autocomplete
        multiple
        options={dietaryRestrictions}
        onChange={(event, newValue) => {
          if (typeof newValue === "string") {
            setValue({
              title: newValue,
            });
          } else if (newValue && newValue.inputValue) {
            // Create a new value from the user input
            setValue({
              title: newValue.inputValue,
            });
          } else {
            setValue(newValue);
          }
          console.log(value);
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          const { inputValue } = params;
          // Suggest the creation of a new value
          const isExisting = options.some(
            (option) => inputValue === option.title
          );
          if (inputValue !== "" && !isExisting) {
            filtered.push({
              inputValue,
              title: `Add "${inputValue}"`,
            });
          }

          return filtered;
        }}
        // getOptionLabel={(option) => option.title}
        getOptionLabel={(option) => {
          // Value selected with enter, right from the input
          if (typeof option === "string") {
            return option;
          }
          // Add "xxx" option created dynamically
          if (option.inputValue) {
            return option.inputValue;
          }
          // Regular option
          return option.title;
        }}
        freeSolo
        disableCloseOnSelect
        renderInput={(params) => (
          <TextField {...params} variant="standard" label="tags" />
        )}
      />
      <div>
        <div>
          <div>
            <div>
              <div>
                <h2>Search Recipes by Diet</h2>
                <p>SELECT ONE OR NONE</p>

                <div onClick={() => clickHandlerCardOne()}>
                  <div>
                    <img
                      className={cardOneSelected ? "opacity-25" : ""}
                      src={veggiedip}
                      alt="Food Picture"
                    />
                  </div>
                  <h3
                    className={
                      cardOneSelected
                        ? "text-center mt-3 text-black"
                        : "text-center mt-3"
                    }
                  >
                    VEGETARIAN
                  </h3>
                </div>

                <div
                  className="text-white"
                  onClick={() => clickHandlerCardTwo()}
                >
                  <div>
                    <img
                      className={cardTwoSelected ? "opacity-25" : ""}
                      src={toast}
                      alt="Food Picture"
                    />
                  </div>
                  <h3
                    className={
                      cardTwoSelected
                        ? "text-center mt-3 text-black"
                        : "text-center mt-3"
                    }
                  >
                    VEGAN
                  </h3>
                </div>
              </div>
            </div>
            <div
              className="text-center"
              style={{
                fontFamily: "Vibur, cursive",
              }}
            >
              <div>
                <h2 className="mt-3">Search Recipes by Intolerances</h2>
                <p
                  style={{
                    color: "#70BA89",
                  }}
                >
                  SELECT UP TO SIX
                </p>
              </div>
            </div>
            <div xs="2" className="mb-3">
              <div>
                {/* Card 3 */}
                <div
                  className="text-white"
                  onClick={() => clickHandlerCardThree()}
                  style={{
                    maxWidth: "18rem",
                    border: "1rem solid #70BA89",
                    backgroundColor: "#70BA89",
                    fontFamily: "Vibur, cursive",
                  }}
                >
                  <div
                    style={{
                      maxWidth: "256px",
                      height: "256px",
                      position: "relative",
                      overflow: "hidden",
                      borderRadius: "0.5rem",
                    }}
                  >
                    <img
                      className={cardThreeSelected ? "opacity-25" : ""}
                      src={eggtoast}
                      alt="Food Picture"
                      style={{
                        display: "inline",
                        margin: "0 auto",
                        height: "auto",
                        maxWidth: "100%",
                      }}
                    />
                  </div>
                  <h3
                    className={
                      cardThreeSelected
                        ? "text-black text-center mt-3"
                        : "text-center mt-3"
                    }
                  >
                    SEAFOOD
                  </h3>
                </div>
              </div>
              <div>
                {/*Card 4 */}
                <div
                  className="text-white"
                  onClick={() => clickHandlerCardFour()}
                  style={{
                    maxWidth: "18rem",
                    border: "1rem solid #70BA89",
                    backgroundColor: "#70BA89",
                    fontFamily: "Vibur, cursive",
                    borderRadius: "0.5rem",
                  }}
                >
                  <div
                    style={{
                      maxWidth: "256px",
                      height: "256px",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      className={cardFourSelected ? "opacity-25" : ""}
                      src={pie}
                      alt="Food Picture"
                      style={{
                        display: "inline",
                        margin: "0 auto",
                        height: "auto",
                        maxWidth: "100%",
                        borderRadius: "0.5rem",
                      }}
                    />
                  </div>
                  <h3
                    className={
                      cardFourSelected
                        ? "text-black text-center mt-3"
                        : "text-center mt-3"
                    }
                  >
                    GLUTEN
                  </h3>
                </div>
              </div>
            </div>
            <div xs="2" className="mb-3">
              <div>
                {/* Card 5 */}
                <div
                  className="text-white"
                  onClick={() => clickHandlerCardFive()}
                  style={{
                    maxWidth: "18rem",
                    border: "1rem solid #70BA89",
                    backgroundColor: "#70BA89",
                    fontFamily: "Vibur, cursive",
                  }}
                >
                  <div
                    style={{
                      maxWidth: "256px",
                      height: "256px",
                      position: "relative",
                      overflow: "hidden",
                      borderRadius: "0.5rem",
                    }}
                  >
                    <img
                      className={cardFiveSelected ? "opacity-25" : ""}
                      src={bowl2}
                      alt="Food Picture"
                      style={{
                        display: "inline",
                        margin: "0 auto",
                        height: "100%",
                        maxWidth: "auto",
                      }}
                    />
                  </div>
                  <h3
                    className={
                      cardFiveSelected
                        ? "text-black text-center mt-3"
                        : "text-center mt-3"
                    }
                  >
                    TREE NUTS
                  </h3>
                </div>
              </div>
              <div>
                {/*Card 6 */}
                <div
                  className="text-white"
                  onClick={() => clickHandlerCardSix()}
                  style={{
                    maxWidth: "18rem",
                    border: "1rem solid #70BA89",
                    backgroundColor: "#70BA89",
                    fontFamily: "Vibur, cursive",
                  }}
                >
                  <div
                    style={{
                      maxWidth: "256px",
                      height: "256px",
                      position: "relative",
                      overflow: "hidden",
                      borderRadius: "0.5rem",
                    }}
                  >
                    <img
                      className={cardSixSelected ? "opacity-25" : ""}
                      src={breakfast}
                      alt="Food Picture"
                      style={{
                        display: "inline",
                        margin: "0 auto",
                        height: "100%",
                        maxWidth: "auto",
                      }}
                    />
                  </div>
                  <h3
                    className={
                      cardSixSelected
                        ? "text-black text-center mt-3"
                        : "text-center mt-3"
                    }
                  >
                    SHELLFISH
                  </h3>
                </div>
              </div>
            </div>
            <div xs="2" className="mb-3">
              <div>
                {/* Card 7 */}
                <div
                  className="text-white"
                  onClick={() => clickHandlerCardSeven()}
                  style={{
                    maxWidth: "18rem",
                    border: "1rem solid #70BA89",
                    backgroundColor: "#70BA89",
                    fontFamily: "Vibur, cursive",
                  }}
                >
                  <div
                    style={{
                      maxWidth: "256px",
                      height: "256px",
                      position: "relative",
                      overflow: "hidden",
                      borderRadius: "0.5rem",
                    }}
                  >
                    <img
                      className={cardSevenSelected ? "opacity-25" : ""}
                      src={bowl}
                      alt="Food Picture"
                      style={{
                        display: "inline",
                        margin: "0 auto",
                        height: "100%",
                        maxWidth: "auto",
                      }}
                    />
                  </div>
                  <h3
                    className={
                      cardSevenSelected
                        ? "text-black text-center mt-3"
                        : "text-center mt-3"
                    }
                  >
                    DAIRY
                  </h3>
                </div>
              </div>
              <div>
                {/*Card 8 */}
                <div
                  className="text-white"
                  onClick={() => clickHandlerCardEight()}
                  style={{
                    maxWidth: "18rem",
                    border: "1rem solid #70BA89",
                    backgroundColor: "#70BA89",
                    fontFamily: "Vibur, cursive",
                  }}
                >
                  <div
                    style={{
                      maxWidth: "256px",
                      height: "256px",
                      position: "relative",
                      overflow: "hidden",
                      borderRadius: "0.5rem",
                    }}
                  >
                    <img
                      className={cardEightSelected ? "opacity-25" : ""}
                      src={pasta}
                      alt="Food Picture"
                      style={{
                        display: "inline",
                        margin: "0 auto",
                        height: "auto",
                        maxWidth: "100%",
                      }}
                    />
                  </div>
                  <h3
                    className={
                      cardEightSelected
                        ? "text-black text-center mt-3"
                        : "text-center mt-3"
                    }
                  >
                    SOY
                  </h3>
                </div>
              </div>
            </div>

            <div>
              <div className="text-center">
                <button
                  style={{
                    backgroundColor: "#70BA89",
                    fontFamily: "Vibur, cursive",
                  }}
                  className="m-3 btn btnhover btn-lg text-white greenbtn"
                  onClick={() => clearIntolerances()}
                >
                  CLEAR
                </button>
                <button
                  style={{
                    color: "#70BA89",
                    fontFamily: "Vibur, cursive",
                    border: "1px solid #70BA89",
                  }}
                  className="m-3 btn btnhover btn-lg btn-white"
                  onClick={() => handleSubmit()}
                >
                  SUBMIT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
export const categories = [
  { title: "poultry" },
  { title: "beef" },
  { title: "lamb" },
  { title: "pork/ham" },
  { title: "fish" },
  {
    title: "pasta and sauces",
    defaultImg:
      "https://www.freepik.com/free-vector/pasta-types-sketch-set_9457418.htm#query=pasta&position=23&from_view=search&track=sph",
  },
  { title: "cakes, pies, etc.", parentCategory: "dessert" },
  { title: "cookies and brownies", parentCategory: "dessert" },
  { title: "appetizers and dips" },
  { title: "salads,dressings and condiments" },
  { title: "breakfast foods" },
  { title: "pizza, etc" },
  { title: "vegetarian" },
  { title: "vegetables and side dishes" },
  {
    title: "coffee cakes, morning rolls, and buns",
    parentCategory: "dessert",
  },
  { title: "sweet breads", parentCategory: "dessert" },
  { title: "candy", parentCategory: "dessert" },
  { title: "beverages" },
];
