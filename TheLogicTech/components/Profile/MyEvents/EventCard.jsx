import LocationCityIcon from "@mui/icons-material/LocationCity";
import RoomIcon from "@mui/icons-material/Room";
import Ratings from "./Ratings";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import moment from "moment";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { useState } from "react";
import EventCancel from "../../Misc/EventCancel";
import CloseIcon from "@mui/icons-material/Close";
import { PlaylistAdd, PlaylistAddCheck } from "@mui/icons-material";
import Alert from "../../Misc/Alert";

SwiperCore.use([Pagination]);

const NoEvent = ({ type }) => {
  return (
    <div className="text-gray-400 tracking-wide flex flex-col items-center gap-8 text-2xl mt-5">
      <div className={`ubuntu font-light`}>No {type} Events</div>
      {type === "Upcoming" ? (
        <PlaylistAdd
          sx={{
            fontSize: "5rem",
          }}
        />
      ) : (
        <PlaylistAddCheck
          sx={{
            fontSize: "5rem",
          }}
        />
      )}
    </div>
  );
};

const Event = ({ eventType, event, disabled, isRating, setAlertOpen }) => {
  const diff =
    moment(event.startDate, "YYYY-MM-DD").toDate().getDate() -
    new Date().getDate();
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const [rating, setRating] = useState(event.userRatings);
  return (
    <div>
      <div className="rounded-md border p-6 text-gray-700 event-card">
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-1">
            <div className="text-lg uppercase font-bold">
              {event.eventName == "" ? eventType : event.eventName}
            </div>
            <div className="text-md capitalize text-gray-500">{eventType}</div>
          </div>
          <div className="flex  flex-col gap-2 text-gray-600 font-medium">
            <div>From : {event.startDate}</div>
            <div>To : {event.endDate}</div>
          </div>
        </div>
        <div className="py-2 text-gray-600 font-medium capitalize">
          Guests : {event.guestList.length}
        </div>
        <Divider variant="middle" />
        <div className="flex flex-col gap-1 py-2">
          <div className="uppercase font-semibold text-md ">
            {event.venue.value}
          </div>
          <div className="flex items-center text-sm">
            {" "}
            <LocationCityIcon
              sx={{
                fontSize: 20,
                marginRight: "6px",
              }}
            />
            {event.venue.address}
          </div>
          <div className="text-sm">
            {" "}
            <RoomIcon
              sx={{
                fontSize: 20,
                marginRight: "6px",
                color: "blue",
              }}
            />
            {event.venue.city}
          </div>
        </div>
        <Divider variant="middle" />
        <div className="flex justify-between items-center pt-4 pb-2">
          {isRating ? (
            <div>
              <Ratings
                uid={event.uid}
                type={eventType}
                rating={rating}
                setRating={setRating}
                event={event}
              />
            </div>
          ) : (
            <Button variant="outlined" size="small">
              <div className="lowercase">
                <span className="text-xl">{diff}</span> day(s) to Go{" "}
              </div>
            </Button>
          )}
          <div>
            {disabled ? null : (
              <Button
                variant="contained"
                color="error"
                startIcon={<CloseIcon />}
                onClick={handleClickOpen}
              >
                <div>Cancel</div>
              </Button>
            )}
          </div>
        </div>
      </div>
      <EventCancel
        title={event.eventName}
        open={open}
        setOpen={setOpen}
        setAlertOpen={setAlertOpen}
        type={eventType}
        uid={event.uid}
      />
    </div>
  );
};

const EventCard = ({ title, id, eventsData }) => {
  const [alertOpen, setAlertOpen] = useState(false);

  const upcoming = [];
  const completed = [];
  for (const events in eventsData) {
    const eventarr = eventsData[events];
    if (Array.isArray(eventarr)) {
      eventarr.map((event, index) => {
        const diff =
          moment(event.endDate, "YYYY-MM-DD").toDate().getDate() -
          new Date().getDate();
        if (diff >= 0) {
          upcoming.push(<Event eventType={events} key={index} event={event} />);
        } else {
          completed.push(
            <Event eventType={events} key={index} event={event} />
          );
        }
      });
    }
  }

  return (
    <div className="pb-6">
      <div
        id={id}
        className="px-4 mx-auto max-w-md md:max-w-2xl lg:max-w-full "
      >
        <h3 className="text-xl font-semibold py-6 text-gray-700 tracking-wider">
          {title}
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
          {title === "Upcoming Events" ? (
            upcoming.length > 0 ? (
              upcoming.map((event, index) => {
                return (
                  <SwiperSlide key={index}>
                    <Event
                      eventType={event.props.eventType}
                      event={event.props.event}
                      disabled={false}
                      isRating={false}
                      setAlertOpen={setAlertOpen}
                    />
                  </SwiperSlide>
                );
              })
            ) : (
              <NoEvent type="Upcoming" />
            )
          ) : completed.length > 0 ? (
            completed.map((event, index) => {
              return (
                <SwiperSlide key={index}>
                  <Event
                    eventType={event.props.eventType}
                    event={event.props.event}
                    disabled={true}
                    isRating={true}
                    setAlertOpen={setAlertOpen}
                  />
                </SwiperSlide>
              );
            })
          ) : (
            <NoEvent type="Completed" />
          )}
        </Swiper>
      </div>
      <Alert
        open={alertOpen}
        severity={"success"}
        setOpen={setAlertOpen}
        msg={"Event Cancelled Successfully"}
      />
    </div>
  );
};

export default EventCard;
