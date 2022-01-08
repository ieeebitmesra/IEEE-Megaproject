import React from "react";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import { styled } from "@mui/material/styles";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

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

export default function MaterialUIPickers({ edit, handleChange, value }) {
  return (
    <div className="flex items-center justify-between">
      <div className="text-gray-700 font-semibold tracking-wider ">
        {" "}
        <span className="mr-1">
          <CalendarTodayIcon />
        </span>{" "}
        DOB
      </div>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DesktopDatePicker
          inputFormat="dd/MM/yyyy"
          value={value}
          maxDate={new Date()}
          onChange={(newVal) => handleChange(newVal)}
          readOnly={edit ? false : true}
          renderInput={(params) => {
            let newParams = Object.assign({}, params);
            newParams.InputProps = {
              ...params.InputProps,
              sx: {
                backgroundColor: "white",
                color: "rgb(63, 63, 70)",
                fontFamily:'poppins'
              }
            }
            return (
              <CssTextField
                focused={edit}
                required
                className="w-72"
                size="small"
                {...newParams}
              />
            );
          }}
        />
      </LocalizationProvider>
    </div>
  );
}
