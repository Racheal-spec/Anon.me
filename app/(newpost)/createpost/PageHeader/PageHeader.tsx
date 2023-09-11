import Button from "@/app/uikits/Button/button";
import React from "react";
import styles from "./PageHeader.module.css";
import { TfiWrite } from "react-icons/tfi";
import { UseResizeScreen } from "@/hooks/ResizeScreen";
import { FiDelete } from "react-icons/fi";
import { CiSaveDown1 } from "react-icons/ci";
import Loader from "@/app/components/Loader/Loader";

type PageHeaderProp = {
  handleFormSubmit: () => void;
  handlePublished: () => void;
  loading: boolean;
  isPublishLoading: boolean;
};
const PageHeader = ({
  handleFormSubmit,
  handlePublished,
  loading,
  isPublishLoading,
}: PageHeaderProp) => {
  const isMobile = UseResizeScreen();
  return (
    <div>
      <div className={styles.headerWrapper}>
        <div>
          <TfiWrite
            size={isMobile ? "1.0em" : "1.3em"}
            className={styles.logoicon}
          />
        </div>
        <div className={styles.publishDiv}>
          <div className={styles.draftDiv} onClick={handleFormSubmit}>
            {loading ? (
              <Loader color="#25CD4A" />
            ) : (
              <CiSaveDown1 color="green" fontSize="1.4rem" />
            )}
            <p>Save Draft</p>
          </div>
          <div>
            <Button primary onClick={handlePublished}>
              {isPublishLoading && (
                <div className={styles.loadingIcon}>
                  <Loader color="#333333" />
                </div>
              )}
              Publish
            </Button>
          </div>
          <hr className={styles.divider} />
          <div>
            <FiDelete className={styles.deleteIcon} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
