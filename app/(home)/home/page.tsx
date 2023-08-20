import BorderCard from "@/app/components/BorderCard/BorderCard";
import styles from "./page.module.css";
import { MdArrowRightAlt } from "react-icons/md";
import Trending from "@/app/components/Trending/Trending";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.fakeBtnWrapper}>
        <div>
          <p>Join Anon Blogging Community</p>
        </div>
        <div className={styles.arrowicon}>
          <MdArrowRightAlt color="white" fontSize={"1.5rem"} />
        </div>
      </div>
      <div className={styles.description}>
        <h2 className={styles.heading}>Blog Incognito: Your Voice, Your Way</h2>
        <p>
          Join an anonymous blogging community where you can openly share your
          stories, thoughts, and dreams without fear or judgment.
        </p>
      </div>
      <section className={styles.blogsection}>
        <h4 className={styles.headingh4}>Recent Blogs</h4>
        <div className={styles.blogGrid}>
          <BorderCard
            title="Return to Normal: Why I Have Been Gone and When New Material is Coming!"
            description="There are a few ways to co and using a time field. The time field could be collected at any frequency like per second, millisecond, minute, hour, etc. "
          />
          <div>
            <Trending
              title="Return to Normal: Why I Have Been Gone"
              name="Richard Norson"
              date="22.10.2022"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
