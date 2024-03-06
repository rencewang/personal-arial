import React, { useState, useEffect, useRef } from 'react';

import '../styles/general.scss';

const greetingArray = [
  'The waves come after midnight.',
  'Fall asleep to revolution, then wake up next to a sad excuse.',
  "Isn't it pretty to think so?",
  'The lies I weave are all so intricate.',
  "Don't you know there's a part of me that longs to go?",
  "Why settle for less when there's more?",
  'To be honest, what I liked, were the things I didn’t know.',
  'Pray for everything we lost, buy back the secrets.',
  'Would you believe me now, if I say I got caught up in a wave?',
  'So I let it happen again, almost gave it away.',
  "I'm still not sure if fear's a rival or close relative to truth.",
  "There's no going back against this California feeling.",
  "You win some and lose some, 'long as the outcome's income.",
  'I want it all, and then some.',
  "Either way, we're not alone. I'll find a new place to be from.",
  'On a hard dry surface, you have to engrave the truth.',
  "Look at the world, so close, and I'm halfway to it.",
  'But now, more will go with age.',
  'You are what you love, not who loves you.',
  'In your darkest hours you will stumble on a secret power.',
  'Some days I run for cover some I only run my mouth.',
  'Try to shine. Stay wild.',
  'When it rains it pours, so stay thirsty like before.',
  'It’s a train wreck, but I won’t crash it.',
  'Turn around and you’ll see what I see.',
  "If it's all in my head tell me now.",
  'It is no bad thing to celebrate a simple life.',
  'How long will it be cute?',
  'It strengthens me to know the truth at last.',
  'Criticize a little something because somebody has to.',
  'Am I extreme?',
  'But it frightens me, the thought against my chest.',
  'This love will come back to me.',
  "If everything is not fine in the end, then it's not the end.",
  "You miss all the shots you don't take.",
  'He who has a why can bear almost any how.',
  'Walking through a lot of rainstorms makes one clean.',
  "The world will break your heart ten ways to Sunday. That's guaranteed.",
  "Most things don't exist.",
  'There in the rear-view mirror disappearing now.',
  "Now I'm dodging plot holes in my sunburnt Silverado.",
  'Are you happy?',
  "But that's impossible.",
  'Are you still there? Good.',
  'In Paris you asked me if I was afraid.',
  "I don't mean to keep making it about me.",
  'Maybe I should see them for myself.',
  'Remember that they may be behind you.',
  "I'm gonna start again.",
  "There's still a lot I haven't put into words yet.",
  'What do you want to be remembered for?',
  "I'll keep my lanterns on.",
];

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    var timerID = setInterval(() => tick(), 1000);
    return () => {
      clearInterval(timerID);
    };
  });

  function tick() {
    setTime(new Date());
  }

  return <span>{time.toLocaleTimeString()}</span>;
};

const Footer = () => {
  const [greetingText] = useState(
    greetingArray[Math.floor(Math.random() * greetingArray.length)]
  );

  // Ensure footer does not pre-render at build time
  const footerRef = useRef();
  useEffect(() => {
    footerRef.current.style.display = 'block';
    console.log('changed');
  }, []);

  return (
    <footer ref={footerRef}>
      <div id="bottom">
        <div id="clock">
          <Clock />
        </div>
        <div id="greeting">&ldquo;{greetingText}&rdquo;</div>
      </div>
    </footer>
  );
};

export default Footer;
