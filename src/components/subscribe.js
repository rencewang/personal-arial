import React, { useEffect } from 'react';

const Subscribe = () => {
  useEffect(() => {
    // Set up the custom widget object
    window.CustomSubstackWidget = {
      substackUrl: 'https://rawrence.substack.com/',
      placeholder: 'example@gmail.com',
      buttonText: 'Subscribe',
    };

    // Create and append the script
    const script = document.createElement('script');
    script.src = 'https://substackapi.com/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <div id="custom-substack-embed"></div>;
};

export default Subscribe;
