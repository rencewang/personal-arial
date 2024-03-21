import React, { useState, useEffect } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

import Seo from '../components/seo';
import Dropdown from '../components/dropdown';
import Art from '../content/art/art';

const ArtPage = () => {
  const data = useStaticQuery(graphql`
    query {
      art: allFile(filter: { sourceInstanceName: { eq: "art" } }) {
        edges {
          node {
            name
            childImageSharp {
              gatsbyImageData
            }
          }
        }
      }
    }
  `);

  const capitalize = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

  // Add the queried GatsbyImage to each piece of art
  const piecesWithGatsbyImage = Art.map((piece) => {
    const imageData = data.art.edges.find(
      (node) => node.node.name === piece.name
    );

    return {
      ...piece,
      category: capitalize(piece.category),
      image: getImage(imageData.node),
    };
  });

  const defaultCategory = 'All Art';
  const artCategories = [
    'All Art',
    ...new Set(piecesWithGatsbyImage.map((piece) => piece.category)),
  ];

  const [category, setCategory] = useState(defaultCategory);
  const [displayedArt, setDisplayedArt] = useState(piecesWithGatsbyImage);

  // When category is set, filter the art pieces by category
  const filterArt = () => {
    if (category === defaultCategory) {
      return piecesWithGatsbyImage;
    }
    return piecesWithGatsbyImage.filter((piece) => piece.category === category);
  };

  useEffect(() => {
    setDisplayedArt(filterArt());
  }, [category]);

  // return individual mediums from medium string (delimited by comma), and wrapped in a span
  const renderMedium = (mediums) => {
    return (
      <div className="gallery-medium">
        {mediums.split(',').map((medium, index) => (
          <span className="pill" key={index}>
            {medium.trim()}
          </span>
        ))}
      </div>
    );
  };

  return (
    <section className="gallery">
      <Dropdown
        options={artCategories}
        selected={category}
        setSelected={setCategory}
      />

      {displayedArt.map((piece, index) => (
        <div className="separate gallery-piece">
          {piece.title ? <div className="title">{piece.title}</div> : null}
          <div className="gallery-image" key={index}>
            <GatsbyImage image={piece.image} alt={piece.title || ''} />
          </div>
          {piece.medium ? renderMedium(piece.medium) : null}
        </div>
      ))}
    </section>
  );
};

export default ArtPage;

export const Head = () => <Seo title="Art" />;
