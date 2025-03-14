import React from 'react';

import Seo from '../components/seo';
import WritingList from '../components/writing';

const BlogPage = () => {
  return (
    <section className="page-content">
      <WritingList />
    </section>
  );
};

export default BlogPage;

export const Head = () => <Seo title="Writing" />;
