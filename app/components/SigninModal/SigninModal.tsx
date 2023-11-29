import Button from "@/app/uikits/Button/button";
import React from "react";
import Modal from "../Modal/Modal";
import { useRouter } from "next/navigation";
import { HOME, LOGIN } from "@/app/Routes/RoutesUrl";
import styles from "./SigninModal.module.css";
import { TfiWrite } from "react-icons/tfi";
import Link from "next/link";
import { UseResizeScreen } from "@/app/hooks/ResizeScreen";

const SigninModal = ({
  handlefunction,
  modalstate,
}: {
  handlefunction: () => void;
  modalstate: boolean;
}) => {
  let router = useRouter();
  const isMobile = UseResizeScreen();
  return (
    <div className={styles.signmodalWrapper}>
      {modalstate && (
        <Modal handlefunction={handlefunction}>
          <div className={styles.modal}>
            <Link href={HOME}>
              <div>
                <TfiWrite
                  size={isMobile ? "1.0em" : "1.3em"}
                  className={styles.logoicon}
                />
              </div>
            </Link>
            <h2>Sign in to Penbuddy</h2>
            <p>
              First time at penbuddy? Sign in to join a community where you can
              openly share your thoughts and stories
            </p>

            <Button primary onClick={() => router.push(LOGIN)}>
              Sign in to Penbuddy
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default SigninModal;
