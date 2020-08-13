import React from "react";
import styled from "styled-components";

//Styled components
const BackButton = styled.svg`
    enable-background: new 0 0 306 306;
    fill: blue;
    width: 40px;
    height: 40px;
    @media (max-width: 768px) {
        width: 30px;
        height: 30px;
    }
`;

/*
    SUMMARY:
        Home SVG for settings page   

    PARAMS: 

*/
export const BackButtonSvg = () => {
    return (
        <>
            {/* <!-- Generator: Adobe Illustrator 16.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
        <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"/> */}
            <BackButton id="Back" x="0px" y="0px" viewBox="0 0 306 306" xmlSpace="preserve">
                <g>
                    <g id="chevron-left">
                        <polygon points="247.35,35.7 211.65,0 58.65,153 211.65,306 247.35,270.3 130.05,153 		" />
                    </g>
                </g>
            </BackButton>
        </>
    );
};
