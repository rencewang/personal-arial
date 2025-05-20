import React from 'react';

import Seo from '../components/seo';

const NotFoundPage = () => (
  <div className="page-content">
    <div style={{ maxWidth: '700px' }}>
      <span className="title">This Page Does Not Exist.</span>
      <br />
      <br />
      <span className="subtitle">
        The universe (which others call the Library) is composed of an
        indefinite, perhaps infinite number of hexagonal galleries. From any
        hexagon, one can see, interminably, the upper and lower floors. The
        arrangement of the galleries is always the same. Twenty bookshelves per
        side, five shelves per wall, each containing thirty-two books of uniform
        format. Each book, of four hundred and ten pages, is written in an
        unknown alphabet. There is no key to their order; some believe the books
        contain all the knowledge of the universe, while others believe they are
        mere gibberish. Somewhere, it is said, there exists a book that explains
        them all. But no one has found it.
      </span>
    </div>
  </div>
);

export default NotFoundPage;

export const Head = () => <Seo title="Not Found" />;
