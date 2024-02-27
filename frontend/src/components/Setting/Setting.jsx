import React from 'react'
import styles from "./Setting.module.css";
import password from '../../assets/password.png';
import eye from '../../assets/eye.png';
import man from '../../assets/man.png';
import { useNavigate } from "react-router";
import { useState } from "react";
import { updateUser } from '../../apis/auth';

const Setting = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    const [data, setData] = useState({
        name: "",
        oldPassword: "",
        newPassword: "",
    });

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        let response=await updateUser({ ...data });
        localStorage.setItem("userName", data.name);
        if(response.success)alert("Profile Updated")

    };


  return (
    <>
    <div className={styles.header}>
        Setting
    </div>
    <div>
    <div className={styles.container}>
            <div className={styles.input_box}>
                <img src={man}/>
                <input
                    className={styles.input}
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                    type={"text"}
                    placeholder="Name"
                ></input>
            </div>
            
           <div className={styles.input_box}>
            <img src={password}/>
            <input
                className={styles.input}
                name="oldPassword"
                value={data.oldPassword}
                onChange={handleChange}
                type={showPassword ? "text" : "password"}
                placeholder="Old Password"
            />
            <img src={eye} className={styles.eye} onClick={() => setShowPassword(!showPassword)} />
        </div>
        <div className={styles.input_box}>
            <img src={password}/>
            <input
                className={styles.input}
                name="newPassword"
                value={data.newPassword}
                onChange={handleChange}
                type={showNewPassword ? "text" : "password"}
                placeholder="New Password"
            />
            <img src={eye} className={styles.eye} onClick={() => setShowNewPassword(!showNewPassword)} />
        </div>
            <button onClick={handleSubmit} className={styles.button}>
                Update
            </button>
        </div>
    </div>
    </>
  )
}

export default Setting;