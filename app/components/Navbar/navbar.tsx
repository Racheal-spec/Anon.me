"use client";
import Link from "next/link";
import styles from "./navbar.module.css";
import Button from "../../uikits/Button/button";
import Image from "next/image";
import profileimg from "../../Assets/images/profileimg.png";
import { BsFillPersonFill } from "react-icons/bs";
import { PiPencilLineFill } from "react-icons/pi";
import { BiSearch } from "react-icons/bi";
import { AiOutlineMenu } from "react-icons/ai";
import { GrClose } from "react-icons/gr";
import {
  BOOKMARKS,
  CREATEPOST,
  HOME,
  LOGIN,
  REGISTER,
} from "../../Routes/RoutesUrl";
import { useEffect, useState } from "react";
import Profile from "../Profile/profile";
import { userValue } from "@/app/context/userContext";
import InputSearch from "../../uikits/Input/inputSearch";
import classNames from "classnames";
import { eventType } from "@/app/Types/user";
import { UseResizeScreen } from "@/app/hooks/ResizeScreen";
import SearchModal from "../SearchModal/searchmodal";
import LogoComp from "../LogoComp/LogoComp";
import MobileNav from "./mobilenav";
import Desktopnav from "./desktopnav";

const Navbar = () => {
  //================HOOKS========================//
  //const [userdata, setUserData] = useState<UserProp>({});
  const [show, setShow] = useState(false);
  const { state } = userValue();
  const [toggleDrawer, setToggleDrawer] = useState(true);
  const [searchmodal, showSearchModal] = useState(false);
  // const[isMobile, setIsmobile] = useState(true);

  const handleProfile = () => {
    setShow(!show);
  };

  const isMobile = UseResizeScreen();

  const handleMenu = () => {
    setToggleDrawer(!toggleDrawer);
  };
  const handlefocus = (event: React.FocusEvent<HTMLInputElement>) => {
    showSearchModal(true);
  };


  //===============USEEFFECTS==================//

  return (
    <>
    <div className={styles.navwrapper}>
  <div>
  <LogoComp />
  </div>
      {isMobile && (
         <MobileNav isMobile={isMobile} show={show} handleProfile={handleProfile} handleMenu={handleMenu} handlefocus={handlefocus} toggleDrawer={toggleDrawer} profileimg={profileimg} />
          
      )}

{!isMobile &&  (
        <Desktopnav toggleDrawer={toggleDrawer}  isMobile={isMobile} show={show} handleProfile={handleProfile} searchmodal={searchmodal}  handlefocus={handlefocus}  profileimg={profileimg} />

      )}
       
    </div>
        {/**SEARCH MODAL */}
        <div>
      {" "}
      <SearchModal
        searchmodal={searchmodal}
        showSearchModal={showSearchModal}
      />
    </div>
    </>
    );
  };
  
  export default Navbar;

  



    