import Link from "next/link";
import styles from "./navbar.module.css";
import { TfiWrite } from "react-icons/tfi";
import Button from "../Button/button";
import Image from "next/image";
import { GrNotification } from "react-icons/gr";
import profileimg from "../../Assets/profileimg.png";
import { BsFillPersonFill } from "react-icons/bs";

const Navbar = () => {
  const isUserLoggedIn = true;
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
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/createpost">Start Writing</Link>
            </li>
            <li>
              <Button primary>Sign Up</Button>
            </li>
            <li>
              <Button outline>Login</Button>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
