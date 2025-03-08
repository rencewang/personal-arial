import React, { useState, useEffect, useRef, useMemo } from 'react';

import { greetingArray } from '../content/index/index';

const Clock = () => {
  const [time, setTime] = useState(new Date());
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, []);

  return <span>{time.toLocaleTimeString()}</span>;
};

const Footer = () => {
  const footerRef = useRef();
  const greetingText = useMemo(
    () => greetingArray[Math.floor(Math.random() * greetingArray.length)],
    []
  );

  return (
    <footer ref={footerRef}>
      <div id="greeting">{greetingText}</div>
      <Clock />
    </footer>
  );
};

export default Footer;
