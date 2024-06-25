import { graphql, useStaticQuery } from "gatsby";
import React from "react";

const Footer = () => {
    const { site } = useStaticQuery(
        graphql`
            query {
                site {
                    siteMetadata {
                        author
                    }
                }
            }
        `
    );
    const config = site.siteMetadata;
    return (
        <footer>
            <div className="break"></div>
            <div className="footer-content">
                <div>
                    Made with <a href="https://www.gatsbyjs.com">Gatsby</a>,
                </div>
                <div className="break"></div>
                <div>{`© ${new Date().getFullYear()} ${config.author}`}</div>
            </div>
        </footer>
    );
};

export default Footer;
