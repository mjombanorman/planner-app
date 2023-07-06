import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MyCustomWidget() {
  const [quote, setQuote] = useState("");
  const [timerActive, setTimerActive] = useState(false);
  const [timerMinutes, setTimerMinutes] = useState(1);
  const [timerSeconds, setTimerSeconds] = useState(0);

  useEffect(() => {
    fetchRandomQuote();
  }, []);

  useEffect(() => {
    if (timerActive) {
      const countdown = setInterval(() => {
        if (timerSeconds > 0) {
          setTimerSeconds(timerSeconds - 1);
        } else if (timerMinutes > 0) {
          setTimerMinutes(timerMinutes - 1);
          setTimerSeconds(59);
        } else {
          clearInterval(countdown);
          setTimerActive(false);
          showNotification();
        }
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [timerActive, timerMinutes, timerSeconds]);

  const fetchRandomQuote = async () => {
    try {
      const response = await fetch("https://api.quotable.io/random");
      const data = await response.json();
      setQuote(data.content);
    } catch (error) {
      console.log(error);
    }
  };

  const startTimer = () => {
    setTimerActive(true);
    setTimerMinutes(1);
    setTimerSeconds(0);
  };

  const stopTimer = () => {
    setTimerActive(false);
  };

  const showNotification = () => {
    toast('🦄 Your Promodoro Timer has ended!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        
        });
  };

  return (
    <div>
      <h2>Random Quote</h2>
      <p>{quote}</p>
      <div>
        <p>
          Pomodoro Timer: {timerMinutes}:{timerSeconds < 10 ? `0${timerSeconds}` : timerSeconds}
        </p>
        {timerActive ? (
          <button onClick={stopTimer}>Stop Timer</button>
        ) : (
          <button onClick={startTimer}>Start Timer</button>
        )}
      </div>
      <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>

<ToastContainer />
    </div>
  );
};
