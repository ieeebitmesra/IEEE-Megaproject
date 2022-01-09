import Arrow from "@mui/icons-material/ArrowForwardIosRounded";
import Image from "next/image";
import { useState } from "react";
import Modal from "../Modal/Modal";

import wedding from "../../public/events/wedding.jpg";
import corporate from "../../public/events/corporate.jpg";
import social from "../../public/events/social.jpg";
import birthday from "../../public/events/bday.jpg";
import Alert from "../Misc/Alert";

const Event = ({ image, title, desc, href, setOpen }) => {
  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <div className="flex flex-col p-4 py6 rounded-lg items-center gap-10 lg:w-[40%] text-gray-700 max-w-[32rem] relative border border-gray-300 shadow-lg">
      <div className="uppercase font-semibold text-center text-xl tracking-wide z-10">
        {title}
      </div>
      <div className="w-72 h-72 overflow-hidden relative rounded-full group cursor-pointer hover:shadow-2xl transition-all duration-500">
        <Image
          className="absolute border bg-center transition-all duration-500 cursor-pointer group-hover:scale-110"
          src={image}
          alt={title}
          layout="fill"
          objectFit="cover"
          placeholder="blur"
        />
        <div
          onClick={openModal}
          className="bg-[#000] w-full h-0 absolute opacity-60 group-hover:h-full transition-all duration-500"
        ></div>
        <div className="bg-gray-200 absolute w-14 h-14 opacity-0 transition-all duration-500 group-hover:opacity-80 rounded-full top-28 left-1/2 -translate-x-1/2 flex justify-center items-center">
          <button onClick={openModal}>
            <Arrow fontSize="medium" />
          </button>
        </div>
      </div>
      <div className="text-justify px-10 z-10">{desc}</div>
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        title={title}
        href={href}
        setOpen={setOpen}
      />
    </div>
  );
};

function Events() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative px-4 py-1 pb-10 border top-0">
      <div
        id="events"
        className="dancing text-5xl capitalize md:text-7xl text-gray-700 font-bold text-center my-8"
      >
        events
      </div>
      <div className="flex flex-col gap-10 lg:flex-row lg:flex-wrap lg:justify-center lg:gap-20 items-center">
        <Event
          title="Weddings"
          image={wedding}
          desc="
          With every last detail taken care of, we're here to ensure the day you've always dreamed of will be the day you'll never forget."
          href="/wedding"
          setOpen={setOpen}
        />
        <Event
          title="Social Gathering"
          image={social}
          desc="From a show stopping engagement celebration to an epic surprise party, you dream it and we'll make it a reality."
          href="/social"
          setOpen={setOpen}
        />
        <Event
          title="Birthdays"
          image={birthday}
          desc="Make your or your near ones birthday special and unforgotable by connecting through us."
          href="/birthday"
          setOpen={setOpen}
        />
        <Event
          title="Corporate Events"
          image={corporate}
          desc="Wow your guests with a unique corporate experience that aligns with your company's mission and elevates your brand."
          href="/corporate"
          setOpen={setOpen}
        />
      </div>
      <Alert
        open={open}
        severity={"warning"}
        setOpen={setOpen}
        msg={"Please login to continue"}
      />
    </div>
  );
}

export default Events;
