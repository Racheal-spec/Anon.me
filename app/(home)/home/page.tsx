"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { cookies } from "next/headers";
import { useEffect } from "react";
import { userapi } from "@/app/services/api";

export default async function Home() {
  const handleuser = async () => {
    let data = await userapi();
    console.log(`handleuser: ${data}`);
  };
  useEffect(() => {
    handleuser();
  }, []);
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <h2 className={styles.center}>Anon.me</h2>
      </div>
    </main>
  );
}
