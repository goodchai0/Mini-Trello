import { useState } from "react";
import styles from "./Login.module.css";
import { useNavigate } from "react-router";
import { loginUser } from "../../apis/auth";
import email from '../../assets/email.png';
import password from '../../assets/password.png';
import eye from '../../assets/eye.png';
import hide from '../../assets/hide.svg';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

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
        console.log(response.data)
        if(response.success){
            toast.success("Logged In")
            if (response.data) {
                response=response.data;
                localStorage.setItem("token", response.token);
                localStorage.setItem("userName", response.name);
                navigate("/");
            }
            return;
        }
        else{console.log(response.message);toast.error(response.message)}
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
            <img src={showPassword ? hide : eye} className={styles.eye} alt="eye" onClick={() => setShowPassword(!showPassword)} />

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
