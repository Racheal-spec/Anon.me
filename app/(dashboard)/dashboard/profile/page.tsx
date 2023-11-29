"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";
import InputField from "@/app/uikits/Input/Input";
import Image from "next/image";
import { userValue } from "@/app/context/userContext";
import profileimg from "../../../Assets/images/profileimg.png";
import { MdOutlineDeleteOutline } from "react-icons/md";
import Button from "@/app/uikits/Button/button";
import { useForm } from "react-hook-form";
import { editUsers } from "@/app/context/Actions/Actions";
import {
  MainUserSchema,
  ProfileUserSchema,
  decryptEmail,
} from "@/app/services/validations/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import Loader from "@/app/components/Loader/Loader";
import { AiOutlineCamera } from "react-icons/ai";

const Profile = () => {
  const { state } = userValue();
  const [, setSelectedLocationValue] = useState("");
  const [profileImgFile, setProfileImageFile] = useState("");
  const [imagedata, setImageData] = useState(null);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ProfileUserSchema>({
    resolver: zodResolver(MainUserSchema),
  });
  const [isHovered, setIsHovered] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handlePictureClick = () => {
    // Trigger the hidden file input
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handlePhotoStateChange = (event: any) => {
    const file = event?.target?.files[0];
    setImageData(file);
    setProfileImageFile(URL.createObjectURL(file));
  };

  const handleProfileEdit = async (data: any) => {
    const formData = new FormData();
    const profileData = JSON.stringify({
      anonname: data?.anonname,
      email: state?.user?.data.email,
      location: state?.user?.data.location,
    });
    formData.append("profileData", profileData);
    imagedata ? formData.append("photo", imagedata) : null;
    try {
      const editdata = await editUsers(formData);
      console.log(editdata);
      if (editdata?.status === 200) {
        toast.success("Account details updated successfully!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (state?.user?.data?.location) {
      setSelectedLocationValue(state.user.data.location);
    }
  }, []);

  // console.log(profileImgFile);

  return (
    
    <div className={styles.profilewrapper}>
      <h2>General Settings</h2>
      <form onSubmit={handleSubmit(handleProfileEdit)}>
        <div>
          <div className={styles.label}>
            <label>Anon Username</label>
          </div>
          <input
            defaultValue={state?.user?.data.anonname}
            className={styles.inputStyle}
            {...register("anonname")}
          />
          {errors.anonname && (
            <span className={styles.spanclass}>{errors.anonname.message}</span>
          )}
        </div>
        <div>
          <div className={styles.label}>
            <label>Email</label>
          </div>
          <InputField
            type="email"
            defaultValue={decryptEmail(state?.user?.data?.email ?? "")}
            disabled={true}
            // {...register("email")}
          />
          {errors.email && (
            <span className={styles.sspanclass}>{errors.email.message}</span>
          )}
        </div>
        <div>
          <div className={styles.label}>
            <label>Profile Photo</label>
          </div>
          <div
            className={`${styles.imgdiv} ${isHovered ? "hovered" : ""}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {!state?.user?.data.photo ? (
              <Image
                src={!profileImgFile ? profileimg : profileImgFile}
                className={styles.profileimg}
                alt="user_image"
                width={60}
                height={60}
                // {...register("photo")}
              />
            ) : (
              <Image
                src={
                  state?.user?.data?.photo
                    ? state?.user?.data?.photo
                    : profileImgFile
                }
                className={styles.profileimg}
                alt="user_image"
                width={60}
                height={60}
                // {...register("photo")}
              />
            )}

            {isHovered && (
              <div className={styles.overlay} onClick={handlePictureClick}>
                <AiOutlineCamera className={styles.cameraicon} />
              </div>
            )}
            <div className={styles.profileupload}>
              <input
                type="file"
                accept="image/*"
                name="logo"
                onChange={handlePhotoStateChange}
                ref={fileInputRef}
                title="Dimensions 180 X 180"
              />
            </div>
            <div className={styles.icondiv}>
              <MdOutlineDeleteOutline className={styles.deleteicon} />
            </div>
          </div>
        </div>
        <div>
          <div className={styles.label}>
            <label>Location</label>
          </div>
          <InputField
            defaultValue={state?.user?.data?.location}
            disabled={true}
            // {...register("location")}
          />
          {errors.location && (
            <span className={styles.spanclass}>{errors.location.message}</span>
          )}
          <div className={styles.btndiv}>
            <Button primary type="submit">
              {isSubmitting ? <Loader color="#fff" /> : "Update"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Profile;
