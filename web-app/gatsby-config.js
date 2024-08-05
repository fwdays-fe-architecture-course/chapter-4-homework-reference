const path = require("path");
const netlifyAdapter = require("gatsby-adapter-netlify").default;

module.exports = {
  siteMetadata: {
    title: "Anton Khudiakov",
    description: "Front End Software Engineer",
    author: "Anton Khudiakov",
    social: {
      x: "https://twitter.com/ahoodiakov",
      github: "https://github.com/akhudiakov97",
      linkedIn: "https://www.linkedin.com/in/ahoodiakov/",
    },
    icon: "favicon.png",
    image: "architectural-diagram-1.png",
  },
  plugins: [
    {
      resolve: "gatsby-plugin-webpack-bundle-analyser-v2",
      options: {
        devMode: true,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: path.join(__dirname, "src", "images"),
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "blog",
        path: path.join(__dirname, "src", "blogposts"),
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "cv",
        path: path.join(__dirname, "src", "cv"),
      },
    },
    "gatsby-plugin-image",
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 1200,
            },
          },
        ],
      },
    },
  ]
};
