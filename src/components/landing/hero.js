import { StaticImage } from "gatsby-plugin-image";
import React from "react";

const Hero = ({ children }) => {
    return (
        <div style={{ display: "grid" }}>
            <StaticImage
                style={{
                    gridArea: "1/1",
                    maxHeight: "400px",
                }}
                layout="fullWidth"
                alt="Header Image"
                src="../../images/hero.jpg"
                formats={["auto", "webp", "avif"]}
            />
            <div
                style={{
                    gridArea: "1/1",
                    position: "relative",
                    placeItems: "center",
                    display: "grid",
                    color: "var(--color-font-light)",
                    maxWidth: "1080px",
                }}
            >
                {children}
            </div>
        </div>
    );
};

export default Hero;
