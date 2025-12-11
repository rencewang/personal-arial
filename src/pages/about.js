import React from "react";

import WritingList from "../components/WritingList";
import About from "../components/About";
import ProjectList from "../components/ProjectList";
import Seo from "../components/Seo";

const AboutPage = () => {
  return (
    <>
      <WritingList />
      <ProjectList />
      <About />
    </>
  );
};

export default AboutPage;

export const Head = () => <Seo title="From the Desk of Lawrence Wang" />;
