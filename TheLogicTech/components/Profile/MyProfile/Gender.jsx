import * as React from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import WcIcon from '@mui/icons-material/Wc';
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

const genders = [
  {
    value: "Male",
    label: "Male",
  },
  {
    value: "Female",
    label: "Female",
  },
  {
    value: "Others",
    label: "Others",
  },
];

export default function SelectTextFields({edit,handleChange,value}) {
  return (
    <div className="flex items-center justify-between">
        <div className="text-gray-700 font-semibold tracking-wider "> <span className="mr-1"><WcIcon/></span> Gender</div>
        <CssTextField
          id="outlined-select-gender"
          select
          value={value}
          required
          onChange={(e)=>handleChange(e.target.value)}
          InputProps={{
            readOnly: edit ? false : true,
            sx: {
              backgroundColor: "white",
              color: "rgb(63, 63, 70)",
              fontFamily:'poppins'
            }
          }}
          focused={edit}
          className="w-72 bg-bgray-50"
          size="small"
        >
          {genders.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </CssTextField>
      </div>
  );
}
