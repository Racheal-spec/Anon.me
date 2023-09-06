import styles from "./page.module.css";
import ShowHomeHeading from "./ShowHomeHeadifng";
import BlogHeader from "./BlogHeader";

export default function Home() {
  return (
    <main className={styles.main}>
      <BlogHeader />
      <div>
        <ShowHomeHeading />
      </div>
    </main>
  );
}
