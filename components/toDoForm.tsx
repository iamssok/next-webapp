'use client'

import { useEffect, useState } from "react";
import styles from "../styles/toDoForm.module.css";
import Weather from "./weather";

export default function ToDoForm({ username }) {
  const [toDos, setToDos] = useState([]);
  const [todoInput, setTodoInput] = useState('');
  
  useEffect(() => {
    // 로컬 스토리지에서 기존 할 일 목록 가져오기
    const savedToDos = localStorage.getItem('toDos');
    if (savedToDos) {
      setToDos(JSON.parse(savedToDos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('toDos', JSON.stringify(toDos));
  }, [toDos]);  // toDos 상태가 변경될 때마다 로컬 스토리지에 저장

  const toDoSubmit = (e) => {
    e.preventDefault();
    if (todoInput.trim()) {
      const newToDoObj = {
        text: todoInput,
        id: Date.now(),
      };
      setToDos((prev) => [...prev, newToDoObj]);
      setTodoInput('');
    }
  };

  const deleteToDo = (id) => {
    setToDos((prev) => prev.filter((toDo) => toDo.id !== id));
  };  

  return (
    <form className={styles.todoForm} onSubmit={toDoSubmit}>
      <h1 className={styles.greeting}>Hello, {username}</h1>
      <input type="text" placeholder="Write a To Do and Press Enter" value={todoInput} onChange={(e) => setTodoInput(e.target.value)} required />
      <button type="submit">Enter</button>
      <ul className={styles.todoList}>
        {toDos.map((toDo) => (
          <li key={toDo.id}>
            <span>{toDo.text}</span>
            <button onClick={() => deleteToDo(toDo.id)}>❌</button>
          </li>
        ))}
      </ul>
      <Weather />
    </form>
  )
}