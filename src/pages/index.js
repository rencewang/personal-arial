import React from 'react';

import Player from '../components/player';
import Seo from '../components/seo';
import '../styles/general.scss';

const Index = () => {
  return (
    <>
      <Seo title={'Home'} />
      <div id="text">
        <div className="page-filter">
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
        </div>

        <details open>
          <summary>
            <span className="title highlight">Lawrence Wang</span>
          </summary>
          <span className="highlight">
            I write and code and sing and draw and float in space and stare into
            walls and listen to Taylor Swift and turn on all the lights and live
            in a monastery and drink milk and believe and pray and fly and
            practice acceptance
            <br /> <br />
            Software Development Engineer, ART19 <br />
            B.S. Computer Science and Economics, Yale University <br />
            B.A. Political Science, Yale University
          </span>
        </details>

        <details>
          <summary>
            <span className="title highlight">Is Listening To</span>
          </summary>
          <Player />
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
            <a
              href="https://eu4.paradoxwikis.com/Burgundy"
              target="_blank"
              rel="noreferrer"
            >
              Grand strategy games
            </a>
            <br />
            Hotels <br />
            Interior design <br />
            Origin stories <br />
            Perfume <br />
            Political economy of China <br />
            Science fiction <br />
            Song lyrics <br />
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
            Better at singing <br />
            Faster in the head <br />
            More prolific <br />
            Never bald <br />
          </span>
        </details>

        {/* <details open>
          <summary>
            <span className="title highlight">Recommends</span>
          </summary>
          <span className="highlight">
            Snapchat <br />
            Crying <br />
            Genshin Impact <br />
          </span>
        </details> */}
      </div>
    </>
  );
};

export default Index;
