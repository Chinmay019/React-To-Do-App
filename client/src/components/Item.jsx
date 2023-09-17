import { Children, useContext, useEffect, useState } from "react";
import ToDoContext from "../context/ToDoContext";
import EditDialog from "./EditDialog";
import { BiEdit } from "react-icons/bi";
import {
  FaTrash,
  FaRegStar,
  FaStar,
  FaCalendarCheck,
  FaCheck,
} from "react-icons/fa";
import { BsFillCheckCircleFill } from "react-icons/bs";
import CustomCard from "../shared/CustomCard";
import DeleteDialog from "./DeleteDialog";
import { updateTask, refreshCount } from "../context/TodoActions";

function Item({ item }) {
  const { dispatch } = useContext(ToDoContext);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const completeItem = async (item) => {
    if (item.completed === "true") {
      item.completed = "false";
    } else {
      item.completed = "true";
    }
    await updateTask(item);
    dispatch({
      type: "UPDATE_TASK",
      payload: {
        id: item._id,
        data: item,
      },
    });
    const count = refreshCount(taskList);
    dispatch({ type: "SET_UPDATED_COUNT", payload: count });
  };

  const updatePriority = async (item) => {
    if (item.priority === "true") {
      item.priority = "false";
    } else {
      item.priority = "true";
    }
    await updateTask(item);
    dispatch({
      type: "UPDATE_TASK",
      payload: {
        id: item._id,
        data: item,
      },
    });
    const count = refreshCount(taskList);
    dispatch({ type: "SET_UPDATED_COUNT", payload: count });
  };

  return (
    <CustomCard>
      <div>
        <div
          className={`item-layout ${
            item.completed == "true"
              ? "completed-card"
              : item.priority == "true"
              ? "priority-card"
              : "none"
          }`}
        >
          <div onClick={() => updatePriority(item)}>
            {/*onClick={() => updateState(item)} */}
            {item.completed == "true" ? (
              <div title="Completed">
                <BsFillCheckCircleFill className="star" />
              </div>
            ) : item.completed === "false" && item.priority === "false" ? (
              <div title="Non Priority">
                <FaRegStar className="priority-star" />
              </div>
            ) : (
              <div title="Priority">
                <FaStar className="star" />
              </div>
            )}
          </div>
          <div className={"task-title"}>{item.title}</div>
          <div className="edit-container">
            <button onClick={() => setShowEditModal(true)} className="complete">
              <BiEdit />
            </button>
          </div>
          <EditDialog
            show={showEditModal}
            close={() => setShowEditModal(false)}
            title={item.title}
            id={item._id}
            item={item}
          />
          <div className="complete-container">
            <button onClick={() => completeItem(item)} className="complete">
              <FaCheck />
            </button>
          </div>
          <div className="delete-container">
            <button onClick={() => setShowDeleteModal(true)} className="delete">
              <FaTrash />
            </button>
          </div>
          <DeleteDialog
            show={showDeleteModal}
            close={() => setShowDeleteModal(false)}
            id={item._id}
          />
        </div>
      </div>
    </CustomCard>
  );
}

export default Item;
