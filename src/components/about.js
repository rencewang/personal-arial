import React from "react";

import {
  interestArray,
  aspirationArray,
  // recommendationArray,
} from "@/content/index/index";

const PillBlock = ({ name, link, image }) => (
  <span key={name}>
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
    <div className="subtitle">Regarding</div>

    {[
      { title: "I am interested in", data: interestArray },
      { title: "I wish I could", data: aspirationArray },
      // { title: 'Endorses', data: recommendationArray },
    ].map(({ title, data }) => (
      <>
        <div className="pill-container">
          {title}
          {data.map((item) => (
            <PillBlock key={item.name} {...item} />
          ))}
        </div>
      </>
    ))}
    <br />
    <div className="about-links">
      Software Engineer, ART19 <br />
      B.S. Computer Science and Economics, Yale University <br />
      B.A. Political Science, Yale University <br />
      <a
        href="https://www.instagram.com/rencewang/"
        target="_blank"
        rel="noopener noreferrer"
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
