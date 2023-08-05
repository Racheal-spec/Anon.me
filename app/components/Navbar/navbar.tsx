"use client";
import Link from "next/link";
import styles from "./navbar.module.css";
import { TfiWrite } from "react-icons/tfi";
import Button from "../Button/button";
import Image from "next/image";
import { GrNotification } from "react-icons/gr";
import profileimg from "../../Assets/profileimg.png";
import { BsFillPersonFill } from "react-icons/bs";
import { CREATEPOST, FEED, HOME, LOGIN, REGISTER } from "../../RoutesUrl";
import { useEffect, useRef, useState } from "react";
import { UserProp } from "@/app/Types/user";
import Profile from "../Profile/profile";

export type eventType = {
  onClick: (
    e: React.MouseEvent<HTMLLIElement> | React.MouseEvent<HTMLElement>
  ) => void;
  // handleProfile: (e: React.MouseEvent<HTMLElement>) => void;
};
const getUsers = async () => {
  // let url = process.env.BASE_URL as string;
  // console.log(url);
  //http://localhost:3000/api/getposts
  const res = await fetch("http://localhost:3000/api/auth/user");
  if (!res.ok) {
    console.log(res);
  }
  return await res.json();
};
const Navbar = () => {
  //================HOOKS========================//
  const [userdata, setUserData] = useState<UserProp>({});
  const [show, setShow] = useState(false);

  //===============HANDLERS=====================//
  const handleuser = async () => {
    let data = await getUsers();
    console.log(data);
    setUserData(data);
  };

  const handleProfile = (e: eventType) => {
    setShow(!show);
  };

  //===============USEEFFECTS==================//

  useEffect(() => {
    handleuser();
  }, []);

  return (
    <div className={styles.navwrapper}>
      <div className={styles.logowrapper}>
        <div>
          <TfiWrite size="1.3em" className={styles.logoicon} />
        </div>
        <div className={styles.logotext}>
          <p>Anon</p>
        </div>
        {userdata?.data?.anonname && <h3>hello {userdata?.data?.anonname}</h3>}
      </div>

      <ul className={styles.navul}>
        {userdata?.status === "ok" ? (
          <>
            <li>
              <Link className={styles.link} href={HOME}>
                Home
              </Link>
            </li>
            <li>
              <Link className={styles.link} href={FEED}>
                My Feed
              </Link>
            </li>
            <li>
              <Link className={styles.link} href={CREATEPOST}>
                Start Writing
              </Link>
            </li>

            <li>
              <GrNotification className={styles.notificatn_icon} />
            </li>
            <li className={styles.profile_img_div} onClick={handleProfile}>
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
            </li>
            {show && <Profile handleProfile={handleProfile} />}
          </>
        ) : (
          <>
            <li>
              <Link href={HOME}>Home</Link>
            </li>
            <li>
              <Link className={styles.link} href={FEED}>
                My Feed
              </Link>
            </li>
            <li>
              <Link href={CREATEPOST}>Start Writing</Link>
            </li>

            <li>
              <Link href={REGISTER}>
                <Button primary>Sign Up</Button>
              </Link>
            </li>
            <li>
              <Link href={LOGIN}>
                <Button outline>Login</Button>
              </Link>
            </li>
            {/* <li>
              <Button primary onClick={handleuser}>
                User
              </Button>
            </li> */}
          </>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
