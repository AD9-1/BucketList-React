import React, { useState } from "react";
import "./DisplayList.scss";


const DisplayList = ({ todolist, setTodos, onDelete,onEdit }) => {
  // const [edit]
  const handleTodoEdit = (event, id) => {
    // console.log(event.target.name);
     //console.log(event.target.value);
  
    const index = todolist.findIndex((item) => item.id === id);

    const newTodos = [...todolist]; //copy of array
    newTodos[index] = {
      ...newTodos[index],
      [event.target.name]: event.target.value,
    };

    console.log(newTodos);

    setTodos(newTodos);
  };

  return (
    <div>
      <ul className="card">
        {todolist &&
          todolist.map((todoItem) => (
            <li className="card__list" key={todoItem.id}>
              <button onClick={() => onDelete(todoItem.id)}>x</button>
              <button onClick={(event)=>onEdit(event,todoItem.id)}>Edit</button>
              <input
                onChange={(event) => handleTodoEdit(event, todoItem.id)}
                className="card__list__todo"
                value={todoItem.todo}
                name="todo"
              />
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

// import React, { useState } from "react";
// import "./DisplayList.scss";
// const DisplayList = ({ todolist, setTodos, onDelete }) => {

//   return (
//     <div>
//     <ul className="card">
//       {todolist &&
//         todolist.map((todoItem) => (
//           <li className="card__list" key={todoItem.id}>
//             <button onClick={() => onDelete(todoItem.id)}>x</button>
//             <h2 className="card__list__todo">{todoItem.todo}</h2>
//             <h2  className="card__list__reason">{todoItem.todowhy}</h2>
//             <h2 className="card__list__date">{todoItem.doneBy}</h2>
//           </li>
//         ))}
//     </ul>
//     </div>
//   );
// };

// export default DisplayList;
