"use client";
import React, { useState } from "react";
import styles from "./page.module.css";
import Button from "@/app/uikits/Button/button";
import Loader from "@/app/components/Loader/Loader";
import Modal from "@/app/components/Modal/Modal";
import { userValue } from "@/app/context/userContext";
import { toast } from "react-toastify";
import { deleteUser } from "@/app/context/Actions/Actions";
import { useRouter } from "next/navigation";
import { HOME } from "@/app/Routes/RoutesUrl";

const Account = () => {
  const [accountdelete, showAcctDeleteModal] = useState(false);
  const [loadingdelete, setLoadingDelete] = useState(false);
  const { state } = userValue();
  const router = useRouter();

  const handleAcctDeletemodal = () => {
    showAcctDeleteModal(!accountdelete);
  };

  const handleDeleteUserData = async () => {
    setLoadingDelete(true);
    try {
      if (state?.user?.data) {
        let deleteuser = await deleteUser();
        if (deleteuser?.status === 200) {
          toast.success("Your account has been successfully deleted!");
          router.replace(HOME);
          setLoadingDelete(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={styles.cardWrapper}>
      <div className={styles.cardcontent}>
        <h4>Permanently Delete Account</h4>
        <p>
          If you decide to delete your account on Penbuddy, your personal data will
          be gone for good. We can't bring it back once it's deleted, so please
          make sure you're absolutely certain before taking this step.
        </p>
        <div className={styles.btnDiv}>
          <div>
            {" "}
            <Button deepPinkOutline>Cancel</Button>
          </div>
          <Button primary onClick={handleAcctDeletemodal}>
            Delete
          </Button>
        </div>
      </div>

      {/************************DELETE MODAL ****************************/}
      {accountdelete && (
        <Modal handlefunction={() => showAcctDeleteModal(false)}>
          <div className={styles.modal}>
            <h3>Delete Story</h3>
            <p>
              Are you sure you want to delete this story? Deleting this story is
              permanent and cannot be undone.
            </p>
            <div className={styles.btnDiv}>
              <div>
                {" "}
                <Button
                  deepPinkOutline
                  onClick={() => showAcctDeleteModal(false)}
                >
                  Cancel
                </Button>
              </div>
              <Button primary onClick={handleDeleteUserData}>
                {loadingdelete ? (
                  <div className={styles.deletediv}>
                    <Loader color="#fff" />
                    <span>Deleting</span>
                  </div>
                ) : (
                  " Delete Account"
                )}
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Account;
