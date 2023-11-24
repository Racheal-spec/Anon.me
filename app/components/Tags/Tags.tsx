import React from "react";
import styles from "./Tags.module.css";
import { useTagsValue } from "@/app/context/TagsContext";
import Link from "next/link";
import { TAGSDETAILS } from "@/app/Routes/RoutesUrl";

const Tags = () => {
  const { tagsstate } = useTagsValue();
  return (
    <section>
      <div>
        <h6 className={styles.tagsHeader}>TAGS</h6>
      </div>
      <p className={styles.desc}>All your set tags will appear here.</p>
      <div className={styles.tagWrapper}>
        {tagsstate &&
          tagsstate?.data?.map((tag, index) => (
            <div className={styles.tagdiv} key={index}>
              <Link href={TAGSDETAILS(tag?.id)}>
                <p>{tag?.title}</p>
              </Link>
            </div>
          ))}
      </div>
    </section>
  );
};

export default Tags;
