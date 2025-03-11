import React, { useState, useEffect, useRef, useMemo, forwardRef } from 'react';

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

const Footer = forwardRef((props, ref) => {
  const greetingText = useMemo(
    () => greetingArray[Math.floor(Math.random() * greetingArray.length)],
    []
  );

  return (
    <footer ref={ref}>
      <div id="greeting">{greetingText}</div>
      <Clock />
    </footer>
  );
});

export default Footer;
