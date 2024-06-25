import { graphql, Link, useStaticQuery } from "gatsby";
import React from "react";
import Hero from "./hero";

const Landing = () => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            author
            description
          }
        }
      }
    `
  );

  const { author, description } = site.siteMetadata;

  return (
    <div className="landing">
      <Hero>
        <div>
          <h1>{author}</h1>
          <p>{description}</p>
          <div className="landing-links">
            <Link to="/#contact">Contact</Link>
          </div>
        </div>
      </Hero>
    </div>
  );
};

export default Landing;
