import React, { useEffect } from "react";
import Item from "./Item";
import { useContext } from "react";
import ToDoContext from "../context/ToDoContext";

function List() {
  const {
    taskList,
    filteredTaskList,
    completed,
    remaining,
    priority,
    currentView,
  } = useContext(ToDoContext);

  // useEffect(() => {
  //   console.log(
  //     "useEffect in list",
  //     "priority : ",
  //     priority,
  //     "completed: ",
  //     completed,
  //     "remaining : ",
  //     remaining
  //   );
  //   handleNullCheck();
  // }, [priority, completed, remaining]);

  const handleNullCheck = () => {
    // console.log("handleNullCheck");
    console.log(
      "handleNullCheck",
      "priority : ",
      priority,
      "completed: ",
      completed,
      "remaining : ",
      remaining
    );
    if (!taskList || !taskList.length) {
      return (
        <div className="empty-task-list">
          No Tasks Left. Hurray!!!!!!!!!!!!!!
        </div>
      );
    }
    if (priority == 0) {
      console.log(priority);
      return (
        <div className="empty-task-list">
          No Priority Tasks Left. Hurray!!!!!!!!!!!!!!
        </div>
      );
    }
  };

  if (!taskList || !taskList.length) {
    return (
      <div className="empty-task-list">No Tasks Left. Hurray!!!!!!!!!!!!!!</div>
    );
  } else if (
    taskList.length &&
    !remaining &&
    currentView === "remaining" &&
    completed == taskList.length
  ) {
    return (
      <div className="empty-task-list">
        You have completed all your tasks. <br />
        Way to go champ!!!!!!!
      </div>
    );
  } else if (taskList.length && !priority && currentView === "priority") {
    return (
      <div className="empty-task-list">
        No Priority Tasks Left. <br />I see this as an absolute win!!!!!
      </div>
    );
  } else if (taskList.length && !completed && currentView === "completed") {
    return (
      <div className="empty-task-list">
        Tasks yet to be Completed. <br />
        Get to work!!!!!!!!!!!!!!
      </div>
    );
  } else {
    return (
      <div className="task-list">
        {filteredTaskList.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </div>
    );
  }
}

export default List;
