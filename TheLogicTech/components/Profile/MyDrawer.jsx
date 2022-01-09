import React, { useState } from "react";
import {
  Person,
  Event,
  Logout,
  EventAvailable,
  EventNote,
  HowToReg,
} from "@mui/icons-material/";
import Image from "next/image";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import logOut from "../../config/firebase/signOut";
import { useRouter } from "next/router";
import Register from "./MyRegistration/Register";

const MyDrawer = ({ photoURL, displayName }) => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const router = useRouter();

  const signOut = async () => {
    await logOut();
    router.push("/");
  };

  return (
    <>
      <div className="bg-[#fff] shadow-lg border-r fixed w-[240px] h-screen"></div>
      <div className="relative z-50 h-full">
        <div className="py-8">
          <div className="w-full flex justify-center">
            <Image
              src={photoURL || "/profile/user.png"}
              alt="Profile picture"
              className="rounded-full"
              width={64}
              height={64}
            />
          </div>
          <div className="text-center py-2 capitalize">
            {displayName === "" ? "User" : displayName}
          </div>
        </div>
        <div className="pb-4">
          <Divider variant="middle">
            <div className="text-gray-500">Profile</div>
          </Divider>
        </div>
        <nav>
          <a
            href="#"
            className="flex py-2 px-4 gap-2 items-center  hover:text-blue-700 transition-all duration-200 m-2"
          >
            <Person /> <span>Profile</span>
          </a>
          <div className="w-4/5 mx-auto">
            <Divider variant="middle" />
          </div>
          <a
            href="#events"
            className="flex py-2 px-4 gap-2 items-center  hover:text-blue-700 transition-all duration-200 m-2"
          >
            <Event /> <span>My Events</span>
          </a>
          <div className="w-4/5 mx-auto">
            <Divider variant="middle" />
          </div>
          <a
            href="#upcoming"
            className="flex py-2 px-4 gap-2 items-center  hover:text-blue-700 transition-all duration-200 m-2"
          >
            <EventNote /> <span>Upcoming Events</span>
          </a>
          <div className="w-4/5 mx-auto">
            <Divider variant="middle" />
          </div>
          <a
            href="#completed"
            className="flex py-2 px-4 gap-2 items-center  hover:text-blue-700 transition-all duration-200 m-2"
          >
            <EventAvailable /> <span>Completed Events</span>
          </a>

          <div className="py-4">
            <Divider variant="middle">
              <div className="text-gray-500">Registration</div>
            </Divider>
          </div>
          <a
            href="#"
            className="flex py-2 px-4 gap-2 items-center  hover:text-blue-700 transition-all duration-200 m-2"
            onClick={handleClickOpen}
          >
            <HowToReg /> <span>Register</span>
          </a>
          <div className="w-4/5 mx-auto">
            <Divider variant="middle" />
          </div>
          <a
            href="#completed"
            className="flex py-2 px-4 gap-2 items-center  hover:text-blue-700 transition-all duration-200 m-2"
          >
            <EventAvailable /> <span>My Registrations</span>
          </a>

          <div className="fixed bottom-0 py-8 w-[240px] p-4 bg-[#fff] ">
            <Button
              variant="contained"
              color="error"
              className="flex py-2 hover:cursor-pointer px-6  gap-2 items-center  transition-all duration-200 hover:bg-red-500 left-1/2 -translate-x-1/2  hover:text-[#fff] justify-center"
              onClick={signOut}
            >
              <Logout /> <span>Logout</span>
            </Button>
          </div>
        </nav>
        <Register open={open} setOpen={setOpen} />
      </div>
    </>
  );
};

export default MyDrawer;
