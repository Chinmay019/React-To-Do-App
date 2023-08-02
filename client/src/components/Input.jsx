import React, { useState, useContext } from "react";
import ToDoContext from "../context/ToDoContext";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import CustomCard from "../shared/CustomCard";

function FormItem() {
  const [taskInput, setTaskInput] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const { addItem } = useContext(ToDoContext);

  const handleInput = (e) => {
    setTaskInput(e.target.value);
    if (taskInput.length) setIsDisabled(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskInput.length) {
      const newToDo = {
        title: taskInput.trim(),
        priority: false,
        completed: false,
      };

      addItem(newToDo);
      setTaskInput("");
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
