import React from "react";
import { RightBar } from "../../components/RightBar/RightBar";
import styles from "./Settings.module.css";
import Setting  from "../../components/Setting/Setting";
export const Settings = () => {
    return (
        <div className={styles.div_main}>
            <div className={styles.left_main}>
                <RightBar selected={'settings'}/>
            </div>
            <div className={styles.right_main}>
                <Setting/>
            </div>
        </div>
    );
}