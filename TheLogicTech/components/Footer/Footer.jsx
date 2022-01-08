import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Link from "next/link";

const LinkItem = ({ content, href }) => {
  return (
    <li className="text-blue-600 my-1 flex items-center">
      <ChevronRightIcon />
      <Link passHref href={href}>
        <div className="text-gray-600 hover:text-gray-800 cursor-pointer">
          {content}
        </div>
      </Link>
    </li>
  );
};

const Footer = () => {
  return (
    <footer className="text-gray-50 bg-wgray-100 mt-24 w-full">
      <div className="container px-12 pt-8 pb-8 md:pb-0 mx-auto">
        <div className="sm:flex flex-wrap justify-evenly order-first items-center gap-5">
          <div className="">
            <div className="text-7xl font-extrabold text-blue-600 uppercas tracking-wider dancing text-center">
              hevently
            </div>
            <div className="pt-2 pb-6 text-center">
              <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
                <a href="#" className="text-gray-500 cursor-pointer hover:text-gray-800 mr-4">
                  <FacebookIcon />
                </a>
                <a href="#" className="ml-3 text-gray-500 cursor-pointer hover:text-gray-800 mr-4">
                  <TwitterIcon />
                </a>
                <a href="#" className="ml-3 text-gray-500 cursor-pointer hover:text-gray-800 mr-4">
                  <InstagramIcon />
                </a>
                <a href="#" className="ml-3 text-gray-500 cursor-pointer hover:text-gray-800 mr-4">
                  <LinkedInIcon />
                </a>
              </span>
            </div>
          </div>
          <div className="flex xl:flex-nowrap md:flex-nowrap lg:flex-wrap flex-wrap justify-center md:justify-start space-x-12 text-left items-start">
            <div>
              <h2 className="text-gray-900 font-semibold tracking-wider text-lg mb-2">
                Navigation
              </h2>
              <nav className="list-none mb-5">
                <LinkItem content="Home" href="/" />
                <LinkItem content="About" href="/about" />
                <LinkItem content="Services" href="/#events" />
                <LinkItem content="Contact" href="/#contact" />
              </nav>
            </div>
            <div className="">
              <h2 className="text-gray-900 font-semibold tracking-wider text-lg mb-2">
                Services
              </h2>
              <nav className="list-none mb-5">
                <LinkItem content="Weddings" href="/wedding" />
                <LinkItem content="Social Gatherings" href="/social" />
                <LinkItem content="Birthdays" href="/birthday" />
                <LinkItem content="Corporate Events" href="/corporate" />
              </nav>
            </div>
          </div>
          <div className="">
            <h2 className="font-semibold text-gray-900 tracking-wider text-lg mb-4 text-center">
              Subscribe To Our Newsletter
            </h2>
            <div className="flex xl:flex-nowrap md:flex-nowrap lg:flex-wrap flex-wrap justify-center items-end md:justify-start mb-4">
              <div className="relative w-40 sm:w-auto  px-2">
                <input
                  type="text"
                  autoComplete="off"
                  placeholder="Email"
                  className="w-full bg-[#fff] bg-opacity-50 rounded border-gray-400 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 focus:border-blue-500 outline-none text-gray-600 py-1 px-2 leading-8 transition-colors duration-200 ease-in-out text-base border-2"
                />
              </div>
              <button className="flex-shrink-0 inline-flex bg-blue-500 py-2 px-4 focus:outline-none hover:bg-blue-600 rounded mt-2 border-2 border-blue-500 transition-all duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-300 mt-2">
        <div className="container py-4 mx-auto flex items-center justify-center">
          <p className="text-sm font-semibold text-gray-600">
            Copyright © 2021 TheLogicTech
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
