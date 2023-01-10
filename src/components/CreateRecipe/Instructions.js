import { TextField } from "@mui/material";
import { useState } from "react";
import { parse } from "recipe-ingredient-parser-v3";
import Input, { InputGroup } from "../Input/Input";

export const instructionSchema = {
  instruction: "",
};

export default function Instructions({ getData }) {
  const [inputList, setInputList] = useState([{ instruction: "" }]);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index] = {
      instruction: value,
    };
    setInputList(list);
    getData(inputList);
  };
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
    getData(inputList);
  };
  const handleAddClick = () => {
    setInputList([...inputList, { instruction: "" }]);
    getData(inputList);
  };

  return (
    <div className="App">
      {inputList.map((x, i) => {
        return (
          <div className="box" key={`instr-box-${i}`}>
            <TextField
              name="instruction"
              value={x.instruction}
              onChange={(e) => handleInputChange(e, i)}
              id="outlined-textarea"
              label="instruction"
              placeholder="preheat oven to 350"
              multiline
            />
            <div>
              {inputList.length !== 1 && (
                <button onClick={() => handleRemoveClick(i)}>Remove</button>
              )}
              {inputList.length - 1 === i && (
                <button onClick={handleAddClick}>Add</button>
              )}
            </div>
          </div>
        );
      })}
      {/* <div>{JSON.stringify(inputList)}</div> */}
      {/* <div>
        {inputList.map((item, idx) => (
          <>
            <li key={`inst-list-${idx}`}>{item.instruction}</li>
          </>
        ))}
      </div> */}
    </div>
  );
}
