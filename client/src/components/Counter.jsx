import React, { useState, useContext, useEffect } from "react";
import ToDoContext from "../context/ToDoContext";
import { Link } from "react-router-dom";

function Counter() {
  const {
    taskList,
    // filterTasks,
    priority,
    remaining,
    completed,
    currentView,
    setCurrentView,
  } = useContext(ToDoContext);
  const [filter, setFilter] = useState("all");
  useEffect(() => {
    // filterTasks(filter);
    handleClick(filter);
  }, [filter]);

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
                  setCurrentView("all");
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
                  setCurrentView("remaining");
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
                  setCurrentView("priority");
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
                  setCurrentView("completed");
                }
              }}
            >
              Completed: {completed}
            </a>
          </li>
        </ul>
      </div>
      <hr />
    </div>
  );
}

export default Counter;
