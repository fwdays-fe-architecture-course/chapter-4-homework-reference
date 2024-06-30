import React from "react";
import Layout from '../components/layout';
import { SEO } from "../components/seo"

const SSR = ({ serverData }) => {
  return (
    <Layout pageTitle="SSR">
      <div className="page-wrapper">
        <div className="home-inner">
          <section>
            <h2>Server-Side Rendered (SSR) Page</h2>
            <p>
              Current Time in London:{" "}
              {new Date(serverData.time.datetime).toLocaleTimeString()} (UTC
              {serverData.time.utc_offset})
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export async function getServerData() {
  try {
    const response = await fetch(
      "http://worldtimeapi.org/api/timezone/Europe/London"
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        `WorldTimeAPI request failed with status ${response.status}`
      );
    }

    return {
      props: {
        time: {
          datetime: data.datetime,
          utc_offset: data.utc_offset,
        },
      },
    };
  } catch (error) {
    return {
      status: 500,
      headers: {},
      props: {
        time: {
          datetime: "Error while fetching time",
          utc_offset: "",
        },
      },
    };
  }
}

export default SSR;


export const Head = () => (
  <SEO />
)
