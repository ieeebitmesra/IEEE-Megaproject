import * as React from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "blue",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "rgb(212, 212, 216)",
    },
    "&:hover fieldset": {
      borderColor: "rgb(212, 212, 216)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "rgb(99, 102, 241)",
    },
  },
});

const venType = [
  {
    value: "Wedding",
    label: "Wedding",
  },
  {
    value: "Birthday",
    label: "Birthday",
  },
  {
    value: "Social",
    label: "Social",
  },
  {
    value: "Corporate",
    label: "Corporate",
  },
];

export default function SelectTextFields({ handleChange, value }) {
  return (
    <div>
      <label className="leading-7 capitalize text-sm text-gray-600">
        Venue Type
      </label>
      <div className="w-full">
        <CssTextField
          id="outlined-select-gender"
          select
          required
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          InputProps={{
            sx: {
              backgroundColor: "white",
              color: "rgb(63, 63, 70)",
              fontFamily: "poppins",
            },
          }}
          size="small"
          fullWidth
        >
          {venType.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </CssTextField>
      </div>
    </div>
  );
}
