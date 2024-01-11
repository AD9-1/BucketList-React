import React from 'react';

const DisplayList = ({ todolist }) => {
  return (
    <> 
      {todolist && todolist.map((todoItem) => (
        <li key={todoItem.id}>
          <h2>{todoItem.todo}</h2>
          <p>Reason: {todoItem.todowhy}</p>
          <p>Due Date: {todoItem.doneBy}</p>
        </li>
      ))}
    </>
  );
};

export default DisplayList;
