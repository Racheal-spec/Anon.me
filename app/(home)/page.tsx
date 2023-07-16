import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <h2 className={styles.center}>Anon.me</h2>
      </div>
    </main>
  );
}
