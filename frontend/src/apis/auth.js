import axios from "axios";
const backendUrl = "https://www-amitkewot-gmail-com-cuvette-final.onrender.com/api/v1";
// const backendUrl = "http://localhost:3000/api/v1";


export const registerUser = async ({ name, email, mobile, password }) => {
        try {

        const reqUrl = `${backendUrl}/auth/register`;
        const reqPayload = { name, email, mobile, password };
        const response = await axios.post(reqUrl, reqPayload);
        return response.data;
        } catch (error) {
                console.error("Error occurred:", error);
                return { success: false, message: "Check your email, user might already exist"};
        }
        };

export const loginUser = async ({ email, password }) => {
        const reqUrl = `${backendUrl}/auth/login`;
        const reqPayload = { email, password };
    
        try {
            const response = await axios.post(reqUrl, reqPayload);
            console.log({response});
            return response.data;
        } catch (error) {
            console.error("Error occurred:", error);
            return { success: false, message: "Check your credentials"};
        }
    };

export const updateUser = async ({ name, oldPassword, newPassword }) => {
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
};
