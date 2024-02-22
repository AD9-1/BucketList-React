import React, { useEffect, useState } from "react";
import "./DisplayList.scss";
import axios from "axios";

const DisplayList = ({ todolist, setTodos, onDelete }) => {
  const [debouncedValues, setDebouncedValues] = useState();

  const handleTodoEdit = (event, id) => {
    const index = todolist.findIndex((item) => item.id === id);
    const newTodos = [...todolist];

    newTodos[index] = {
      ...newTodos[index],
      [event.target.name]: event.target.value,
    };

    console.log(newTodos[index]);
    setDebouncedValues(newTodos[index]);
  };


  


  useEffect(() => {
    const updateTodo = async (debouncedValues) => {
      const response = await axios.put(
        `http://localhost:7071/bucketlist/${debouncedValues.id}`,
        debouncedValues
      );
      setTodos(response.data);
      console.log(response.data);
    };
    if (debouncedValues) updateTodo(debouncedValues);
  }, [debouncedValues]);

  return (
    <div>
      <ul className="card">
        {todolist &&
          todolist.map((todoItem) => (
            <li className="card__list" key={todoItem.id}>
              <button onClick={() => onDelete(todoItem.id)}>x</button>

              <div>
                <input
                  onChange={(event) => handleTodoEdit(event, todoItem.id)}
                  className="card__list__todo"
                  value={todoItem.todo}
                  name="todo"
                />
              </div>
              <label>
                Reason
                <input
                  onChange={(event) => handleTodoEdit(event, todoItem.id)}
                  className="card__list__reason"
                  value={todoItem.todowhy}
                  name="todowhy"
                />
              </label>
              <label>
                {" "}
                Due Date:
                <input
                  onChange={(event) => handleTodoEdit(event, todoItem.id)}
                  value={todoItem.doneBy}
                  name="doneBy"
                />
              </label>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default DisplayList;
