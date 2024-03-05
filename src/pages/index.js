import React from 'react';

import Seo from '../components/seo';
import '../styles/general.scss';

const Index = () => {
  return (
    <>
      <Seo title="Home" />
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
            href="https://www.linkedin.com/in/lawrence-c-w/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="highlight">Linkedin</span>
          </a>
        </details>

        <details open>
          <summary>
            <span className="title highlight">Studies</span>
          </summary>
          <span className="highlight">
            Computer Science and Economics <br />
            Political Science
          </span>
        </details>

        <details open>
          <summary>
            <span className="title highlight">Has Interests In</span>
          </summary>
          <span className="highlight">
            Architecture <br />
            Chinese poems and fiction <br />
            Cities Skylines <br />
            Fantasy world building <br />
            Floor plans <br />
            Genshin Impact <br />
            Grand strategy games <br />
            Interior design <br />
            Intersection between design and computing <br />
            Perfume <br />
            Political economy of China <br />
            Singing <br />
            Song lyrics <br />
            Taylor Swift's discography <br />
            The European Union <br />
            Web design <br />
          </span>
        </details>

        <details open>
          <summary>
            <span className="title highlight">Hopes To Become</span>
          </summary>
          <span className="highlight">
            Aspirational world traveller <br />
            Drawer, writer, and coder <br />
            Good at Ruby <br />
            Taller <br />
          </span>
        </details>
      </div>
    </>
  );
};

export default Index;
