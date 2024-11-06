'use client'

import { useEffect, useState } from "react";
import styles from "../styles/clock.module.css";

export default function Clock() {
  const dayArrays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const monthArrays = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const [time, setTime] = useState({ hours: '00', minutes: '00' });
  const [date, setDate] = useState({ day: '', date: '' , month: '' });

  useEffect(() => {
    function getClock() {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const day = dayArrays[now.getDay()];
      const date = String(now.getDate());
      const month = monthArrays[now.getMonth()];

      setTime({ hours, minutes });
      setDate({ day, date, month });
    }

    getClock();

    const intervalId = setInterval(getClock, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <div className={styles.clock}>{time.hours} <span>:</span> {time.minutes}</div>
      <div className={styles.calendar}>{date.day} {date.date} {date.month}</div>
    </>
  )
}