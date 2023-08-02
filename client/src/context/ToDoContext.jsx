import { createContext, useState, useEffect } from "react";

export const ToDoContext = createContext();

export const ToDoProvider = ({ children }) => {
  const commonURL = `http://localhost:3509`;
  const [taskList, setTaskList] = useState([]);
  const [filteredTaskList, setFilteredTaskList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState();
  const [priority, setPriority] = useState();
  const [remaining, setRemaining] = useState();
  const [completed, setCompleted] = useState();
  const [currentView, setCurrentView] = useState("all");
  const [itemEdit, setItemEdit] = useState({
    item: {},
    edit: false,
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    window.onbeforeunload = function () {
      setCurrentView("all");
    };

    return () => {
      window.onbeforeunload = null;
    };
  }, [currentView]);

  useEffect(() => {
    priorityCount();
    completedCount();
    remainingCount();
    filterTasks();
  }, [taskList, currentView]);

  // fetch tasks
  const fetchTasks = async () => {
    setLoading(true);
    const response = await fetch(`${commonURL}/tasks?_sort=id&_order=asc`);
    const tasks = await response.json();
    setTaskList(tasks);
    setLoading(false);
  };

  const priorityCount = () => {
    setPriority(
      taskList.reduce((acc, curr) => {
        return acc + (curr.priority && !curr.completed ? 1 : 0);
      }, 0)
    );
  };

  const completedCount = () => {
    setCompleted(
      taskList.reduce((acc, curr) => {
        return acc + (curr.completed ? 1 : 0);
      }, 0)
    );
  };

  const remainingCount = () => {
    setRemaining(
      taskList.reduce((acc, curr) => {
        return acc + (curr.completed ? 0 : 1);
      }, 0)
    );
  };

  const deleteItem = async (id) => {
    await fetch(`${commonURL}/tasks/${id}`, { method: "DELETE" });
    setTaskList(
      taskList.filter((task) => {
        return task.id !== id;
      })
    );
  };

  const addItem = async (newTodo) => {
    const response = await fetch(`${commonURL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    });
    const data = await response.json();
    setTaskList([data, ...taskList]);
  };

  const editItem = (item) => {
    setItemEdit({
      item,
      edit: true,
    });
  };

  const completeItem = async (id, item) => {
    item.completed = !item.completed;
    updateTask(id, item);
  };

  const updateTask = async (id, updatedItem) => {
    const response = await fetch(`${commonURL}/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedItem),
    });

    const data = await response.json();

    setTaskList(
      taskList.map((task) => (task.id === id ? { ...task, ...data } : task))
    );
  };

  const updatePriority = (id) => {
    setTaskList(
      taskList.map((task) => {
        if (task.id === id) {
          task.priority = !task.priority;
        }
        return task;
      })
    );
  };

  const updateState = (item) => {
    // if item is not completed => only then change priority
    // do not un-complete completed tasks
    if (!item.completed) {
      updatePriority(item.id);
      updateTask(item.id, item);
    }
  };

  const filterTasks = (value = currentView) => {
    let filteredList = taskList.filter((task) => {
      if (value == "all") {
        return task;
      } else if (value == "priority") {
        return task.priority == true && !task.completed;
      } else if (value == "completed") {
        return task.completed == true;
      } else if (value == "remaining") {
        return !task.completed;
      }
    });
    setFilteredTaskList([...filteredList]);
  };

  const sortFunc = () => {
    const priorityTasks = taskList.filter(
      (task) => (task.priority && !task.completed) == true
    );
    const completedTasks = taskList.filter((task) => task.completed == true);
    const nonPriorityNonCompletedTasks = taskList.filter(
      (task) => !(task.priority || task.completed) == true
    );
    setTaskList([
      ...priorityTasks,
      ...nonPriorityNonCompletedTasks,
      ...completedTasks,
    ]);
  };

  return (
    <ToDoContext.Provider
      value={{
        taskList,
        deleteItem,
        addItem,
        completeItem,
        editItem,
        itemEdit,
        updateTask,
        updateState,
        filterTasks,
        filteredTaskList,
        completed,
        remaining,
        priority,
        currentView,
        setCurrentView,
        loading,
        isLoggedIn,
        setIsLoggedIn,
        userName,
        setUserName,
      }}
    >
      {children}
    </ToDoContext.Provider>
  );
};

export default ToDoContext;
