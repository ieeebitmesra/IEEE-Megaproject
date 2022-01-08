import React, { useState, useEffect } from "react";
import EmailIcon from "@mui/icons-material/Email";
import CallIcon from "@mui/icons-material/Call";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import HouseIcon from "@mui/icons-material/House";
import { LoadingButton } from "@mui/lab";
import UserData from "./UserData";
import Gender from "./Gender";
import { Button, CircularProgress } from "@mui/material";
import DOB from "./DOB";
import updateUser from "../../../config/api/updateUser";
import useUser from "../../../hooks/useUser";
import { Edit, CloudDone } from "@mui/icons-material";
import Alert from "../../Misc/Alert";
import { validatePhone,validateName } from "../../../utils/validation";

const Loading = () => {
  return (
    <div className="flex h-[40vh] w-full relative justify-center items-center text-xl text-center">
      <CircularProgress />
    </div>
  );
};

const MyProfile = () => {
  const [disabledBtn, setDisabledBtn] = useState(true);
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userCity, setUserCity] = useState("");
  const [userDob, setUserDob] = useState("");
  const [userGender, setUserGender] = useState("");
  const [userState, setUserState] = useState("");
  const [userPhoneNumber, setUserPhoneNumber] = useState("");

  const [open, setOpen] = useState(false);
  const [dataSuccess,setDataSuccess]=useState(false);
  const [errMsg,setErrMsg]=useState("");

  const { user } = useUser();

  useEffect(() => {
    if (user) {
      setUserCity(user.city);
      setUserDob(user.dob);
      setUserGender(user.gender);
      setUserState(user.state);
      setUserPhoneNumber(user.phoneNumber);
    }
  }, [user]);

  if (!user) {
    return <Loading />;
  }

  const onEdit = () => {
    setDisabledBtn(!disabledBtn);
    setEdit(!edit);
  };

  const onSave = async () => {
    setLoading(true);
    const ob = {
      uid: user.uid,
      city: userCity,
      dob: userDob,
      gender: userGender,
      state: userState,
      phoneNumber: userPhoneNumber,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    };
    if (!validatePhone(ob.phoneNumber)) {
      setErrMsg("Phone Number");
      setDataSuccess(false);
      setOpen(true);

    }
    else if(!validateName(ob.state)){
      setErrMsg("State Name");
      setDataSuccess(false);
      setOpen(true);
    }
    else if(!validateName(ob.city)){
      setErrMsg("City Name");
      setDataSuccess(false);
      setOpen(true);
    }
     else {
      setDisabledBtn(!disabledBtn);
      setEdit(!edit);
      setDataSuccess(true);
      const res = await updateUser(ob);
      if (res) {
        console.log("User updated succefully");
      } else {
        console.log("User not updated");
      }
      setOpen(true);
    }
    setLoading(false);
   
  };
  return (
    <div>
      <div className="z-10">
        <div className="  p-6 mb-8">
          <h3 className="text-3xl text-center font-semibold tracking-wider text-gray-700 pb-12">
            Profile
          </h3>
          <div>
            <div className="flex justify-center gap-12 md:gap-20 flex-wrap">
              <div className="flex flex-col space-y-6 text-gray-700 text-md md:text-lg tracking-wider w-[26rem]">
                <UserData
                  icon={<EmailIcon />}
                  value={user.email}
                  title="Email"
                  edit={false}
                />
                <UserData
                  icon={<CallIcon />}
                  title="Mobile"
                  edit={edit}
                  handleChange={setUserPhoneNumber}
                  value={userPhoneNumber}
                />
                <Gender
                  value={userGender}
                  handleChange={setUserGender}
                  edit={edit}
                />
              </div>
              <div className="flex flex-col space-y-6 text-gray-700 text-md md:text-lg tracking-wider w-[26rem] ">
                <UserData
                  icon={<HouseIcon />}
                  title="City"
                  edit={edit}
                  handleChange={setUserCity}
                  value={userCity}
                />
                <UserData
                  icon={<LocationCityIcon />}
                  title="State"
                  edit={edit}
                  handleChange={setUserState}
                  value={userState}
                />
                <DOB value={userDob} handleChange={setUserDob} edit={edit} />
              </div>
            </div>
            <div className="flex justify-center gap-8 pt-12 pb-4">
              <Button
                variant="contained"
                size="small"
                onClick={onEdit}
                disabled={disabledBtn ? false : true}
                endIcon={<Edit size="small" />}
              >
                <div className="capitalize">Edit</div>
              </Button>
              <LoadingButton
                onClick={onSave}
                loading={loading}
                variant="contained"
                size="small"
                disabled={disabledBtn ? true : false}
                color="success"
                endIcon={<CloudDone />}
              >
                <div className="capitalize">Save</div>
              </LoadingButton>
            </div>
          </div>
        </div>
      </div>
     {
        dataSuccess ?(
          <Alert
          open={open}
          severity={"success"}
          setOpen={setOpen}
          msg={"Data Saved  Successfully"}
        />
        ):(
          <Alert
          open={open}
          severity={"warning"}
          setOpen={setOpen}
          msg={`Please Enter Valid ${errMsg} `}
        />
        )
     }
    </div>
  );
};

export default MyProfile;