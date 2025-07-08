import React, { useState, useEffect } from 'react';

const FocusScene = () => {
  const [brainDump, setBrainDump] = useState('');
  const [impulse, setImpulse] = useState('');

  // Load saved brain dump
  useEffect(() => {
    const saved = localStorage.getItem('brainDump');
    if (saved) setBrainDump(saved);
  }, []);

  // Autosave brain dump
  useEffect(() => {
    const interval = setInterval(() => {
      localStorage.setItem('brainDump', brainDump);
    }, 2000);
    return () => clearInterval(interval);
  }, [brainDump]);

  // Simulate impulse message every 15s
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