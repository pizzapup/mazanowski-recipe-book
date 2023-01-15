import { useState } from "react";
import Chip from "@mui/material/Chip";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
const dietaryRestrictions = [
  { title: "vegetarian", type: "diet" },
  { title: "vegan", type: "diet" },
  { title: "gluten", type: "allergy/intolerance" },
  { title: "shellfish", type: "allergy/intolerance" },
  { title: "peanut", type: "allergy/intolerance" },
  { title: "soy", type: "allergy/intolerance" },
  { title: "eggs", type: "allergy/intolerance" },
];

const filter = createFilterOptions();

export default function Tags() {
  const [value, setValue] = useState(null);

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
      {value.map((v) => (
        <Chip key={v.title} label={v.title} />
      ))}
    </>
  );
}
