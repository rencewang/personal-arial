import React, { useState, useEffect } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

import Seo from '../components/seo';
import Dropdown from '../components/dropdown';

const ArtPage = () => {
  const imageQuery = useStaticQuery(graphql`
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

  const defaultCategory = 'Drawing';
  const artCategories = ['Painting', 'Design', 'Drawing'];

  const drawing = [];
  const painting = [];
  const art = [];
  imageQuery.art.edges.map((piece) => {
    const image = getImage(piece.node);
    art.push({ title: piece.node.name, image });
  });
  // imageQuery.painting.edges.map((piece) => painting.push(getImage(piece.node)));
  // imageQuery.design.edges.map((piece) => design.push(getImage(piece.node)));

  console.log(drawing);

  let artContent = {
    'All Art': [...drawing, ...painting, ...art],
    Drawing: art,
    Painting: painting,
    Design: art,
  };

  const [category, setCategory] = useState(defaultCategory);
  const [displayedArt, setDisplayedArt] = useState(artContent[category]);

  useEffect(() => {
    setDisplayedArt(artContent[category]);
  }, [category]);

  // let allArt = [traditional, design, digital];
  // let artNames = ['Painting', 'Design', 'Digital'];

  return (
    <section className="gallery">
      <Dropdown
        options={artCategories}
        selected={category}
        setSelected={setCategory}
      />

      {displayedArt.map((piece, index) => (
        <div>
          {piece.title ? (
            <span className="title highlight">{piece.title}</span>
          ) : null}
          <div className="gallery-image" key={index}>
            <GatsbyImage image={piece.image} alt={piece.title || ''} />
          </div>
        </div>
      ))}

      {/* {allArt.map((category, index) => (
        <details key={index} open={index === allArt.length - 1}>
          <summary>
            <span className="title highlight">{artNames[index]}</span>
          </summary>

          {category.map((data, index) => (
            <div className="gallery-image" key={index}>
              <GatsbyImage image={data} alt={data.name || ''} />
            </div>
          ))}
        </details>
      ))} */}
    </section>
  );
};

export default ArtPage;

export const Head = () => <Seo title="Art" />;
