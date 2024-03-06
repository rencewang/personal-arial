import React from 'react';

import Seo from '../components/seo';
import '../styles/general.scss';

const Index = () => {
  return (
    <>
      <Seo title={'Home'} />
      <div id="text">
        <details>
          <summary>
            <span className="title highlight">Lawrence Wang</span>
          </summary>
          <a
            href="https://www.instagram.com/rencewang/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="highlight">Instagram</span>
          </a>
          <a
            href="https://www.linkedin.com/in/rencewang/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="highlight">Linkedin</span>
          </a>
          <br />

          <span className="highlight">
            B.S. Computer Science and Economics, Yale University <br />
            B.A. Political Science, Yale University
          </span>
        </details>

        <details open>
          <summary>
            <span className="title highlight">Is Listening To</span>
          </summary>
          <span className="highlight">Spotify</span>
        </details>

        <details open>
          <summary>
            <span className="title highlight">Has Interests In</span>
          </summary>
          <span className="highlight">
            Architecture <br />
            Aviation <br />
            Chinese poems and novels <br />
            Cities Skylines <br />
            Everybody else's business <br />
            Fantasy world building <br />
            Floor plans <br />
            Genshin Impact <br />
            Grand strategy games <br />
            Hotels <br />
            Interior design <br />
            Origin stories <br />
            Perfume <br />
            Political economy of China <br />
            Science fiction <br />
            Singing <br />
            Song lyrics <br />
            Taylor Swift's discography <br />
            Tea <br />
            The European Union <br />
            Web design <br />
          </span>
        </details>

        <details>
          <summary>
            <span className="title highlight">Wishes He Could Be</span>
          </summary>
          <span className="highlight">
            A world traveller <br />
            Faster <br />
            Good at Ruby on Rails <br />
            Taller <br />
            Writing more <br />
          </span>
        </details>
      </div>
    </>
  );
};

export default Index;
