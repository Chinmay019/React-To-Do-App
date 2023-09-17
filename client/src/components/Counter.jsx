import React, { useState, useContext, useEffect } from "react";
import ToDoContext from "../context/ToDoContext";
import { refreshCount } from "../context/TodoActions";
import List from "./List";

function Counter() {
  console.log("Counter");
  const {
    taskList,
    priority,
    remaining,
    completed,
    isLoggedIn,
    isExistingUser,
    dispatch,
    userName,
    currentView,
  } = useContext(ToDoContext);
  const [filter, setFilter] = useState(currentView);
  const [filteredList, setFilteredList] = useState(taskList);

  useEffect(() => {
    if (isLoggedIn) {
      if (!isExistingUser) {
        const getTaskList = async () => {
          dispatch({ type: "SET_LOADING", payload: true });
          const { userId, _id, taskList } = await getUserTasks(userName);
          console.log(data);
          dispatch({
            type: "SET_USER_ID",
            payload: { userId: userId, user_OId: _id },
          });
          dispatch({ type: "SET_TASKS_FROM_DB", payload: taskList });
          dispatch({ type: "SET_LOADING", payload: false });
        };
        getTaskList();
      }
    }
  }, []);

  useEffect(() => {
    setFilteredList(filterTasks(filter));
    handleClick(filter);
  }, [filter, isLoggedIn, taskList]);

  const filterTasks = (filter) => {
    const count = refreshCount(taskList);
    dispatch({ type: "SET_UPDATED_COUNT", payload: count });
    if (filter === "all") {
      return taskList;
    } else if (filter === "priority") {
      return taskList.filter(
        (task) => task.priority === "true" && task.completed === "false"
      );
    } else if (filter === "completed") {
      return taskList.filter((task) => task.completed === "true");
    } else if (filter === "remaining") {
      return taskList.filter((task) => task.completed === "false");
    }
  };

  const handleClick = (value) => {
    document.querySelector(`#${value}`).classList.add("active");
  };

  return (
    <div>
      <div className="info-class">
        <ul className="flex nav nav-pills nav-fill">
          <li className="flex-item nav-item">
            <a
              className="nav-link"
              data-bs-toggle="pill"
              role="pill"
              id="all"
              href="#"
              onClick={() => {
                document
                  .querySelector(`#${[filter]}`)
                  .classList.remove("active");
                if (filter !== "all") {
                  setFilter("all");
                }
              }}
            >
              All: {taskList.length}
            </a>
          </li>
          <li className="flex-item nav-item">
            <a
              className="nav-link"
              href="#remaining"
              id="remaining"
              role="pill"
              data-bs-toggle="pill"
              onClick={() => {
                if (filter !== "remaining") {
                  document
                    .querySelector(`#${[filter]}`)
                    .classList.remove("active");
                  setFilter("remaining");
                }
              }}
            >
              Remaining: {remaining}
            </a>
          </li>
          <li className="flex-item nav-item">
            <a
              className="nav-link"
              data-bs-toggle="pill"
              role="pill"
              id="priority"
              href="#priority"
              onClick={() => {
                if (filter !== "priority") {
                  document
                    .querySelector(`#${[filter]}`)
                    .classList.remove("active");
                  setFilter("priority");
                }
              }}
            >
              Priority: {priority}
            </a>
          </li>
          <li className="flex-item nav-item">
            <a
              className="nav-link"
              href="#completed"
              id="completed"
              data-bs-toggle="pill"
              role="pill"
              onClick={() => {
                if (filter !== "completed") {
                  document
                    .querySelector(`#${[filter]}`)
                    .classList.remove("active");
                  setFilter("completed");
                }
              }}
            >
              Completed: {completed}
            </a>
          </li>
        </ul>
      </div>
      <hr />
      <List taskList={filteredList} currentView={filter} />
    </div>
  );
}

export default Counter;
