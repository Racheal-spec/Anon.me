"use client";
import Link from "next/link";
import styles from "./navbar.module.css";
import { TfiWrite } from "react-icons/tfi";
import Button from "../Button/button";
import Image from "next/image";
import { GrNotification } from "react-icons/gr";
import profileimg from "../../Assets/profileimg.png";
import { BsFillPersonFill } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { CREATEPOST, HOME, LOGIN, REGISTER } from "@/app/Routes";

const Navbar = () => {
  const isUserLoggedIn = false;
  const route = useRouter();

  return (
    <div className={styles.navwrapper}>
      <div className={styles.logowrapper}>
        <div>
          <TfiWrite size="1.3em" className={styles.logoicon} />
        </div>
        <div className={styles.logotext}>
          <p>Anon</p>
        </div>
      </div>

      <ul className={styles.navul}>
        {isUserLoggedIn ? (
          <>
            <li>
              <Link className={styles.link} href="/">
                Home
              </Link>
            </li>
            <li>
              <Link className={styles.link} href="/createpost">
                Start Writing
              </Link>
            </li>
            <li>
              <Link className={styles.link} href="/feed">
                My Feed
              </Link>
            </li>
            <li>
              <GrNotification className={styles.notificatn_icon} />
            </li>
            <li className={styles.profile_img_div}>
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
          </>
        ) : (
          <>
            <li>
              <Link href={HOME}>Home</Link>
            </li>
            <li>
              <Link href={CREATEPOST}>Start Writing</Link>
            </li>
            <li>
              <Button primary onClick={() => route.push(REGISTER)}>
                Sign Up
              </Button>
            </li>
            <li>
              <Button outline onClick={() => route.push(LOGIN)}>
                Login
              </Button>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
