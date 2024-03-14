import React, { useEffect } from 'react';
import styles from "./Setting.module.css";
import password from '../../assets/password.png';
import eye from '../../assets/eye.png';
import hide from '../../assets/hide.svg';
import man from '../../assets/man.png';
import { useNavigate } from "react-router";
import { useState } from "react";
import { updateUser } from '../../apis/auth';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Setting = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [data, setData] = useState({
        name: localStorage.getItem('userName'),
        oldPassword: "",
        newPassword: "",
    });

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await updateUser({ ...data });
            localStorage.setItem("userName", data.name);
            if (response.success) {
                toast.success("Profile Updated");
            } else {
                toast.error("Failed to update profile");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error("Failed to update profile. Check your details (old password)");
        }
    };

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
        }
    }, []);

    return (
        <>
            <div className={styles.header}>
                Setting
            </div>
            <div>
                <div className={styles.container}>
                    <div className={styles.input_box}>
                        <img src={man} alt="User" />
                        <input
                            className={styles.input}
                            name="name"
                            value={data.name}
                            onChange={handleChange}
                            type="text"
                            placeholder="Name"
                        />
                    </div>

                    <div className={styles.input_box}>
                        <img src={password} alt="Password" />
                        <input
                            className={styles.input}
                            name="oldPassword"
                            value={data.oldPassword}
                            onChange={handleChange}
                            type={showPassword ? "text" : "password"}
                            placeholder="Old Password"
                        />
                        <img src={showPassword ? hide : eye} alt="Toggle Password Visibility" className={styles.eye} onClick={() => setShowPassword(!showPassword)} />
                    </div>
                    <div className={styles.input_box}>
                        <img src={password} alt="Password" />
                        <input
                            className={styles.input}
                            name="newPassword"
                            value={data.newPassword}
                            onChange={handleChange}
                            type={showNewPassword ? "text" : "password"}
                            placeholder="New Password"
                        />
                        <img src={showNewPassword ? hide : eye} alt="Toggle Password Visibility" className={styles.eye} onClick={() => setShowNewPassword(!showNewPassword)} />
                    </div>
                    <button onClick={handleSubmit} className={styles.button}>
                        Update
                    </button>
                </div>
            {/* <ToastContainer /> */}
            </div>
        </>
    );
};

export default Setting;
