import * as React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "next/link";
export default function BasicBreadcrumbs({ name }) {
  return (
    <div role="presentation">
      <Breadcrumbs aria-label="breadcrumb" color="white">
        <Link passHref href="/">
          <div className="hover:underline cursor-pointer">Home</div>
        </Link>
        <div className="text-gray-10 cursor-pointer capitalize">
          {name === "" ? "User" : name}
        </div>
      </Breadcrumbs>
    </div>
  );
}
