'use client'

import { useEffect, useState } from "react";
import Clock from "../components/clock";
import LoginForm from "../components/loginForm";
import ToDoForm from "../components/toDoForm";
import styles from "../styles/style.module.css";

export default function Home() {
  const imgArrays = ["back1","back2","back3","back4","back5","back6","back7","back8"];
  const [back, setBack] = useState('back1');

  useEffect(() => {
    function updateBack() {
      const imgIdx = imgArrays[Math.floor(Math.random() * imgArrays.length)];
      setBack(imgIdx);
    }

    updateBack();
  }, []);
 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  const handleLogin = (name) => {
    setUsername(name);
    setIsLoggedIn(true);
  };

  return (
    <div className={styles.container} style={{backgroundImage:`url(/images/${back}.jpg)`}}>
      <Clock />      
      {!isLoggedIn ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <ToDoForm username={username} />
      )}
    </div>
  )
}