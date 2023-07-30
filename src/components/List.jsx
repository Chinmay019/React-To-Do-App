import React, { useEffect } from "react";
import Item from "./Item";
import { useContext } from "react";
import Loader from "../shared/Loader";
import ToDoContext from "../context/ToDoContext";

function List() {
  const {
    taskList,
    filteredTaskList,
    completed,
    remaining,
    priority,
    currentView,
    loading,
  } = useContext(ToDoContext);

  if (loading) {
    return <Loader />;
  } else if (!loading && (!taskList || !taskList.length)) {
    return (
      <div className="empty-task-list">No Tasks Left. Hurray!!!!!!!!!!!!!!</div>
    );
  } else if (
    !loading &&
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
  } else if (
    !loading &&
    taskList.length &&
    !priority &&
    currentView === "priority"
  ) {
    return (
      <div className="empty-task-list">
        No Priority Tasks Left. <br />I see this as an absolute win!!!!!
      </div>
    );
  } else if (
    !loading &&
    taskList.length &&
    !completed &&
    currentView === "completed"
  ) {
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
