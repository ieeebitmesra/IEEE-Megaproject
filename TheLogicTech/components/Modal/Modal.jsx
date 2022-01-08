import React, { useState, useContext } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import { useRouter } from "next/router";
import { UserContext } from "../../context/Users";
import 'animate.css';

export default function Modal({
  showModal,
  setShowModal,
  title,
  href,
  setOpen,
}) {
  const router = useRouter();
  const user = useContext(UserContext);
  const browseHandler = () => {
    if (user) {
      setShowModal(false);
      router.push("/profile#events");
    } else {
      setShowModal(false);
      setOpen(true);
    }
  };
  const newHandler = () => {
    if (user) {
      setShowModal(false);
      router.push(href);
    } else {
      setShowModal(false);
      setOpen(true);
    }
  };
  return (
    <>
      <div
        className={` ${
          showModal ? " flex " : "hidden"
        } justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none  px-5 animate__animated animate__fadeIn animate__faster`}  
      >
        <div className="relative o myw-aut-6 mx-auto max-w-3xl bg-bgray-50 rounded-lg">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-center justify-between p-5 border-b border-solid border-blueGray-200 rounded-t text-center">
              <h3 className="uppercase font-semibold text-[18px] tracking-wide z-10 mx-auto">
                {title}
              </h3>
              <button
                className="text-gray-900 absolute right-6"
                onClick={() => setShowModal(false)}
              >
                <CancelIcon fontSize="medium" />
              </button>
            </div>
            {/*footer*/}
            <div className="flex flex-col p-16 space-y-4">
              <button
                className="bg-blue-500 text-gray-50 hover:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => newHandler()}
              >
                Create New Event
              </button>
              <button
                className="bg-blue-500 text-gray-50 hover:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => browseHandler()}
              >
                Browse Previous Event
              </button>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="opacity-40 fixed inset-0 z-40 bg-gray-800"></div>
      )}
    </>
  );
}
