import React from "react";

import WritingList from "@/components/WritingList";
import About from "@/components/About";
import ProjectList from "@/components/ProjectList";
import Seo from "@/components/Seo";

const Index = () => {
  return (
    <>
      <WritingList />
      <ProjectList />
      <About />
    </>
  );
};

export default Index;

export const Head = () => <Seo title="From the Desk of Lawrence Wang" />;
