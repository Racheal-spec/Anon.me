import React from "react";
import styles from "./page.module.css";
import Button from "@/app/uikits/Button/button";
const Account = () => {
  return (
    <div className={styles.cardWrapper}>
      <div className={styles.cardcontent}>
        <h4>Permanently Delete Account</h4>
        <p>
          If you decide to delete your account on Anon, your personal data will
          be gone for good. We can't bring it back once it's deleted, so please
          make sure you're absolutely certain before taking this step.
        </p>
        <div className={styles.btnDiv}>
          <div>
            {" "}
            <Button deepPinkOutline>Cancel</Button>
          </div>
          <Button primary>Delete</Button>
        </div>
      </div>
    </div>
  );
};

export default Account;
