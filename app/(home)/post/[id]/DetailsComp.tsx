"use client";
import { useParams } from "next/navigation";
import React from "react";
import styles from "./pages.module.css";
import profileimg from "../../../Assets/profileimg.png";
import Image from "next/image";
import { GrMore } from "react-icons/gr";

const DetailsComp = () => {
  let params = useParams();
  console.log(params);
  return (
    <div className={styles.pageWrapper}>
      <h1>Introducing a New Wizard for the Blogging Community</h1>
      <div className={styles.authorInfo}>
        <div>
          <Image
            src={profileimg}
            className={styles.profileImg}
            width={50}
            height={50}
            alt="user-profile-image"
          />
        </div>
        <div className={styles.namedetails}>
          <div>
            <h5 className={styles.anonname}>Anon name</h5>
          </div>
          <div>
            <p className={styles.dateStyle}>20 September, 2023</p>
          </div>
        </div>
      </div>

      <div className={styles.moreicon}>
        <GrMore />
      </div>
      <section className={styles.mainsection}>
        <div>
          <Image
            src={profileimg}
            className={styles.blogimage}
            alt="user-profile-image"
          />
        </div>
        <div className={styles.mainContent}>
          <p>
            Next.js 12 had significant features and improvements like the build
            times 5x faster; another exciting feature released called Edge
            Network allows you to deploy your functions in the Edge and increase
            the execution speed. An extension of this feature is the support of
            middleware in a Next.js application. A middleware is a function that
            sits in front of your application routes. It is executed before the
            request reaches the business logic associated with a route. Next.js
            12 had significant features and improvements like the build times 5x
            faster; another exciting feature released called Edge Network allows
            you to deploy your functions in the Edge and increase the execution
            speed. An extension of this feature is the support of middleware in
            a Next.js application. A middleware is a function that sits in front
            of your application routes. It is executed before the request
            reaches the business logic associated with a route. Next.js 12 had
            significant features and improvements like the build times 5x
            faster; another exciting feature released called Edge Network allows
            you to deploy your functions in the Edge and increase the execution
            speed. An extension of this feature is the support of middleware in
            a Next.js application. A middleware is a function that sits in front
            of your application routes. It is executed before the request
            reaches the business logic associated with a route.
          </p>
        </div>
      </section>
    </div>
  );
};

export default DetailsComp;
