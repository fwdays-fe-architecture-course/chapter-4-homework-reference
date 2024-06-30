import React from "react";
import Layout from "../components/layout";
import { GutterLeft, GutterRight } from "../components/gutter/gutter";
import Landing from "../components/landing/landing";
import About from "../components/home-about";
import Contact from "../components/home-contact";
import { SEO } from "../components/seo";

const Home = () => {
  return (
    <Layout pageTitle="Home Page">
      <Landing />
      <div className="home-layout">
        <GutterLeft />
        <div className="home-inner">
          <section className="about">
            <About />
          </section>
          <section className="contact" id="contact">
            <Contact />
          </section>
        </div>
        <GutterRight />
      </div>
    </Layout>
  );
};

export default Home;

export const Head = () => {
  return <SEO title="Root" />;
};
