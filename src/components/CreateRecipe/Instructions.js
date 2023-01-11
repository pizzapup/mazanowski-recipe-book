import { FormGroup, TextField } from "@mui/material";
import { useState } from "react";
import Input, { InputGroup } from "../Input/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faCirclePlus,
  faCircleMinus,
} from "@fortawesome/free-solid-svg-icons";
export const instructionSchema = {
  instruction: "",
};

export default function Instructions({ getData }) {
  const [inputList, setInputList] = useState([{ instruction: "" }]);

  const handleInputChange = (e, index) => {
    const list = [...inputList];
    list[index] = {
      instruction: e.target.value,
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
    <InputGroup legend="instructions">
      {inputList.map((x, i) => {
        return (
          <div key={`instr-box-${i}`}>
            <li style={{ display: "flex" }}>
              <Input
                name="instruction"
                value={x.instruction}
                onChange={(e) => handleInputChange(e, i)}
                // label={`${i} instruction`}
                fullWidth
                placeholder="preheat oven to 350"
              />
              {inputList.length !== 1 && (
                <button
                  className="removeBtn"
                  type="button"
                  onClick={() => handleRemoveClick(i)}
                >
                  <FontAwesomeIcon icon={faCircleMinus} />
                </button>
              )}
            </li>
            {inputList.length - 1 === i && (
              <button className="addBtn" type="button" onClick={handleAddClick}>
                Add another instruction
                <FontAwesomeIcon icon={faCirclePlus} />
              </button>
            )}
          </div>
        );
      })}
    </InputGroup>
  );
}
