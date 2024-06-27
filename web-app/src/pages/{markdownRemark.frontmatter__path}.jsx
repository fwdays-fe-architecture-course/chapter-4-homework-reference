import { graphql } from "gatsby";
import React from "react";
import Layout from "../components/layout";

export default function BlogPostTemplate({ data }) {
    const { markdownRemark: post } = data;
    return (
        <Layout pageTitle={post.frontmatter.title}>
            <div className="page-wrapper">
                <div className="home-inner">
                    <section>
                        <h1>{post.frontmatter.title}</h1>
                        <p style={{ textAlign: "end" }}>
                            <strong>{post.frontmatter.date}</strong>
                        </p>
                        <div
                            className="blog-post-content"
                            dangerouslySetInnerHTML={{ __html: post.html }}
                        />
                    </section>
                </div>
            </div>
        </Layout>
    );
}

export const pageQuery = graphql`
    query ($id: String!) {
        markdownRemark(id: { eq: $id }) {
            html
            frontmatter {
                date(formatString: "MMMM DD, YYYY")
                path
                title
            }
        }
    }
`;
