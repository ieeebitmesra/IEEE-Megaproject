import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";

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
  
  const UserData = ({ icon, title, edit, handleChange, value }) => {
    return (
      <div className="flex items-center justify-between">
        <div className="text-gray-700 font-medium tracking-wider  ">
          {" "}
          <span className="mr-1">{icon}</span> {title}
        </div>
        <CssTextField
          id="outlined-basic"
          value={value}
          required
          InputProps={{
            readOnly: edit ? false : true,
            autoComplete: "off",
            sx: {
              backgroundColor: "white",
              color: "rgb(63, 63, 70)",
              fontFamily:'poppins'
            }
          }}
          variant="outlined"
          className="w-72 bg-bgray-50"
          onChange={(e) => handleChange(e.target.value)}
          focused={edit}
          size="small"
        />
      </div>
    );
  };


export default UserData;