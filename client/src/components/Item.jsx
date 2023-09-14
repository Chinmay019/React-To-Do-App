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

function Item({ item }) {
  const { deleteItem, completeItem, editItem } = useContext(ToDoContext);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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
          <div>
            {/*onClick={() => updateState(item)} */}
            {item.completed == "true" ? (
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
            id={item._id}
            item={item}
          />
          <div className="complete-container">
            <button
              onClick={() => completeItem(item._id, item)}
              className="complete"
            >
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
