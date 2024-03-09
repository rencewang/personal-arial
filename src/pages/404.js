import React from 'react';

import Seo from '../components/seo';

const NotFoundPage = () => (
  <div id="text">
    <span className="title highlight">This page does not exist.</span>
  </div>
);

export default NotFoundPage;

export const Head = () => <Seo title="Not Found" />;
