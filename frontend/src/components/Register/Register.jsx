import { useState } from "react";
import styles from "./Register.module.css";
import { useNavigate } from "react-router";
import { registerUser } from "../../apis/auth";
import email from '../../assets/email.png';
import password from '../../assets/password.png';
import eye from '../../assets/eye.png';
import hide from '../../assets/hide.svg';
import man from '../../assets/man.png';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
const Register = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        confirm_password: "" // Add confirm_password to the state
    });

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!data.name || !data.email || !data.password || !data.confirm_password) { // Check all fields
            toast.error("Please fill in all fields.");
            return;
        }

        if (!validateEmail(data.email)) {
            toast.error("Please enter a valid email address.");
            return;
        }

        if (data.confirm_password !== data.password) { // Check password confirmation
            toast.error("Confirm password and password don't match.");
            return;
        }
        

        let response = await registerUser({ ...data });
        console.log(response)
        if (response.success) {
            response = response.data; // Assuming response contains data object
            localStorage.setItem("token", response.token);
            localStorage.setItem("userName", response.name);
            navigate("/"); // Redirect to home page after successful registration
        }
        else  if (!response.success){
           console.log(response.message);toast.error(response.message)
        }
    };

    const redirectToLoginPage = () => {
        navigate("/login");
    };

    // Email format validation function
    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.h1}>Register</h1>
            <div className={styles.input_box}>
                <img src={man} alt="man" />
                <input
                    className={styles.input}
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                    type="text"
                    placeholder="Name"
                ></input>
            </div>

            <div className={styles.input_box}>
                <img src={email} alt="email" />
                <input
                    className={styles.input}
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    type="email"
                    placeholder="Email"
                ></input>
            </div>

           <div className={styles.input_box}>
                <img src={password} alt="password" />
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
            
            <div className={styles.input_box}>
                <img src={password} alt="confirm_password" />
                <input
                    className={styles.input}
                    name="confirm_password"
                    value={data.confirm_password}
                    onChange={handleChange}
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                />
                <img src={showConfirmPassword ? hide : eye} className={styles.eye} alt="eye" onClick={() => setShowConfirmPassword(!showConfirmPassword)} />
            </div>

            <button onClick={handleSubmit} className={styles.button}>
                Create Account
            </button>
            <p className={styles.footer}>
                Have an account?
            </p>
            <button onClick={redirectToLoginPage} className={styles.button_login}>
                Log in
            </button>
        </div>
    );
};

export default Register;
