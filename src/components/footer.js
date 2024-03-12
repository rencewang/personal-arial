import React, { useState, useEffect, useRef } from 'react';

import { greetingArray } from '../content/index/index';

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    var timerID = setInterval(() => setTime(new Date()), 1000);
    return () => {
      clearInterval(timerID);
    };
  }, []);

  return <span>{time.toLocaleTimeString()}</span>;
};

const Footer = () => {
  const footerRef = useRef();
  const [greetingText, setGreetingText] = useState('');

  // use effect to get random greeting
  useEffect(() => {
    console.log('good morning good evening good afternoon');
    setGreetingText(
      greetingArray[Math.floor(Math.random() * greetingArray.length)]
    );
  }, []);

  return (
    <footer ref={footerRef}>
      <div id="bottom">
        <div id="clock">Arial 6.1.1 © 2024</div>
        <div id="greeting">{greetingText}</div>
      </div>
    </footer>
  );
};

export default Footer;
