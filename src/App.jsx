import React, { useState } from 'react';

export default function App() {
  const [entity, setEntity] = useState('clown');
  const [mood, setMood] = useState('unsettling');
  const [pose, setPose] = useState('peeking');
  const [setting, setSetting] = useState('blend into forest');
  const [level, setLevel] = useState('moderate');
  const [result, setResult] = useState(null);
  const [generating, setGenerating] = useState(false);

  const handleGenerate = async () => {
    setGenerating(true);
    setResult(null);

    try {
      const res = await fetch('https://creepy-photobomber-backend.onrender.com/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ entity, mood, pose, setting, level })
      });

      const data = await res.json();

      if (res.ok) {
        setResult(data.imageUrl);
      } else {
        alert(data.error || 'Something went wrong');
      }
    } catch (error) {
      console.error(error);
      alert('Error connecting to the backend.');
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', fontFamily: 'Arial' }}>
      <h1>Creepy Photobomber 👻</h1>

      <label>Entity:</label>
      <select value={entity} onChange={e => setEntity(e.target.value)}>
        <option value="clown">Clown</option>
        <option value="shadow figure">Shadow Figure</option>
        <option value="old man">Old Man</option>
        <option value="creepy child">Creepy Child</option>
      </select>

      <br /><label>Mood:</label>
      <select value={mood} onChange={e => setMood(e.target.value)}>
        <option value="playful">Playful</option>
        <option value="unsettling">Unsettling</option>
        <option value="barely noticeable">Barely Noticeable</option>
      </select>

      <br /><label>Pose:</label>
      <select value={pose} onChange={e => setPose(e.target.value)}>
        <option value="peeking">Peeking</option>
        <option value="staring">Staring</option>
        <option value="walking past">Walking Past</option>
        <option value="waving">Waving</option>
      </select>

      <br /><label>Setting:</label>
      <select value={setting} onChange={e => setSetting(e.target.value)}>
        <option value="blend into forest">Blend into Forest</option>
        <option value="match office lighting">Match Office Lighting</option>
        <option value="blend into background">Blend into Background</option>
      </select>

      <br /><label>Photobomb Level:</label>
      <select value={level} onChange={e => setLevel(e.target.value)}>
        <option value="subtle">Subtle</option>
        <option value="moderate">Moderate</option>
        <option value="obvious">Obvious</option>
      </select>

      <br /><br />
      <button onClick={handleGenerate} disabled={generating}>
        {generating ? 'Generating...' : 'Generate Creepy Photobomb'}
      </button>

      {result && (
        <div style={{ marginTop: '20px' }}>
          <h2>Result:</h2>
          <img src={result} alt="Generated" style={{ maxWidth: '100%' }} />
        </div>
      )}
    </div>
  );
}
