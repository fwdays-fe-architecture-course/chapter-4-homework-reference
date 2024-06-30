import { graphql, useStaticQuery } from "gatsby";

export const useSiteMetadata = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          author
          social {
            x
            github
            linkedIn
          }
          image
          icon
        }
      }
    }
  `);

  return data.site.siteMetadata;
};
