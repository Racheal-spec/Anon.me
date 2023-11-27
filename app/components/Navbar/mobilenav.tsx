import React from 'react'
import styles from './navbar.module.css'
import classNames from 'classnames'
import Link from 'next/link'
import { PiPencilLineFill } from "react-icons/pi";
import { BiSearch } from "react-icons/bi";
import { userValue } from '@/app/context/userContext';
import { BsFillPersonFill } from "react-icons/bs";
import Image from 'next/image';
import { AiOutlineMenu } from "react-icons/ai";
import { GrClose } from "react-icons/gr";
import InputSearch from '@/app/uikits/Input/inputSearch';
import Profile from '../Profile/profile';
import { BOOKMARKS, CREATEPOST, HOME, LOGIN, REGISTER } from '@/app/Routes/RoutesUrl';
import Button from '@/app/uikits/Button/button';
import { NavbarType } from '@/app/Types/global';

const MobileNav = ({toggleDrawer, handleMenu, isMobile, handlefocus,profileimg, handleProfile, show }: NavbarType) => {
  const { state } = userValue();
  return (
<>
       <>
          <div className={styles.searchLi}>
            <BiSearch color="#FF9753" className={styles.searchicon} />
            <InputSearch placeholder="search" onFocus={handlefocus} />
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
            {state?.user?.status === "ok" ? (
              <div className={styles.profile_img_div} onClick={handleProfile}>
                {!profileimg ? (
                  <div className={styles.profile_img}>
                    <BsFillPersonFill />
                  </div>
                ) : (
                  <Image
                    className={styles.profile_img}
                    src={state?.user?.data?.photo ?? profileimg}
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
          {/**===========MOBILE NAVIGATION VERSION============ */}

        <ul
          className={classNames(
            styles.navstyle,
            toggleDrawer !== true ? styles.active : ""
          )}
        >
          <li className={isMobile ? styles.display : styles.searchLi}>
            <BiSearch color="#FF9753" className={styles.searchicon} />
            {/* <InputSearch placeholder="search" onFocus={handlefocus} /> */}
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
</>
  )
}

export default MobileNav