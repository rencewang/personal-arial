import React from 'react';

import Seo from '../components/seo';

const NotFoundPage = () => (
  <>
    <Seo title="404" />
    <div id="text">
      <span className="title highlight">This page does not exist.</span>
    </div>
  </>
);

export default NotFoundPage;
