import Link from "next/link";
import styles from "./navbar.module.css";
import { TfiWrite } from "react-icons/tfi";
import Button from "../Button/button";
import Image from "next/image";
import { GrNotification } from "react-icons/gr";
import profileimg from "../../Assets/profileimg.png";
import { BsFillPersonFill } from "react-icons/bs";
import { CREATEPOST, FEED, HOME, LOGIN, REGISTER } from "@/app/RoutesUrl";
import { getUser } from "../../services/userdata";
import { userapi } from "@/app/services/api";

const Navbar = async () => {
  // const user = await getUser();
  const userdata = await userapi();
  console.log(userdata);

  return (
    <div className={styles.navwrapper}>
      <div className={styles.logowrapper}>
        <div>
          <TfiWrite size="1.3em" className={styles.logoicon} />
        </div>
        <div className={styles.logotext}>
          <p>Anon</p>
        </div>
        {userdata?.anonname && <h3>hello {userdata?.anonname}</h3>}
      </div>

      <ul className={styles.navul}>
        {userdata ? (
          <>
            <li>
              <Link className={styles.link} href={HOME}>
                Home
              </Link>
            </li>
            <li>
              <Link className={styles.link} href={CREATEPOST}>
                Start Writing
              </Link>
            </li>
            <li>
              <Link className={styles.link} href={FEED}>
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
              <Button primary>
                <Link href={REGISTER}> Sign Up</Link>
              </Button>
            </li>
            <li>
              <Button outline>
                <Link href={LOGIN}>Login</Link>
              </Button>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
