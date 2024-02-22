import { useState, useEffect } from "react";
import axios from "axios";
import "./HomePage.scss";
import Header from "../../Components/Header/Header";
import Form from "../../Components/Form/Form";
import DisplayList from "../../Components/DisplayList/DisplayList";

function HomePage() {
  const onDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:7071/bucketlist/${id}`
      );
      const OGbucketList = response.data;
      const newBucketList = OGbucketList.filter((item) => item.id !== id);
      setTodos(newBucketList);
    } catch (error) {
      console.error(error);
    }
  };


  const [todos, setTodos] = useState([]);

  const fetchTodoList = async () => {
    const response = await axios.get("http://localhost:7071/bucketlist");
    setTodos(response.data);
  };

  useEffect(() => {
    fetchTodoList();
  }, []);

  return (
    <>
      <Header/>
      <div className = "form__header">
        <h3 className = "form__header__headline">Make a BucketList!</h3>
        <p className = "form__header__text">Start living your dream... List your goals!</p>
      </div>
      <div className="container"><Form setTodos={setTodos} todos={todos} />
      <DisplayList todolist={todos} setTodos={setTodos} onDelete={onDelete} /></div>
    </>
  );
}

export default HomePage;
