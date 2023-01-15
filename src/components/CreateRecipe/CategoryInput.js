import * as React from "react";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
const filter = createFilterOptions();

export default function CategoryInput({ getData }) {
  const [value, setValue] = React.useState(null);

  return (
    <Autocomplete
      value={value}
      onChange={(event, newValue) => {
        if (typeof newValue === "string") {
          setValue({
            title: newValue,
          });
        } else if (newValue && newValue.inputValue) {
          setValue({
            title: newValue.inputValue,
          });
        } else {
          setValue(newValue);
        }
        getData(value);
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);
        const { inputValue } = params;
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
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      autoSelect
      autoHighlight
      id="free-solo-with-text-demo"
      options={categories}
      getOptionLabel={(option) => {
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
      renderOption={(props, option) => <li {...props}>{option.title}</li>}
      freeSolo
      renderInput={(params) => (
        <div
          ref={params.InputProps.ref}
          className="input-container muiAutocomplete-input-container"
        >
          <label>category</label>
          <input type="text" {...params.inputProps} />
        </div>
      )}
    />
  );
}

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
