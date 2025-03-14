import React from 'react';

import ArtList from '../components/art';
import Seo from '../components/seo';

const ArtPage = () => (
  <section className="page-content">
    <ArtList />
  </section>
);

export default ArtPage;

export const Head = () => <Seo title="Art" />;
