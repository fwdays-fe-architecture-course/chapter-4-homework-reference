import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/layout";
import { useCloudWatchRum } from "../hooks/useCloudWatchRum";

const Blog = ({
  data: {
    allMarkdownRemark: { edges },
  },
}) => {
  useCloudWatchRum();
  // prepare list of posts
  const posts = edges.map((edge) => (
    <div key={edge.node.id} className="blog-list-item">
      <Link to={edge.node.frontmatter.path}>{edge.node.frontmatter.title}</Link>{" "}
      ({edge.node.frontmatter.date})<p>{edge.node.excerpt}</p>
    </div>
  ));

  return (
    <Layout pageTitle="My Blog">
      <div className="page-wrapper">
        <div className="home-inner">
          <section>
            <h1>Blog</h1>
            <p>My blog</p>
            <div>{posts}</div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Blog;

export const pageQuery = graphql`
  query BlogPostsQuery {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/src/blogpost/" } } # Filter by file path
      sort: { frontmatter: { date: DESC } }
    ) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            path
            title
          }
        }
      }
    }
  }
`;
