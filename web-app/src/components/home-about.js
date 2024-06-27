import { StaticImage } from "gatsby-plugin-image";
import React from "react";

const About = () => {
    return (
        <div>
            <h2>About Me</h2>
            <div>
                <StaticImage
                    alt="Anton Khudiakov"
                    src="../images/anton.jpg"
                    className="portrait"
                    formats={["auto", "webp", "avif"]}
                />
                <p>
                    Hi! I'm Anton
                </p>
            </div>
        </div>
    );
};

export default About;
