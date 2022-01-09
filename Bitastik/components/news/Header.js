import React from "react";
import Image from "next/image";
import news from "./newspaper.png";
import classes from './Header.module.css';

function Header() {
  return (
    <header className={classes.head}>
       <h1>
      <span ><Image src={news} height={48} width={48}></Image></span>
        NEWSROOM 101
      </h1>
    </header>
  );
}

export default Header;
