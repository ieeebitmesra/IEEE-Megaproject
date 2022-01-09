import Image from "next/image";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

const Card = ({ name, ghref, ihref, lhref, desc, userPhoto }) => {
  return (
    <div className="">
      <div className="max-w-sm rounded overflow-hidden shadow-lg pb-10">
        <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-24"></div>
        <div className="flex justify-center w-20 h-20 overflow-hidden relative rounded-full mx-auto z-10 -mt-12">
          <Image
            className="w-full"
            src={userPhoto}
            alt="Sunset in the mountains"
            layout="fill"
          />
        </div>
        <div className="px-6 py-4">
          <div className="font-semibold text-gray-700 text-xl mb-2 text-center">{name}</div>
          <p className="text-gray-700 text-justify poppins">{desc}</p>
        </div>
        <div className="px-6 pt-4 pb-2 flex justify-center">
          <a
            className="ml-3 text-gray-500 cursor-pointer hover:text-gray-800 mr-4"
            href={ghref}
          >
            <GitHubIcon />
          </a>
          <a
            className="ml-3 text-gray-500 cursor-pointer hover:text-gray-800 mr-4"
            href={ihref}
          >
            <InstagramIcon />
          </a>
          <a
            className="ml-3 text-gray-500 cursor-pointer hover:text-gray-800 mr-4"
            href={lhref}
          >
            <LinkedInIcon />
          </a>
        </div>
      </div>
    </div>
  );
};

function About() {
  return (
    <>
      <div className="relative h-screen flex items-center justify-center ">
        <div className="cover aboutbg h-full w-full absolute"></div>
        <div className="sm:w-3/4 lg:w-5/12 mx-auto px-2 py-20 mt-20 z-20">
          <h1 className="text-5xl md:text-7xl text-center text-bookmark-blue capitalize font-extrabold dancing text-gray-50">
            About Hevently
          </h1>
          <p className="md:text-[20px] text-justify text-bookmark-grey mt-4 py-10 text-gray-50">
            Born at the intersection of clever and creative, hevently harnesses
            the power of emotion to make your most important day less stressful
            and more beautiful. At our core, we are a culture of action and
            imagination.Our goal is to provide unparalleled event services and
            outstanding customer service.We take care of every detail so you can
            focus on what matters most, hosting a once in a lifetime experience
            and unforgettable celebration. We plan wedding and events, we{"'"}re
            experts in perfecting the details and creating the extraordinary. We
            exist so that you can enjoy the fun parts of planning and leave the
            stress behind. Our clients are intensely busy professionals who
            depend on us to make their planning process stress-free and to
            discover what will make their day uniquely special. We make design
            and planning simple for our clients - and simple isn{"'"}t easy.
          </p>
        </div>
      </div>

      <div className="relative px-4 py-10 pb-10 border top-0">
        <div className="dancing text-5xl capitalize md:text-7xl text-gray-700 font-bold text-center mt-8 mb-20">
          Our Team
        </div>
        <div className="flex flex-col gap-10 lg:flex-row lg:flex-wrap lg:justify-center lg:gap-20 items-center">
          <Card
            name="Shivam Kumar"
            ghref="https://github.com/pseudo-bot"
            ihref="https://www.instagram.com/_seevum/"
            lhref="https://www.linkedin.com/in/jas0210/"
            desc="I am a CSE sophomore at BIT Mesra, a full stack developer 
            with a passion for learning and creating new technologies."
            userPhoto="/about/user.jpg"
          />
          <Card
            name="Ravish Raj Tiwary"
            ghref="https://github.com/ravishraj21"
            ihref="https://www.instagram.com/ravishraj21/"
            lhref="https://www.linkedin.com/in/ravish-raj-tiwary-9356831ba/"
            desc="I am a CSE sophomore at BIT Mesra, a full stack developer 
            with a passion for learning and creating new technologies."
            userPhoto="/about/user.jpg"
          />
          <Card
            name="Sarang Gupta"
            ghref="https://github.com/Saranggupta11"
            ihref="https://www.instagram.com/sarang.gupta08/"
            lhref="https://www.linkedin.com/in/sarang-gupta-6b0aa31b7/"
            desc="I am a CSE sophomore at BIT Mesra, a full stack developer 
            with a passion for learning and creating new technologies."
            userPhoto="/about/user.jpg"
          />
        </div>
      </div>
    </>
  );
}

export default About;
