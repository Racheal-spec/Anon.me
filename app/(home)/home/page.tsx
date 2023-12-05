import styles from "./page.module.css";
import ShowHomeHeading from "./ShowHomeHeadifng";
import BlogHeader from "./BlogHeader";
import { Suspense } from "react";
import Loading from "../Loading";

const Home = () => {
  return (
    <main className={styles.main}>
      <Suspense fallback={<Loading />}>
        <BlogHeader />
        <div>
          <ShowHomeHeading />
        </div>
      </Suspense>
    </main>
  );
}
export default Home;
