import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';

import Player from '../components/player';
import Seo from '../components/seo';
import {
  interestArray,
  aspirationArray,
  recommendationArray,
} from '../content/index/index';
import '../styles/general.scss';

const Index = () => {
  // Generate a pill block in a flex container
  const PillBlock = ({ name, link, image }) => (
    <div className="link-image pill" key={name}>
      {link ? (
        <a href={link} target="_blank" rel="noopener noreferrer">
          {name}
        </a>
      ) : (
        name
      )}
      {image && (
        <span>
          <img src={image} alt={name} />
        </span>
      )}
    </div>
  );

  return (
    <div id="text">
      <div className="page-filter"></div>

      <details open>
        <summary>
          <span className="title">Lawrence Wang</span>
        </summary>
        <div>
          writes and codes and sings and draws and floats in space and stares
          into walls and listens to Taylor Swift and turns on all the lights and
          lives in a monastery and drinks milk and schemes and believes and
          practices acceptance
          <br /> <br />
          Software Development Engineer, ART19 <br />
          B.S. Computer Science and Economics, Yale University <br />
          B.A. Political Science, Yale University <br />
          <a
            href="https://www.instagram.com/rencewang/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ marginRight: '10px' }}
          >
            Instagram
          </a>
          <a
            href="https://www.linkedin.com/in/rencewang/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </details>

      <details>
        <summary>
          <span className="title">Is Listening To</span>
        </summary>
        <Player />
      </details>

      <details open>
        <summary>
          <span className="title">Has Interests In</span>
        </summary>
        <div className="pill-container">
          {interestArray.map((interest) => (
            <PillBlock
              name={interest.name}
              link={interest.link}
              image={interest.image}
            />
          ))}
        </div>
      </details>

      <details>
        <summary>
          <span className="title">Wishes He Could Be</span>
        </summary>
        <div className="pill-container">
          {aspirationArray.map((interest) => (
            <PillBlock
              name={interest.name}
              link={interest.link}
              image={interest.image}
            />
          ))}
        </div>
      </details>

      {/* <details open>
          <summary>
            <span className="title">Recommends</span>
          </summary>
        <div className="pill-container">
        {recommendationArray.map((interest) => (
            <PillBlock
              name={interest.name}
              link={interest.link}
              image={interest.image}
            />
          ))}
        </div>
        </details> */}
    </div>
  );
};

export default Index;

export const Head = () => <Seo title="Home" />;
