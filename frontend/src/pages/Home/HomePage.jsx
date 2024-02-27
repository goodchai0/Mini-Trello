import React from "react";
import { Home }from "../../components/Home/Home";
import { RightBar } from "../../components/RightBar/RightBar";
import styles from "./HomePage.module.css";
export default function HomePage() {
    return (
        <div className={styles.div_main}>
            <div className={styles.left_main}>
                <RightBar selected={'board'}/>
            </div>
            <div className={styles.right_main}>
                <Home />
            </div>
        </div>
    );
}