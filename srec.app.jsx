import React, { useState, useEffect } from 'react';
import FocusScene from './components/FocusScene';

const App = () => {
  const [timeLeft, setTimeLeft] = useState(1500); // 25 minutes
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const toggleTimer = () => setIsRunning(!isRunning);
  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(1500);
  };

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>Flownevo</h1>
      <h2>{formatTime(timeLeft)}</h2>
      <button onClick={toggleTimer}>{isRunning ? 'Pause' : 'Start'}</button>
      <button onClick={resetTimer} style={{ marginLeft: '1rem' }}>Reset</button>
      <FocusScene />
    </div>
  );
};

export default App;
