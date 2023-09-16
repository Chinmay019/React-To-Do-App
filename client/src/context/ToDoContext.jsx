import { createContext, useState, useEffect, useReducer } from "react";
import TodoReducer from "./ToDoReducer";
export const ToDoContext = createContext();

export const ToDoProvider = ({ children }) => {
  const commonURL = `http://localhost:3509`;
  const initialState = {
    taskList: [],
    filteredTaskList: [],
    loading: false,
    isLoggedIn: false,
    user_OId: null,
    userName: null,
    userId: null,
    isExistingUser: false,
    priority: null,
    remaining: null,
    completed: null,
    currentView: "all",
    itemEdit: {
      item: {},
      edit: false,
    },
  };

  const [state, dispatch] = useReducer(TodoReducer, initialState);
  // const [taskList, setTaskList] = useState([]);
  // const [filteredTaskList, setFilteredTaskList] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [userName, setUserName] = useState();
  // const [priority, setPriority] = useState();
  // const [remaining, setRemaining] = useState();
  // const [completed, setCompleted] = useState();
  // const [currentView, setCurrentView] = useState("all");
  // const [itemEdit, setItemEdit] = useState({
  //   item: {},
  //   edit: false,
  // });

  // useEffect(() => {
  //   window.onbeforeunload = function () {
  //     setCurrentView("all");
  //   };

  //   return () => {
  //     window.onbeforeunload = null;
  //   };
  // }, [state.currentView]);

  // useEffect(() => {
  //   priorityCount();
  //   completedCount();
  //   remainingCount();
  //   filterTasks();
  // }, [taskList, state.currentView]);

  // fetch tasks
  // const fetchTasks = async () => {
  //   setLoading(true);
  //   const response = await fetch(`${commonURL}/tasks?_sort=id&_order=asc`);
  //   const tasks = await response.json();
  //   setTaskList(tasks);
  //   setLoading(false);
  // };

  // const addItem = async (newTodo) => {
  //   const response = await fetch(`${commonURL}/tasks`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(newTodo),
  //   });
  //   const data = await response.json();
  //   return data;
  //   // setTaskList([data, ...taskList]);
  // };

  // const editItem = (item) => {
  //   setItemEdit({
  //     item,
  //     edit: true,
  //   });
  // };

  // const completeItem = async (id, item) => {
  //   item.completed = !item.completed;
  //   updateTask(id, item);
  // };

  // const updatePriority = (id) => {
  //   setTaskList(
  //     taskList.map((task) => {
  //       if (task.id === id) {
  //         task.priority = !task.priority;
  //       }
  //       return task;
  //     })
  //   );
  // };

  // const updateState = (item) => {
  //   // if item is not completed => only then change priority
  //   // do not un-complete completed tasks
  //   if (!item.completed) {
  //     updatePriority(item.id);
  //     updateTask(item.id, item);
  //   }
  // };

  // const filterTasks = (value = currentView) => {
  //   let filteredList = taskList.filter((task) => {
  //     if (value == "all") {
  //       return task;
  //     } else if (value == "priority") {
  //       return task.priority == true && !task.completed;
  //     } else if (value == "completed") {
  //       return task.completed == true;
  //     } else if (value == "remaining") {
  //       return !task.completed;
  //     }
  //   });
  //   setFilteredTaskList([...filteredList]);
  // };

  // const sortFunc = () => {
  //   const priorityTasks = taskList.filter(
  //     (task) => (task.priority && !task.completed) == true
  //   );
  //   const completedTasks = taskList.filter((task) => task.completed == true);
  //   const nonPriorityNonCompletedTasks = taskList.filter(
  //     (task) => !(task.priority || task.completed) == true
  //   );
  //   setTaskList([
  //     ...priorityTasks,
  //     ...nonPriorityNonCompletedTasks,
  //     ...completedTasks,
  //   ]);
  // };

  return (
    <ToDoContext.Provider
      value={{
        ...state,
        dispatch,
        // deleteItem,
        // addItem,
        // completeItem,
        // editItem,
        // updateState,
        // filterTasks,
      }}
    >
      {children}
    </ToDoContext.Provider>
  );
};

export default ToDoContext;
