'use client'

import { useState } from "react";
import styles from "../styles/loginForm.module.css";

export default function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('');
  const loginSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      onLogin(username);
    }
  };
  return (
    <form className={styles.loginForm} onSubmit={loginSubmit}>
      <input type="text" placeholder="What's your name?" value={username} onChange={(e) => setUsername(e.target.value)} required />
      <button type="submit">LOGIN</button>
    </form>
  )
}