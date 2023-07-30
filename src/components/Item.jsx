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

function Item({ item }) {
  const {
    deleteItem,
    completeItem,
    editItem,
    itemEdit,
    updateTitle,
    updateState,
  } = useContext(ToDoContext);
  const [showEditModal, setShowEditModal] = useState(false);

  return (
    <CustomCard>
      <div>
        <div
          className={`item-layout ${
            item.completed
              ? "completed-card"
              : item.priority
              ? "priority-card"
              : "none"
          }`}
        >
          <div onClick={() => updateState(item)}>
            {item.completed ? (
              <div title="Completed">
                <BsFillCheckCircleFill className="completed-star" />
              </div>
            ) : !item.completed && !item.priority ? (
              <div title="Non Priority">
                <FaRegStar className="priority-star" />
              </div>
            ) : (
              <div title="Priority">
                <FaStar className="priority-star" />
              </div>
            )}
          </div>
          <div
            className={"task-title"}
            onClick={() => {
              editItem(item);
            }}
          >
            {item.title}
          </div>
          <div className="edit-container">
            <button onClick={() => setShowEditModal(true)} className="complete">
              <BiEdit />
            </button>
          </div>
          <EditDialog
            show={showEditModal}
            close={() => setShowEditModal(false)}
            title={item.title}
            id={item.id}
          />
          {/* <EditDialog item={item} /> */}
          <div className="complete-container">
            <button onClick={() => completeItem(item.id)} className="complete">
              <FaCheck />
            </button>
          </div>
          <div className="delete-container">
            <button onClick={() => deleteItem(item.id)} className="delete">
              <FaTrash />
            </button>
          </div>
        </div>
      </div>
    </CustomCard>
  );
}

export default Item;
