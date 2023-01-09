import { useState } from "react";
import Input, { InputGroup } from "../Input/Input";

export const instructionSchema = {
  text: "",
};
export default function Instructions({ getData }) {
  const [instructions, setInstructions] = useState([instructionSchema]);
  const addInstruction = (e) => {
    let newInstructions = instructions.concat(instructionSchema);
    setInstructions(newInstructions);
    getData(newInstructions);
  };
  const removeInstruction = (e) => {
    console.log(e.target.id);
    let idx = parseInt(e.target.id.split("-")[2]);
    console.log("Removing Instruction " + idx);
    let newInstructions = instructions.filter(
      (Instruction, index) => idx !== index
    );
    setInstructions(newInstructions);
    getData(newInstructions);
  };
  const handleInstructionChange = (e) => {
    let index = parseInt(e.target.id.split("-")[2]);
    const newInstructions = instructions.map((Instruction, idx) => {
      if (index !== idx) {
        return Instruction;
      }
      return { ...Instruction, [e.target.name]: e.target.value };
    });
    setInstructions(newInstructions);
    getData(newInstructions);
  };

  return (
    <InputGroup legend="instructions">
      <ul>
        {instructions.map((instruction, idx) => (
          <li key={idx}>
            <Input
              type="text"
              id={`instr-text-${idx}`}
              value={instructions.product}
              name="product"
              label="product (Instruction name)"
              onChange={handleInstructionChange}
            />
            <button
              type="button"
              id={`instr-remove-${idx}`}
              onClick={removeInstruction}
            >
              remove
            </button>
          </li>
        ))}
      </ul>
      <button type="button" onClick={addInstruction}>
        add Instruction
      </button>
    </InputGroup>
  );
}
