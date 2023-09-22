"use client";
import React from "react";
import styles from "./page.module.css";
import MainTab from "@/app/components/Tabs/MainTab/MainTab";
import TabsTitle from "@/app/components/Tabs/TabsTitle/TabsTitle";
import TabsBody from "@/app/components/Tabs/TabsBody/TabsBody";
const Stories = () => {
  return (
    <div className={styles.storieswrapper}>
      <MainTab>
        <TabsBody title="Stories">
          <div>Stories</div>
        </TabsBody>
        <TabsBody title="Published">
          <div>Published</div>
        </TabsBody>
        <TabsBody title="Deleted">
          <div>Deleted</div>
        </TabsBody>
      </MainTab>
    </div>
  );
};

export default Stories;
