import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import { FaGithub, FaMailBulk, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Contact = () => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            author
            social {
              x
              github
              linkedIn
            }
          }
        }
      }
    `
  );

  const config = site.siteMetadata;

  const { x, github, linkedIn } = config.social;

  return (
    <div>
      <h2>
        <FaMailBulk></FaMailBulk> Contact
      </h2>
      <div>
        <p>You can reach out via the following ways:</p>
        <br />
        <br />
        <FaXTwitter></FaXTwitter>:{" "}
        <a href={x}>{x.substring(x.indexOf(".com/") + 5)}</a>
        <br />
        <FaLinkedin></FaLinkedin>: <a href={linkedIn}>{config.author}</a>
        <br />
        <FaGithub></FaGithub>:{" "}
        <a href={github}>{github.substring(github.indexOf(".com/") + 5)}</a>
        <br />
        <p>If you have any questions, feel free to reach out!</p>
      </div>
    </div>
  );
};

export default Contact;
