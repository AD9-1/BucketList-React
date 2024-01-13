import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Form.scss";

function Form({ setTodos, todos }) {
  const navigate = useNavigate();

  const handleFormSubmit = async (event) => {
    event.preventDefault();
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
      console.log(response.data);
      setTodos([...todos, newTodo]);
      console.log(todos);

      // Navigate to home after successful form submission
    } catch (error) {
      console.error("Error submitting form:", error);
    }

    navigate("/");
  };

  return (
    <form className="input__form" onSubmit={handleFormSubmit}>
      <input
        className="input__form__field"
        type="text"
        name="todo"
        placeholder="Before I die I want TO"
      />
      <input
        className="input__form__field"
        type="text"
        name="todowhy"
        placeholder="Enter your Reason:"
      />
      <input
        className="input__form__field"
        type="text"
        name="doneBy"
        placeholder="Set A Deadline;"
      />
      <button className="input__form__button" type="submit">
        SAVE
      </button>
    </form>
  );
}
export default Form;
