const commonURL = `http://localhost:3509`;
const commonBackendURL = `http://localhost:11243`;

export const getUserTasks = async (userName) => {
    const resp = await fetch(`${commonBackendURL}/users/${userName}`)
    const data = await resp.json();
    console.log(data);
    const userInfo = data[0];
    return { taskList: userInfo.userTasks, userId: userInfo.userId, userName: userInfo.userName, _id: userInfo._id };
    // return data;
}

export const getTask = async (id) => {
    const resp = await fetch(`${commonBackendURL}/tasks/${id}`);
    const data = await resp.json();
    return data;
}

const fetchTasks = async () => {
    const response = await fetch(`${commonURL}/tasks?_sort=id&_order=asc`);
    const tasks = await response.json();
    return tasks;
};

export const updateTask = async (updatedItem) => {
    console.log('updateTask', updatedItem);
    const id = updatedItem._id;
    const response = await fetch(`${commonBackendURL}/tasks/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedItem),
    });
    const data = await response.json();
    return data;
};

export const deleteItem = async (id) => {
    console.log(id);
    const resp = await fetch(`${commonBackendURL}/tasks/${id}`, { method: "DELETE" });
    return resp.json();
};

export const updateUserTasks = async (userName, userId, payload) => {
    const resp = await fetch(`${commonBackendURL}/users/${userName}/${userId}`, {
        method: "PUT",
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": "application/json",
        }
    })
    const data = await resp.json();
    console.log(data);
    return data;
}

const refreshCount = (taskList) => {
    const prioCount = priorityCount(taskList);
    const compCount = completedCount(taskList);
    const remCount = remainingCount(taskList);
    return {
        priorityCount: prioCount,
        completedCount: compCount,
        remainingCount: remCount
    }
}

const priorityCount = (taskList) => {
    return taskList.reduce((acc, curr) => {
        return acc + (curr.priority && !curr.completed ? 1 : 0);
    }, 0)
};

const completedCount = (taskList) => {
    return taskList.reduce((acc, curr) => {
        return acc + (curr.completed ? 1 : 0);
    }, 0)
};

const remainingCount = (taskList) => {
    return taskList.reduce((acc, curr) => {
        return acc + (curr.completed ? 0 : 1);
    }, 0)
};

export { fetchTasks }