import React, { useState, useEffect } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

import Dropdown from './dropdown';
import art from '../content/art/art';

const ArtList = () => {
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
  const piecesWithGatsbyImage = art.map((piece) => {
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
    <section id="art">
      <Dropdown
        options={artCategories}
        selected={category}
        setSelected={setCategory}
      />

      {displayedArt.map((piece, index) =>
        piece.title ? (
          <details className="separate gallery-piece" key={index} open>
            <summary>
              <span className="title">{piece.title}</span>
            </summary>
            <div className="gallery-image">
              <GatsbyImage image={piece.image} alt={piece.title || ''} />
            </div>
            {piece.medium ? renderMedium(piece.medium) : null}
          </details>
        ) : (
          <div className="separate gallery-piece" key={index} open>
            <div className="gallery-image">
              <GatsbyImage image={piece.image} alt={piece.title || ''} />
            </div>
            {piece.medium ? renderMedium(piece.medium) : null}
          </div>
        )
      )}
    </section>
  );
};

export default ArtList;
