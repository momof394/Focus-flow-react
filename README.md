{<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Focus Flow – ADHD-Friendly Productivity</title>
  <style>
    body {
      margin: 0;
      font-family: 'Segoe UI', Tahoma, sans-serif;
      background: #f3f4f6;
      color: #1f2937;
    }
    .container {
      max-width: 600px;
      margin: 80px auto;
      background: #ffffff;
      padding: 40px;
      border-radius: 12px;
      box-shadow: 0 0 30px rgba(0, 0, 0, 0.08);
      text-align: center;
    }
    h1 {
      color: #4f46e5;
      font-size: 2.5em;
      margin-bottom: 10px;
    }
    p {
      font-size: 1.1em;
      margin-bottom: 30px;
    }
    ul {
      text-align: left;
      margin: 20px 0;
      padding-left: 0;
      list-style: none;
    }
    ul li::before {
      content: '✔️ ';
    }
    button {
      background-color: #4f46e5;
      color: white;
      border: none;
      padding: 14px 24px;
      font-size: 16px;
      border-radius: 8px;
      cursor: pointer;
      transition: background 0.3s ease;
    }
    button:hover {
      background-color: #3730a3;
    }
    #demo-message {
      margin-top: 20px;
      font-weight: bold;
      color: #10b981;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>🧠 Focus Flow</h1>
    <p>Your ADHD-friendly productivity tool, built to help you stay focused, organized, and motivated.</p>
    <ul>
      <li>Brain Dump Pad</li>
      <li>Smart Time Blocks</li>
      <li>Impulse Interruptor</li>
      <li>Planner Pages</li>
      <li>Ambient Focus Sounds</li>
    </ul>
    <button onclick="showMessage()">Try a Demo</button>
    <p id="demo-message"></p>
  </div>
  <script>
    function showMessage() {
      document.getElementById('demo-message').innerText = 
        "🎉 Demo activated! Imagine this helping you stay on track every day.";
    }
  </script>
</body>
</html>
  "name": "flownevo",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.0.0",
    "vite": "^5.0.0"
  }
}import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});node_modules
dist
.env<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Flownevo</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);import React, { useState, useEffect } from 'react';
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

export default App;import React, { useState, useEffect } from 'react';

const FocusScene = () => {
  const [brainDump, setBrainDump] = useState('');
  const [impulse, setImpulse] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('brainDump');
    if (saved) setBrainDump(saved);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      localStorage.setItem('brainDump', brainDump);
    }, 2000);
    return () => clearInterval(interval);
  }, [brainDump]);

  useEffect(() => {
    const interval = setInterval(() => {
      const messages = [
        "You're doing great!",
        "Stay with it.",
        "Breathe and reset.",
        "Focus on your breath.",
        "Almost there—stay locked in."
      ];
      const msg = messages[Math.floor(Math.random() * messages.length)];
      setImpulse(msg);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ marginTop: '2rem' }}>
      <h3>Brain Dump</h3>
      <textarea
        rows="10"
        cols="50"
        value={brainDump}
        onChange={(e) => setBrainDump(e.target.value)}
        placeholder="Write whatever is on your mind..."
      />
      <div style={{ marginTop: '1rem', fontStyle: 'italic' }}>
        Impulse: {impulse}
      </div>
    </div>
  );
};

export default FocusScene;