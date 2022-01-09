import { useState } from "react";
import {
  registerUser,
  loginUser,
  signInMethods,
} from "../../config/firebase/authProvider";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import OutlinedInput from "@mui/material/OutlinedInput";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import Alert from "../Misc/Alert";
import Tooltip from "@mui/material/Tooltip";
import { validateEmail } from "../../utils/validation";

const Login = ({
  email,
  password,
  setEmail,
  setPassword,
  register,
  setShowLogin,
  setOpenSuccess,
  setOpenFail,
}) => {
  const [confirm, setConfirm] = useState("");
  const [values, setValues] = useState({
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  return (
    <div>
      <div className="w-screen fixed z-50">
        <Alert open={open} severity={"warning"} setOpen={setOpen} msg={msg} />
      </div>
      <div className="relative my-2">
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          InputProps={{
            autoComplete: "no",
          }}
          fullWidth
          size="small"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <Tooltip title="Password must be of atleast 6 characters" arrow>
        <div className="relative my-4">
          <FormControl variant="outlined" fullWidth>
            <InputLabel htmlFor="outlined-adornment-password" size="small">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={values.showPassword ? "text" : "password"}
              value={password}
              size="small"
              InputProps={{
                autoComplete: "no",
              }}
              onChange={(e) => setPassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
        </div>
      </Tooltip>

      {register ? (
        <Tooltip title="Password must be of atleast 6 characters" arrow>
          <div className="relative my-4">
            <FormControl variant="outlined" fullWidth>
              <InputLabel htmlFor="outlined-adornment-password" size="small">
                Confirm
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={values.showPassword ? "text" : "password"}
                value={confirm}
                size="small"
                InputProps={{
                  autoComplete: "no",
                }}
                onChange={(e) => setConfirm(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
          </div>
        </Tooltip>
      ) : null}

      <button
        className={`w-full text-gray-50 ${
          register
            ? "bg-indigo-600 hover:bg-indigo-800"
            : "bg-orange-600 hover:bg-orange-800"
        } border-0 py-2 px-6 focus:outline-none rounded text-md mt-2`}
        onClick={async () => {
          try {
            if (validateEmail(email)) {
              if (password === confirm) {
                const methods = await signInMethods(email);
                if (methods.length === 0) {
                  if (register) {
                    await registerUser(email, password);
                    setOpenSuccess(true);
                    setShowLogin(false);
                  } else {
                    setMsg("Please register to continue");
                    setOpen(true);
                  }
                } else {
                  if (methods.includes("password")) {
                    if (!register) {
                      await loginUser(email, password);
                      setOpenSuccess(true);
                      setShowLogin(false);
                    } else {
                      setMsg(
                        "Email already registered. Please login to continue"
                      );
                      setOpen(true);
                    }
                  } else {
                    setMsg("Email already registered");
                    setOpen(true);
                  }
                }
              } else {
                setMsg("Password incorrect or does not match");
                setOpen(true);
              }
            } else {
              setMsg("Please enter a valid email");
              setOpen(true);
            }
          } catch (err) {
            setOpenFail(true);
          }
        }}
      >
        {register ? "Register" : "Login"}
      </button>
    </div>
  );
};

export default Login;
