import React from 'react'
import Profile from '../Profile/profile'
import SearchModal from '../SearchModal/searchmodal'
import Button from '@/app/uikits/Button/button'
import Image from 'next/image'
import styles from './navbar.module.css'
import classNames from 'classnames'
import Link from 'next/link'
import { BOOKMARKS, CREATEPOST, HOME, LOGIN, REGISTER } from '@/app/Routes/RoutesUrl'
import InputSearch from '@/app/uikits/Input/inputSearch'
import { PiPencilLineFill } from "react-icons/pi";
import { BiSearch } from "react-icons/bi";
import { userValue } from '@/app/context/userContext'
import { BsFillPersonFill } from "react-icons/bs";
import { NavbarType } from '@/app/Types/global'

const Desktopnav = ({isMobile, toggleDrawer, handlefocus,profileimg, handleProfile, show }: NavbarType) => {
    const { state } = userValue();
    // console.log(state?.user)
  return (
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
       
        <li className={ styles.searchLi}>
          <BiSearch color="#FF9753" className={styles.searchicon} />
          <InputSearch
            placeholder="search"
            onFocus={handlefocus}
            // onClick={handlefocus}
            // onBlur={blurHandler}
          />
        </li>

        <li>
          <div className={styles.divider}></div>
        </li>
       
         {state?.user === undefined ? (
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
         ): state?.user?.status === "ok" ? (
            <li>
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
                src={state?.user?.data?.photo ?? profileimg}
                width={50}
                height={50}
                alt="profile-icon"
              />
            )}
          </div>
          </li>
         ) : ("")}
          
           
      </ul>
      

 {show && <Profile handleProfile={handleProfile} />}
 </div>


  </>
)
}

export default Desktopnav   