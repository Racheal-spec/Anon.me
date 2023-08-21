import BorderCard from "@/app/components/BorderCard/BorderCard";
import styles from "./page.module.css";

import Trending from "@/app/components/Trending/Trending";
import { userValue } from "@/app/context/userContext";
import ShowHomeHeading from "./ShowHomeHeadifng";

export default function Home() {
  return (
    <main className={styles.main}>
      <ShowHomeHeading />
    </main>
  );
}
