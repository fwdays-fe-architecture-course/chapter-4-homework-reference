import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";

const CV = ({ data }) => {
  console.log("data", data);
  const cv = data.allMarkdownRemark.edges[0]?.node; // Safe access with optional chaining

  return (
    <Layout pageTitle="CV">
      <div className="page-wrapper">
        <div className="home-inner">
          <section>
            {cv ? (
              <section>
                <div
                  dangerouslySetInnerHTML={{
                    __html: cv.html,
                  }}
                />
              </section>
            ) : (
              <p>Curriculum Vitae not found.</p> // Handle case where CV file is missing
            )}
          </section>
        </div>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query CVQuery {
    allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/cv.md$/" } }){
        edges {
            node {
                html
                frontmatter {
                    title
                }
            }
        }
    }
  }
`;

export default CV;