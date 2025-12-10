import React from 'react';

import Seo from '../components/seo';

const NotFoundPage = () => (
  <div className="page-content">
    <div style={{ maxWidth: '700px' }}>
      <span className="title">This Page Does Not Exist.</span>
      <br />
      <br />
      <span className="subtitle">
        There is no key to their order; some believe the books
        contain all the knowledge of the universe, while others believe they are
        mere gibberish. Somewhere, it is said, there exists a book that explains
        them all. But no one has found it.
      </span>
    </div>
  </div>
);

export default NotFoundPage;

export const Head = () => <Seo title="Not Found" />;
