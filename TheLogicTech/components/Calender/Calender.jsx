import { useContext, useState } from "react";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import StaticDatePicker from "@mui/lab/StaticDatePicker";
import { styled } from "@mui/material/styles";
import { EventContext } from "../../context/EventContext";
import moment from "moment";

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
export default function StaticDatePickerLandscape() {
  const eventContext = useContext(EventContext);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className="flex flex-wrap justify-center gap-20 pt-12 px-0 sm:px-10 ">
        <StaticDatePicker
          orientation="potrait"
          openTo="day"
          label="Start date"
          value={startDate}
          minDate={new Date()}
          onChange={(newValue) => {
            setStartDate(newValue);
            eventContext.setStartDate(moment(newValue).format("YYYY-MM-DD"));
          }}
          renderInput={(params) => <CssTextField {...params} />}
        />
        <StaticDatePicker
          orientation="potrait"
          openTo="day"
          label="End date"
          value={endDate}
          minDate={startDate}
          onChange={(newValue) => {
            setEndDate(newValue);
            eventContext.setEndDate(moment(newValue).format("YYYY-MM-DD"));
          }}
          renderInput={(params) => <CssTextField {...params} />}
        />
      </div>
    </LocalizationProvider>
  );
}
