import axios from "axios";
const backendUrl = "http://localhost:3000/api/v1";

export const registerUser = async ({ name, email, mobile, password }) => {
    try {
        const reqUrl = `${backendUrl}/auth/register`;
        const reqPayload = { name, email, mobile, password };
        const response = await axios.post(reqUrl, reqPayload);
        return response.data;
    } catch (error) {
        alert("Registration Failed!");
        // toast with custom message for clients
    }
};

export const loginUser = async ({ email, password }) => {
    try {
        const reqUrl = `${backendUrl}/auth/login`;
        const reqPayload = { email, password };
        const response = await axios.post(reqUrl, reqPayload);
        return response.data;
    } catch (error) {
        alert("Check your account details!");
    }
};

export const updateUser = async ({ name, oldPassword, newPassword }) => {
    try {
        const reqUrl = `${backendUrl}/auth/update`;
        const reqPayload = { name, oldPassword, newPassword };
        const token = localStorage.getItem('token');
        const response = await axios.post(reqUrl, reqPayload, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log(response.data)
        return response.data;
    } catch (error) {
        alert("Check the detials");
    }
};
