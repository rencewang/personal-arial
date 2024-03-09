import React, { useEffect, useState } from 'react';

const clientId = process.env.SPOTIFY_ID;
const clientSecret = process.env.SPOTIFY_SECRET;
const refreshToken = process.env.SPOTIFY_REFRESH;

const Player = () => {
  var Buffer = require('buffer/').Buffer;
  const [song, setSong] = useState([]);

  const refreshAccessToken = () => {
    return fetch(`https://accounts.spotify.com/api/token`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${new Buffer(
          `${clientId}:${clientSecret}`
        ).toString('base64')}`,
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_id: clientId,
      }),
    });
  };

  const getRecentlyPlayed = (token) => {
    return fetch(
      `https://api.spotify.com/v1/me/player/recently-played?limit=1`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };

  useEffect(() => {
    const fetchData = async () =>
      await refreshAccessToken()
        .then((res) => res.json())
        .then((data) => {
          getRecentlyPlayed(data.access_token)
            .then((res) => res.json())
            .then((data) => {
              setSong(data.items[0]);
            })
            .catch((err) => console.error(err));
        })
        .catch((err) => console.error(err));
    fetchData();
  }, []);

  return (
    <div id="player">
      <div className="player-content">
        {song.track ? `${song.track.name}, ${song.track.artists[0].name}` : ''}
      </div>
      <div className="spotify-logo">
        <a
          href={song.track ? song.track.external_urls.spotify : ''}
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg fill="none" width="20" height="20">
            <path d="M10 0C4.5 0 0 4.5 0 10s4.5 10 10 10 10-4.5 10-10S15.55 0 10 0Zm3.75 14.65c-2.35-1.45-5.3-1.75-8.8-.95-.35.1-.65-.15-.75-.45-.1-.35.15-.65.45-.75 3.8-.85 7.1-.5 9.7 1.1.35.15.4.55.25.85-.2.3-.55.4-.85.2Zm1-2.7c-2.7-1.65-6.8-2.15-9.95-1.15-.4.1-.85-.1-.95-.5-.1-.4.1-.85.5-.95C8 8.25 12.5 8.8 15.6 10.7c.3.15.45.65.2 1s-.7.5-1.05.25ZM4.3 7.75c-.5.15-1-.15-1.15-.6-.15-.5.15-1 .6-1.15 3.55-1.05 9.4-.85 13.1 1.35.45.25.6.85.35 1.3-.25.35-.85.5-1.3.25C12.7 7 7.35 6.8 4.3 7.75Z"></path>
          </svg>
        </a>
      </div>
    </div>
  );
};

export default Player;
