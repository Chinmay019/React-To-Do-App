import React, { useEffect, useState } from "react";
import Item from "./Item";
import { useContext } from "react";
import Loader from "../shared/Loader";
import ToDoContext from "../context/ToDoContext";
import LoginModal from "./LoginModal";
import { fetchTasks, getUserTasks } from "../context/TodoActions";

function List() {
  const {
    taskList,
    filteredTaskList,
    completed,
    remaining,
    userName,
    priority,
    currentView,
    loading,
    isLoggedIn,
    dispatch,
  } = useContext(ToDoContext);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    // if (!isLoggedIn) {
    //   renderLoginModal();
    // } else {
    if (isLoggedIn) {
      const getTaskList = async () => {
        dispatch({ type: "SET_LOADING", payload: true });
        const data = await getUserTasks(userName);
        console.log(data);
        dispatch({ type: "SET_TASKS_FROM_DB", payload: data.taskList });
        dispatch({
          type: "SET_USER_ID",
          payload: { userId: data.userId, user_Id: data._id },
        });
        dispatch({ type: "SET_LOADING", payload: false });
      };
      getTaskList();
    }
  }, [userName]);

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
        {taskList.map((item) => (
          <Item key={item._id} item={item} />
        ))}
      </div>
    );
  }
}

export default List;
