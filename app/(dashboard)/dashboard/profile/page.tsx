"use client";
import React from "react";
import styles from "./page.module.css";
import InputField from "@/app/uikits/Input/Input";
import Image from "next/image";
import { userValue } from "@/app/context/userContext";
import profileimg from "../../../Assets/images/profileimg.png";
import { MdOutlineDeleteOutline } from "react-icons/md";
import Button from "@/app/uikits/Button/button";
const Profile = () => {
  const { state } = userValue();
  console.log(state);
  return (
    <div className={styles.profilewrapper}>
      <h2>General Settings</h2>
      <div>
        <div className={styles.label}>
          <label>Anon Username</label>
        </div>
        <InputField />
      </div>
      <div>
        <div className={styles.label}>
          <label>Unique ID</label>
        </div>
        <InputField />
      </div>
      <div>
        <div className={styles.label}>
          <label>Profile Photo</label>
        </div>
        <div className={styles.imgdiv}>
          <Image
            src={profileimg}
            className={styles.profileimg}
            alt="user_image"
          />
          <div className={styles.icondiv}>
            <MdOutlineDeleteOutline className={styles.deleteicon} />
          </div>
        </div>
      </div>
      <div>
        <div className={styles.label}>
          <label>Location</label>
          <div>
            <select name="countries" id="country" className={styles.select}>
              <option value="Nigeria">Nigeria</option>
            </select>
          </div>
        </div>
        <div className={styles.btndiv}>
          <Button primary>Update</Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
