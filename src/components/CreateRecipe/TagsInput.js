import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function TagsInput({ getData }) {
  return (
    <Autocomplete
      multiple
      options={dietaryRestrictions}
      disableCloseOnSelect
      getOptionLabel={(option) => option.title}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.title}
        </li>
      )}
      style={{ width: 500 }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Checkboxes"
          placeholder="Favorites"
          onChange={(e) => getData(e.target.value)}
        />
      )}
    />
  );
}

const dietaryRestrictions = [
  { title: "vegetarian", type: "diet" },
  { title: "vegan", type: "diet" },
  { title: "gluten", type: "allergy/intolerance" },
  { title: "shellfish", type: "allergy/intolerance" },
  { title: "peanut", type: "allergy/intolerance" },
  { title: "soy", type: "allergy/intolerance" },
  { title: "eggs", type: "allergy/intolerance" },
];
