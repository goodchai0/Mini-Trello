import { useState } from "react";
import styles from "./Login.module.css";
import { useNavigate } from "react-router";
import { loginUser } from "../../apis/auth";
import email from '../../assets/email.png';
import password from '../../assets/password.png';
import eye from '../../assets/eye.png';

export const Login = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const [data, setData] = useState({ email: "", password: "" });
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        let response = await loginUser({ ...data });
        console.log(response)
        if(response.success){
            if (response.data) {
                response=response.data;
                localStorage.setItem("token", response.token);
                localStorage.setItem("userName", response.name);
                navigate("/");
            }
            return;
        }
        else {console.log(response.message);alert(response.message)}
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.h1}>Login</h1>
            <div className={styles.input_box}>
                <img src={email}/>
                <input
                    className={styles.input}
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    type={"email"}
                    placeholder="Email"
                ></input>
            </div>


        <div className={styles.input_box}>
            <img src={password}/>
            <input
                className={styles.input}
                name="password"
                value={data.password}
                onChange={handleChange}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
            />
            <img src={eye} className={styles.eye} onClick={() => setShowPassword(!showPassword)} />
        </div>
            <button onClick={handleSubmit} className={styles.button}>
                Login in
            </button>
            <p className={styles.footer}>
                Have no accont yet?
            </p>
            <button onClick={() => navigate("/register")} className={styles.button_register}>
                Register
            </button>
        </div>
    );
};
