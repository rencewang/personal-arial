import React from "react";

import Seo from "../components/Seo";

const NotFoundPage = () => (
  <>
    <div className="title">This Page Does Not Exist.</div>
    <br />
    <br />
    <div className="subtitle">
      There is no key to their order; some believe the books contain all the
      knowledge of the universe, while others believe they are mere gibberish.
      Somewhere, it is said, there exists a book that explains them all. But no
      one has found it.
    </div>

    <div className="pill">
      <Link to="/">Back to Home</Link>
    </div>
  </>
);

export default NotFoundPage;

export const Head = () => <Seo title="Not Found" />;
