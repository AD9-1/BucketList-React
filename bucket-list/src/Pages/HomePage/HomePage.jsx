import { useState, useEffect } from "react";
import axios from "axios";
import "./HomePage.scss";
import Header from "../../Components/Header/Header";
import Form from "../../Components/Form/Form";
import DisplayList from "../../Components/DisplayList/DisplayList";

function HomePage() {
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
      <Header />
      <Form setTodos={setTodos} />
      <DisplayList todolist={todos} />
    </>
  );
}

export default HomePage;
