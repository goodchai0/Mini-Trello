import React from "react";
import Register from "../../components/Register/Register";
import loginImage from "../../assets/login.png";
import styles from "./RegisterPage.module.css";
export default function RegisterPage() {
    return (
        <div style={{display: "flex",overflowY:"hidden" }}>
            <div className={styles.left} style={{ width: "50vw",backgroundColor:"#17A2B8",overflow:"hidden" }}>
            <img
                src={loginImage}
            />
            <h2>Welcome aboard my friend</h2>
            <p>just a couple of clicks and we start</p>
            </div>
            <Register />
        </div>
    );
}
