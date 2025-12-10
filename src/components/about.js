import React from 'react';

import Player from '../components/player';
import {
  interestArray,
  aspirationArray,
  recommendationArray,
} from '../content/index/index';
import '../styles/general.scss';

const PillBlock = ({ name, link, image }) => (
  <span  key={name}>
    {link ? (
      <a href={link} target="_blank" rel="noopener noreferrer">
        {name}
      </a>
    ) : (
      name
    )}
    {/* {image && (
      <span>
        <img src={image} alt={name} />
      </span>
    )} */}
  </span>
);

const About = () => (
  <>
    {/* <details open>
      <summary> */}
        {/* <span className="subtitle">Lawrence Wang</span> */}
      {/* </summary> */}

    {/* </details> */}

    {/* <details>
      <summary>
        <span className="subtitle">Is Listening To</span>
      </summary>
      <Player />
    </details> */}

    {[
      { title: 'I am interested in', data: interestArray },
      { title: 'I wish I could', data: aspirationArray },
      // { title: 'Endorses', data: recommendationArray },
    ].map(({ title, data }) => (
      // <details key={title} open>
      //   <summary>
      <>
          {/* <div className="subtitle">{title}</div> */}
        <div className="pill-container">
          {title}
          {data.map((item) => (
            <PillBlock key={item.name} {...item} />
          ))}
        </div>
        </>
    ))}
    <br />
          <div>
        Software Engineer, ART19 <br />
        B.S. Computer Science and Economics, Yale University <br />
        B.A. Political Science, Yale University <br />
        <a
          href="https://www.instagram.com/rencewang/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ marginRight: '0.6rem' }}
          className="bold"
        >
          Instagram
        </a>
        <a
          href="https://www.linkedin.com/in/rencewang/"
          target="_blank"
          rel="noopener noreferrer"
          className="bold"
        >
          LinkedIn
        </a>
      </div>
  </>
);
export default About;
