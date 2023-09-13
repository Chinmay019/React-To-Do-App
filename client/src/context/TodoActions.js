const commonURL = `http://localhost:3509`;
const commonBackendURL = `http://localhost:11243`;

export const getUser = async (userName) => {
    const resp = await fetch(`${commonBackendURL}/users/${userName}`)
    const data = await resp.json();
    return data;
}

export const getTask = async (id) => {
    const resp = await fetch(`${commonBackendURL}/tasks/${id}`);
    const data = await resp.json();
    return data;
}

export const getUserTasks = async (userName) => {
    const data = await getUser(userName);
    const userInfo = data[0];
    console.log(userInfo);
    const taskIDsList = userInfo.tasks;
    const taskList = await Promise.all(taskIDsList.map(async (id) => {
        const data = await getTask(id);
        return data;
    }));
    console.log(taskList);
    // userInfo.taskList = taskList;
    // return userInfo;
    return taskList;
}

const fetchTasks = async () => {
    const response = await fetch(`${commonURL}/tasks?_sort=id&_order=asc`);
    const tasks = await response.json();
    return tasks;
};

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