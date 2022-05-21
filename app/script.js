import React from 'react';
import ReactDOM from 'react-dom';
import { useState, useMemo } from 'react';


const App = () => {

  const [time, setTime] = useState();
  const [timer, setTimer] = useState(null);
  const [status, setStatus] = useState('off'); // off, work, rest

  // FUCNTIONS

  const formatTime = useMemo(() => {
    let seconds = Math.floor(time % 60);
    let minutes = Math.floor((time / 60) % 60);

    if (seconds < 10) {
      seconds = `0${seconds}`;
    };
    if (minutes < 10) {
      minutes = `0${minutes}`;
    };

    return (
      `${minutes}:${seconds}`
    );
  }, [time]);

  const startTimer = () => {
    setTime(20);
    setStatus('work');
    setTimer(setInterval(() => {
      setTime(prevTime => prevTime - 1);
    }, 1000))
  };

  const stopTimer = () => {
    clearInterval(timer);
    setTime(0);
    setStatus('off');
  };

  const closeApp = () => {
    window.close();
  };

  const playBell = () => {
    const sound = new Audio('./sounds/bell.wav');
    sound.play();
  };

  // CONDITIONS

  if (time === 0) {
    if (status === 'work') {
      setStatus('rest');
      setTime(10);
      playBell();
    } else if (status === 'rest') {
      setStatus('work');
      setTime(20);
      playBell();
    }
  };

  return (
    <div>
      <h1>Protect your eyes</h1>
      { (status === 'off') &&
      <div>
        <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
        <p>This app will help you track your time and inform you when it's time to rest.</p>
      </div>
      }
      { (status === 'work') && <img src="./images/work.png" /> }
      { (status === 'rest') && <img src="./images/rest.png" /> }
      { (status !== 'off') && <div className="timer">{formatTime}</div> }
      { (status === 'off') && <button className="btn" onClick={startTimer}>Start</button> }
      { (status !== 'off') && <button className="btn" onClick={stopTimer}>Stop</button> }
      <button className="btn btn-close" onClick={closeApp}>X</button>
    </div>
  )
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('app')
);
