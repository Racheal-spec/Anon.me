"use client";
import Link from "next/link";
import styles from "./navbar.module.css";
import { TfiWrite } from "react-icons/tfi";
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
import { getUsers } from "@/app/context/Actions/Actions";
import InputSearch from "../../uikits/Input/inputSearch";
import classNames from "classnames";
import { Types } from "@/app/Types/reducerTypes";
import { UserProp, eventType, userType } from "@/app/Types/user";
import { UseResizeScreen } from "@/hooks/ResizeScreen";

const Navbar = () => {
  //================HOOKS========================//
  //const [userdata, setUserData] = useState<UserProp>({});
  const [show, setShow] = useState(false);
  const { state, dispatch } = userValue();
  const [toggleDrawer, setToggleDrawer] = useState(true);
  const isMobile = UseResizeScreen();

  const fetchUser = async () => {
    let data = await getUsers();

    if (dispatch) {
      dispatch({
        type: Types.GetUser,
        payload: data,
      });
    }
  };

  const handleProfile = (e: eventType) => {
    setShow(!show);
  };

  const handleMenu = () => {
    // if(menuRef.current  )
    setToggleDrawer(!toggleDrawer);
  };
  //===============USEEFFECTS==================//
  useEffect(() => {
    if (!state?.user) {
      fetchUser();
    }
  }, []);

  return (
    <>
      <div className={styles.navwrapper}>
        <div className={styles.logowrapper}>
          <div>
            <TfiWrite
              size={isMobile ? "1.0em" : "1.3em"}
              className={styles.logoicon}
            />
          </div>
          {isMobile ? null : (
            <div className={styles.logotext}>
              <p>ANON</p>
            </div>
          )}

          {/* {state.user?.user?.data?.anonname && (
            <h3>hello {state.user?.user.data?.anonname}</h3>
          )} */}
        </div>
        {isMobile ? (
          <>
            <div className={styles.searchLi}>
              <BiSearch color="#FF9753" className={styles.searchicon} />
              <InputSearch placeholder="search" />
            </div>

            <div className={styles.menuprofilediv}>
              <div
                className={
                  toggleDrawer !== true ? styles.menuicon : styles.menuiconclose
                }
                onClick={handleMenu}
              >
                {toggleDrawer !== true ? (
                  <GrClose fontSize={"1.5rem"} />
                ) : (
                  <AiOutlineMenu fontSize={"1.5rem"} />
                )}
              </div>
              {/**======================VIEW PROFILE================================ */}
              {state?.user ? (
                <div className={styles.profile_img_div} onClick={handleProfile}>
                  {!profileimg ? (
                    <div className={styles.profile_img}>
                      <BsFillPersonFill />
                    </div>
                  ) : (
                    <Image
                      className={styles.profile_img}
                      src={profileimg}
                      width={50}
                      height={50}
                      alt="profile-icon"
                    />
                  )}
                </div>
              ) : (
                ""
              )}
              {show && <Profile handleProfile={handleProfile} />}
            </div>
          </>
        ) : (
          ""
        )}

        {/**===========MOBILE VERSION============ */}
        {isMobile ? (
          <ul
            className={classNames(
              styles.navstyle,
              toggleDrawer !== true ? styles.active : ""
            )}
          >
            <li className={isMobile ? styles.display : styles.searchLi}>
              <BiSearch color="#FF9753" className={styles.searchicon} />
              <InputSearch placeholder="search" />
            </li>
            <li>
              <Link className={styles.link} href={HOME} onClick={handleMenu}>
                Home
              </Link>
            </li>

            <li>
              <Link
                className={styles.link}
                href={BOOKMARKS}
                onClick={handleMenu}
              >
                Bookmarks
              </Link>
            </li>
            <li>
              <Link
                className={styles.link}
                href={CREATEPOST}
                onClick={handleMenu}
              >
                <PiPencilLineFill color="#FF9753" fontSize={"1.2rem"} />
                Write
              </Link>
            </li>
            <li>
              <hr className={styles.divider} />
            </li>

            <li>
              <Link href={LOGIN} className={styles.link} onClick={handleMenu}>
                Sign In
              </Link>
            </li>
            <li>
              <Link
                href={REGISTER}
                className={styles.link}
                onClick={handleMenu}
              >
                <Button primary>Register</Button>
              </Link>
            </li>
          </ul>
        ) : (
          <>
            {/**===========DESKTOP VERSION============ */}
            <div>
              <ul
                className={classNames(
                  styles.navstyle,
                  toggleDrawer !== true ? styles.active : ""
                )}
              >
                <li>
                  <Link className={styles.link} href={HOME}>
                    Home
                  </Link>
                </li>

                <li>
                  <Link className={styles.link} href={BOOKMARKS}>
                    Bookmarks
                  </Link>
                </li>
                <li>
                  <Link className={styles.link} href={CREATEPOST}>
                    <PiPencilLineFill color="#FF9753" fontSize={"1.2rem"} />
                    Write
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <ul
                className={classNames(
                  styles.navstyle,
                  toggleDrawer !== true ? styles.active : ""
                )}
              >
                <li className={isMobile ? styles.display : styles.searchLi}>
                  <BiSearch color="#FF9753" className={styles.searchicon} />
                  <InputSearch placeholder="search" />
                </li>

                <li>
                  <hr className={styles.divider} />
                </li>

                {/**======================VIEW PROFILE================================ */}
                {state?.user ? (
                  <div
                    className={styles.profile_img_div}
                    onClick={handleProfile}
                  >
                    {!profileimg ? (
                      <div className={styles.profile_img}>
                        <BsFillPersonFill />
                      </div>
                    ) : (
                      <Image
                        className={styles.profile_img}
                        src={profileimg}
                        width={50}
                        height={50}
                        alt="profile-icon"
                      />
                    )}
                  </div>
                ) : (
                  <>
                    <li>
                      <Link href={LOGIN} className={styles.link}>
                        Sign In
                      </Link>
                    </li>
                    <li>
                      <Link href={REGISTER} className={styles.link}>
                        <Button primary>Register</Button>
                      </Link>
                    </li>
                  </>
                )}
                {show && <Profile handleProfile={handleProfile} />}
              </ul>
            </div>
          </>
        )}
      </div>
      <hr className={styles.hrstyle} />
    </>
  );
};

export default Navbar;
