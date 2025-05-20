import React, { useState, useMemo } from 'react';
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

  // Pre-process art data once, add queried GatsbyImage, capitalize title
  const piecesWithGatsbyImage = useMemo(() => {
    return art.map((piece) => {
      const imageData = data.art.edges.find(
        (node) => node.node.name === piece.name
      );
      return {
        ...piece,
        category:
          piece.category.charAt(0).toUpperCase() + piece.category.slice(1), // capitalize
        image: getImage(imageData?.node),
      };
    });
  }, [data]);

  const defaultCategory = 'All Art';
  const [category, setCategory] = useState(defaultCategory);

  const artCategories = useMemo(
    () => [
      defaultCategory,
      ...new Set(piecesWithGatsbyImage.map((piece) => piece.category)),
    ],
    [piecesWithGatsbyImage]
  );

  // Filter art when category changes
  const displayedArt = useMemo(() => {
    return category === defaultCategory
      ? piecesWithGatsbyImage
      : piecesWithGatsbyImage.filter((piece) => piece.category === category);
  }, [category, piecesWithGatsbyImage]);

  return (
    <>
      <Dropdown
        options={artCategories}
        selected={category}
        setSelected={setCategory}
      />

      {displayedArt.map((piece, index) =>
        piece.title ? (
          <details className="separate-row" key={index} open>
            <summary>
              <span className="subtitle">{piece.title}</span>
            </summary>
            <div className="gallery-image">
              <GatsbyImage image={piece.image} alt={piece.title || ''} />
            </div>
            {piece.medium && (
              <div className="pill-container">
                {piece.medium.split(',').map((medium, i) => (
                  <div className="pill" key={i}>
                    {medium.trim()}
                  </div>
                ))}
              </div>
            )}
          </details>
        ) : (
          <div className="separate-row" key={index} open>
            <div className="gallery-image">
              <GatsbyImage image={piece.image} alt={piece.title || ''} />
            </div>
            {piece.medium && (
              <div className="pill-container">
                {piece.medium.split(',').map((medium, i) => (
                  <div className="pill" key={i}>
                    {medium.trim()}
                  </div>
                ))}
              </div>
            )}
          </div>
        )
      )}
    </>
  );
};

export default ArtList;
