import React from 'react'
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import BreadCrumbs from "./BreadCrumbs";
import Toolbar from "@mui/material/Toolbar";


const drawerWidth = 240;


const NavBar = ({displayName,mobileOpen,setMobileOpen}) => {
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
      };
     
    return (
        <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
        className="bg-blue-500 shadow-lg"
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <div className="flex items-center justify-between w-full">
            <div className="text-[2.25rem] font-bold text-gray-200 tracking-wider dancing cursor-pointer">
              hevently
            </div>
            <BreadCrumbs name={displayName} />
          </div>
        </Toolbar>
      </AppBar>
    )
}

export default NavBar
