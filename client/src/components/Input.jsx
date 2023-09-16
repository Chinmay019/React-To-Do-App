import React, { useState, useContext, useEffect } from "react";
import ToDoContext from "../context/ToDoContext";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import CustomCard from "../shared/CustomCard";
import { createTask } from "../context/TodoActions";

function FormItem() {
  const [taskInput, setTaskInput] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const { isLoggedIn, loading, userId, dispatch } = useContext(ToDoContext);

  useEffect(() => {
    if (taskInput.length >= 3) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [taskInput.length]);

  const handleInput = (e) => {
    setTaskInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (taskInput.length >= 3) {
      const newToDo = {
        title: taskInput.trim(),
        priority: false,
        completed: false,
        createdAt: new Date().toLocaleString(),
        userId: userId,
      };

      const data = await createTask(userId, newToDo);
      console.log(data);
      if (data.status == 201) {
        newToDo._id = data.insertedId;
        dispatch({ type: "CREATE_TASK", payload: newToDo });
        setTaskInput("");
        setIsDisabled(true);
      } else if (data.status == 404) {
        dispatch({ type: "SET_LOADING", payload: true });
      }
    }
  };

  return (
    <CustomCard>
      <div className="form-container">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3 input-group">
            <Form.Control
              onChange={handleInput}
              type="text"
              placeholder="Add a To-Do"
              value={taskInput}
            />
            <Button variant="primary" type="submit" disabled={isDisabled}>
              Add
            </Button>
          </Form.Group>
        </Form>
      </div>
    </CustomCard>
  );
}

export default FormItem;
