import React from "react";

import Player from "../components/player";
import Subscribe from "../components/subscribe";
import {
  interestArray,
  aspirationArray,
  recommendationArray,
} from "../content/index/index";
import "../styles/general.scss";

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

const About = () => (
  <>
    <details open>
      <summary>
        <span className="title">Lawrence Wang</span>
      </summary>
      <div>
        Software Development Engineer, ART19 <br />
        B.S. Computer Science and Economics, Yale University <br />
        B.A. Political Science, Yale University <br />
        <a
          href="https://www.instagram.com/rencewang/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ marginRight: "10px" }}
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
        <Subscribe />
      </div>
    </details>

    <details>
      <summary>
        <span className="title">Is Listening To</span>
      </summary>
      <Player />
    </details>

    {[
      { title: "Has Interests In", data: interestArray },
      { title: "Wishes He Could", data: aspirationArray },
      { title: "Recommends", data: recommendationArray },
    ].map(({ title, data }) => (
      <details key={title} open>
        <summary>
          <span className="title">{title}</span>
        </summary>
        <div className="pill-container">
          {data.map((item) => (
            <PillBlock key={item.name} {...item} />
          ))}
        </div>
      </details>
    ))}
  </>
);
export default About;
