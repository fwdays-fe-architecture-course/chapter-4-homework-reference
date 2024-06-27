import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import Footer from "./footer";
import Header from "./header";
import "./layout.css";

const Layout = ({ pageTitle, children }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  );

  const { title } = site.siteMetadata;

  return (
    <div>
      <title>{`${title} | ${pageTitle}`}</title>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
