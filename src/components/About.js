import React from "react";

import { interestArray } from "../content/index/index";
import InterestMap from "./InterestMap";

const About = () => (
  <section>
    <div className="subtitle">Regarding</div>
    <div className="details-group">
      <div
        style={{
          paddingTop: "0.2rem",
        }}
      >
        I am a pragmatist. I have a lot of questions about structures and
        narratives. I drift between optimizating and wandering. I wish I could{" "}
        <a
          href="https://open.spotify.com/track/04mAOoQNsXmDJlyupJwmkO?si=0428688ca3b94a9b"
          target="_blank"
          rel="noopener noreferrer"
        >
          know it's for the better
        </a>
        . I am a fan of the world wide web. I am sad that it may die someday.
      </div>
      <br />
      <div>Below are some of my interests.</div>

      <InterestMap interests={interestArray} />

      <div>
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
    </div>
  </section>
);
export default About;
