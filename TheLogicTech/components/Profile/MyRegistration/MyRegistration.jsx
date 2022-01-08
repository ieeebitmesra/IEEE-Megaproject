import React from "react";
import RegistrationCard from "./RegistrationCard";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { PlaylistAdd } from "@mui/icons-material";
import useUserVenue from "../../../hooks/useUserVenue";
import { CircularProgress } from "@mui/material";

SwiperCore.use([Pagination]);
const NoRegistration = () => {
  return (
    <div className="text-gray-400 pb-8 tracking-wide flex flex-col items-center gap-8 text-2xl mt-5">
      <h3 className="text-3xl text-center font-semibold tracking-wider text-gray-600 py-6 pb-12">
          Venue Registrations
        </h3>
      <div className={`ubuntu font-light`}>No Registrations</div>
      <PlaylistAdd
        sx={{
          fontSize: "5rem",
        }}
      />
    </div>
  );
};

const MyRegistration = () => {
  const { venues: data } = useUserVenue();
  if (!data) {
    return <NoRegistration />
  }
  return (
    <>
      <div className="px-4 pb-8 mx-auto max-w-md md:max-w-2xl lg:max-w-full ">
        <h3 className="text-3xl text-center font-semibold tracking-wider text-gray-600 py-6 pb-12">
          Venue Registrations
        </h3>
        <Swiper
          className="event-swiper"
          slidesPerView={1}
          spaceBetween={30}
          grabCursor={true}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            900: {
              slidesPerView: 2,
            },
            1250: {
              slidesPerView: 3,
            },
          }}
        >
          {
            data.venues.map((venue, index) => {
              return (
                <SwiperSlide key={index}>
                  <RegistrationCard venue={venue} />
                </SwiperSlide>
              );
            })
          }
        </Swiper>
      </div>
    </>
  );
};

export default MyRegistration;
