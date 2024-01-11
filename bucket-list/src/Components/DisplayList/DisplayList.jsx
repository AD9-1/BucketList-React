import React from "react";
import "./DisplayList.scss";
const DisplayList = ({ todolist }) => {
  return (
    <ul className="card">
      {todolist &&
        todolist.map((todoItem) => (
          <li className="card__list" key={todoItem.id}>
            <h2 className="card__list__todo">{todoItem.todo}</h2>
            <p className="card__list__reason">Reason: {todoItem.todowhy}</p>
            <p className="card__list__date">Due Date: {todoItem.doneBy}</p>
          </li>
        ))}
    </ul>
  );
};

export default DisplayList;
