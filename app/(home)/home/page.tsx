import Image from "next/image";
import styles from "./page.module.css";
import { getUserFromCookie } from "@/app/services/Auth";
import { cookies } from "next/headers";
import { useEffect } from "react";
import { getUser } from "@/app/services/userdata";

export default async function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <h2 className={styles.center}>Anon.me</h2>
      </div>
    </main>
  );
}
