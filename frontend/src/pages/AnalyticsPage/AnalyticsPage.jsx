import React from "react";
import { RightBar } from "../../components/RightBar/RightBar";
import styles from "./AnalyticsPage.module.css";
import { Analytics } from "../../components/Analytics/Analytics";
export const AnalyticsPage = () => {
    return (
        <div className={styles.div_main}>
            <div className={styles.left_main}>
                <RightBar selected={'analytics'}/>
            </div>
            <div className={styles.right_main}>
                <Analytics/>
            </div>
        </div>
    );
}