import axios from "axios";
const backendUrl = "http://localhost:3000/api/v1";

export const createTask = async (task) => {
    try {
        const reqUrl = `${backendUrl}/task/tasks`;
        const reqPayload = task;
        const token = localStorage.getItem('token'); // Replace 'token' with the key you used to store the token
        const response = await axios.post(reqUrl, reqPayload, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
        alert("Task not created")
        // toast with custom message for clients
    }
};


export const getAllTasks = async () => {
    try {
        const reqUrl = `${backendUrl}/task/tasks`;
        const token = localStorage.getItem('token'); // Replace 'token' with the key you used to store the token
        const response = await axios.get(reqUrl, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
        alert("Cannot the fetch the tasks")
        // toast with custom message for clients
    }
};

export const getTask = async ({ id }) => {
    try {
        const reqUrl = `${backendUrl}/task/tasks/${id}`;
        const response = await axios.get(reqUrl);
        return response.data;
    } catch (error) {
        console.log(error);
        alert("Cannot the fetch the task")

        // toast with custom message for clients
    }
};

export const updateTask = async (item) => {
    try {
        console.log(item)
        const reqUrl = `${backendUrl}/task/tasks/${item.id}`;
        const token = localStorage.getItem('token'); // Replace 'token' with the key you used to store the token
        const response = await axios.put(reqUrl,item.body, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
        alert("Cannot the update the task")

        // toast with custom message for clients
    }
};

export const updateCompletedChecklist = async (item) => {
    try {
        console.log(item)
        const reqUrl = `${backendUrl}/task/tasks/${item.id}/checklist`;
        const token = localStorage.getItem('token'); // Replace 'token' with the key you used to store the token
        const response = await axios.put(reqUrl,item.checklist, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.log(error);
        alert("Cannot the update the checklist")

        // toast with custom message for clients
    }
};

export const analytics = async () => {
    try {
        console.log("anal")
        const reqUrl = `${backendUrl}/task/tasks/analytics`;
        console.log({reqUrl})
        const token = localStorage.getItem('token'); // Replace 'token' with the key you used to store the token
        const response = await axios.get(reqUrl, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.log(error);
        alert("Cannot the fetch the analytics")

        // toast with custom message for clients
    }
};

export const filterTask = async (filter) => {
    try {
        console.log("anal")
        const reqUrl = `${backendUrl}/task/tasks/filter`;
        console.log({reqUrl})
        const reqPayload = { period:filter };
        console.log(reqPayload)
        const token = localStorage.getItem('token'); // Replace 'token' with the key you used to store the token
        const response = await axios.put(reqUrl, reqPayload, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.log(error);
        alert("Cannot the fetch the details")

        // toast with custom message for clients
    }
};

export const deleteTask = async ({id}) => {
    try {
        const reqUrl = `${backendUrl}/task/tasks/${id}`;
        const token = localStorage.getItem('token'); // Replace 'token' with the key you used to store the token
        const response = await axios.delete(reqUrl, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
        alert("Cannot the delete the tasks")

        // toast with custom message for clients
    }
};
