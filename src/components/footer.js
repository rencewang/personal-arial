import React, { useState, useEffect, useRef } from 'react';

const greetingArray = [
  'The waves come after midnight.',
  "Isn't it pretty to think so?",
  'The lies I weave are all so intricate.',
  "Don't you know there's a part of me that longs to go?",
  "Why settle for less when there's more?",
  "To be honest, what I liked, were the things I didn't know.",
  'Pray for everything we lost, buy back the secrets.',
  'Would you believe me now, if I say I got caught up in a wave?',
  'I let it happen again, almost gave it away.',
  "I'm still not sure if fear's a rival or close relative to truth.",
  "There's no going back against this California feeling.",
  "You win some and lose some, 'long as the outcome's income.",
  "Either way, we're not alone. I'll find a new place to be from.",
  'On a hard dry surface, you have to engrave the truth.',
  "Look at the world, so close, and I'm halfway to it.",
  'But now, more will go with age.',
  'You are what you love, not who loves you.',
  'In your darkest hours you will stumble on a secret power.',
  'Some days I run for cover some I only run my mouth.',
  'Try to shine. Stay wild.',
  'When it rains it pours, so stay thirsty like before.',
  "It's a train wreck, but I won't crash it.",
  "Turn around and you'll see what I see.",
  "If it's all in my head tell me now.",
  'It is no bad thing to celebrate a simple life.',
  'How long will it be cute?',
  'It strengthens me to know the truth at last.',
  'Am I extreme?',
  'But it frightens me, the thought against my chest.',
  'This love will come back to me.',
  "If everything is not fine in the end, then it's not the end.",
  "You miss all the shots you don't take.",
  'He who has a why can bear almost any how.',
  'Walking through a lot of rainstorms makes you clean.',
  "The world will break your heart ten ways to Sunday. That's guaranteed.",
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
  'Wish I could be. Bigger than me.',
  "I'm falling out of love with you, LA.",
  "When the lights go down it's the ending of the show",
  'Hate me if it helps.',
  "I know I typically fight it but I'm letting my grip go.",
];

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
        <div id="clock">Arial © 2024</div>
        <div id="greeting">{greetingText}</div>
      </div>
    </footer>
  );
};

export default Footer;
