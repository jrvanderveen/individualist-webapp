import React from "react";
const Link = ({ className, text, ...props }) => (
    <a {...props} className={className}>
        {text}
    </a>
);

export default Link;
