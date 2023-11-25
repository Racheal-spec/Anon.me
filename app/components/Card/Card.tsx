import { CardProp } from "@/app/Types/global";
import React, { FC } from "react";
import styles from './Card.module.css'

const Card: FC<CardProp> = ({ children, className }) => {
  return (
    <div>
    
      <div className={styles.container}>
  <div className={styles.card}>
    <div className={styles.imgcontainer}></div>
    <div className={styles.cardcontent}>
      <h2>Hello</h2>
      <h1>From the Other Side of the World</h1>
      <p className={styles.excerpt}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia odio dolorem amet, sunt magnam asperiores exercitationem consequuntur? Molestias asperiores rerum doloremque reiciendis.</p>
      <p className={styles.author}>By Jrom</p>
    </div>
  </div>
</div>
    </div>
  );
};

export default Card;
