import React from "react";
import Layout from "../components/layout";
import { useStaticQuery, graphql } from "gatsby";
import { SEO } from "../components/seo";
import { useCloudWatchRum } from "../hooks/useCloudWatchRum";

const StarWars = () => {
  useCloudWatchRum();

  const data = useStaticQuery(graphql`
    query {
      allStarWarsCharacter {
        nodes {
          name
        }
      }
    }
  `);

  return (
    <Layout pageTitle="StarWars">
      <div className="page-wrapper">
        <div className="home-inner">
          <section>
            <h1>My favorite Star Wars Characters : </h1>
            <ul>
              {data.allStarWarsCharacter.nodes.map(({ name }) => {
                return (
                  <li key={name}>
                    <h2>{name}</h2>
                  </li>
                );
              })}
            </ul>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default StarWars;

export const Head = () => {
  return <SEO />;
};
