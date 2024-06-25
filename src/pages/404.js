import { Link } from "gatsby";
import React from "react";
import Layout from "../components/layout";

const NotFoundPage = () => (
    <Layout pageTitle="404 Not Found">
        <div className="home-inner">
            <section>
                <h1>404 Page Not Found</h1>
                <p>
                    <Link to="/">home page</Link>
                </p>
            </section>
        </div>
    </Layout>
);

export default NotFoundPage;
