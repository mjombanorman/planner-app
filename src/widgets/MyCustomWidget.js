import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/styles.css";

export default function MyCustomWidget() {
  const [quote, setQuote] = useState("");
  const [timerActive, setTimerActive] = useState(false);
  const [timerMinutes, setTimerMinutes] = useState(25);
  const [timerSeconds, setTimerSeconds] = useState(0);

  useEffect(() => {
    fetchRandomQuote(); // Fetch a random quote when the component mounts
  }, []);

  useEffect(() => {
    if (timerActive) {
      // Timer countdown logic
      const countdown = setInterval(() => {
        if (timerSeconds > 0) {
          setTimerSeconds(timerSeconds - 1);
        } else if (timerMinutes > 0) {
          // Decrease minutes and set seconds to 59 when seconds reach 0
          setTimerMinutes(timerMinutes - 1);
          setTimerSeconds(59);
        } else {
          // Timer has reached 0
          clearInterval(countdown);
          setTimerActive(false);
          showNotification(); // Show a notification when the timer ends
        }
      }, 1000);
      return () => clearInterval(countdown); // Clean up the interval on component unmount
    }
  }, [timerActive, timerMinutes, timerSeconds]);

  const fetchRandomQuote = async () => {
    try {
      const response = await fetch("https://api.quotable.io/random");
      const data = await response.json();
      setQuote(data.content); // Set the fetched quote in the state
    } catch (error) {
      console.log(error);
    }
  };

  const startTimer = () => {
    setTimerActive(true);
    setTimerMinutes(25);
    setTimerSeconds(0);
  };

  const stopTimer = () => {
    setTimerActive(false);
  };

  const showNotification = () => {
    toast('Your Pomodoro Timer has ended!', {
      position: "top-right",
      autoClose: 5000, // Notification auto-close duration in milliseconds
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
      {/* Title */}
      <h2 className="title">Daily Motivation Quote</h2>
      
      {/* Display the quote */}
      <p>{quote}</p>
      
      {/* Timer section */}
      <div>
        <p>
          Pomodoro Timer: {timerMinutes}:{timerSeconds < 10 ? `0${timerSeconds}` : timerSeconds}
        </p>
        
        {/* Start/Stop Timer buttons */}
        {timerActive ? (
          <button className="stopButton" onClick={stopTimer}>Stop Timer</button>
        ) : (
          <button className="startButton" onClick={startTimer}>Start Timer</button>
        )}
      </div>

      {/* ToastContainer for displaying notifications */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};
