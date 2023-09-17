import React, { useEffect, useState } from "react";
import Item from "./Item";
import { useContext } from "react";
import Loader from "../shared/Loader";
import ToDoContext from "../context/ToDoContext";
import LoginModal from "./LoginModal";
import { getUserTasks } from "../context/TodoActions";

function List({ taskList, currentView }) {
  console.log(taskList);
  const {
    completed,
    remaining,
    userName,
    priority,
    loading,
    isLoggedIn,
    dispatch,
    isExistingUser,
  } = useContext(ToDoContext);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const renderLoginModal = () => {
    if (!isLoggedIn) {
      setShowLoginModal(!isLoggedIn);
      return (
        <LoginModal
          show={showLoginModal}
          close={() => setShowLoginModal(false)}
        />
      );
    }
  };

  if (loading) {
    return <Loader />;
  } else if (
    !loading &&
    (!taskList || !taskList.length) &&
    currentView == "all"
  ) {
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
        {taskList.map((item) => (
          <Item key={item._id} item={item} />
        ))}
      </div>
    );
  }
}

export default List;
