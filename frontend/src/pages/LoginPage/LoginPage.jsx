import { Login } from "../../components/Login/Login";
import loginImage from "../../assets/login.png";
import styles from "./LoginPage.module.css"

export const LoginPage = () => {
    return (
        <div style={{display: "flex",overflowY:"hidden" }}>
            <div className={styles.left} style={{ width: "50vw",backgroundColor:"#17A2B8",overflow:"hidden" }}>
            <img
                src={loginImage}
            />
            <h2>Welcome aboard my friend</h2>
            <p>just a couple of clicks and we start</p>
            </div>
            <Login />
        </div>
    );
};
