import { createContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import TaskData from "../data";

export const ToDoContext = createContext();

export const ToDoProvider = ({ children }) => {
  const [taskList, setTaskList] = useState(TaskData);
  const [filteredTaskList, setFilteredTaskList] = useState(TaskData);
  const [priority, setPriority] = useState();
  const [remaining, setRemaining] = useState();
  const [completed, setCompleted] = useState();
  const [currentView, setCurrentView] = useState("all");
  const [itemEdit, setItemEdit] = useState({
    item: {},
    edit: false,
  });

  useEffect(() => {
    priorityCount();
    completedCount();
    remainingCount();
    filterTasks();
  }, [taskList, currentView]);

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

  const deleteItem = (id) => {
    setTaskList(
      taskList.filter((task) => {
        return task.id !== id;
      })
    );
  };

  const addItem = (newTodo) => {
    newTodo.id = uuidv4().toString();
    setTaskList([newTodo, ...taskList]);
  };

  const editItem = (item) => {
    setItemEdit({
      item,
      edit: true,
    });
  };

  const completeItem = (id) => {
    setTaskList(
      taskList.map((task) => {
        if (task.id === id) {
          task.completed = !task.completed;
        }
        return task;
      })
    );
  };

  const updateTitle = (id, newTitle) => {
    setTaskList(
      taskList.map((task) => {
        if (task.id === id) {
          task.title = newTitle;
        }
        return task;
      })
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
    setFilteredTaskList([...taskList]);
  };

  const updateState = (item) => {
    // if item is not completed => only then change priority
    // do not un-complete completed tasks
    if (!item.completed) {
      updatePriority(item.id);
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
        updateTitle,
        updateState,
        filterTasks,
        filteredTaskList,
        sortFunc,
        completed,
        remaining,
        priority,
        currentView,
        setCurrentView,
      }}
    >
      {children}
    </ToDoContext.Provider>
  );
};

export default ToDoContext;
