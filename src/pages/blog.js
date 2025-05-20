import React from 'react';

import About from '../components/about';
import Seo from '../components/seo';
import WritingList from '../components/writing';

const BlogPage = () => {
  return (
    <div className="blog-grid">
      <section className="page-content border-right left-section">
        <About />
      </section>

      <section className="extra-section" />
      <section className="page-content">
        <WritingList />
      </section>
    </div>
  );
};

export default BlogPage;

export const Head = () => <Seo title="Writing" />;
