import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Form.scss";

function Form({ setTodos }) {
  const navigate = useNavigate();

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    console.log(event.target.todo.value);
    console.log(event.target.todowhy.value);
    console.log(event.target.doneBy.value);

    const newTodo = {
      todo: event.target.todo.value,
      todowhy: event.target.todowhy.value,
      doneBy: event.target.doneBy.value,
    };

    try {
      const response = await axios.post(
        "http://localhost:7071/bucketlist",
        newTodo
      );
      console.log(response);

      setTodos(response.data);

      // Navigate to home after successful form submission
    } catch (error) {
      console.error("Error submitting form:", error);
    }
    navigate("/");
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input type="text" name="todo" placeholder="Enter your Todo:" />
      <input type="text" name="todowhy" placeholder="Enter your Reason:" />
      <input type="date" name="doneBy" placeholder="Enter your Due Date:" />
      <button type="submit">Submit Note</button>
    </form>
  );
}

export default Form;
