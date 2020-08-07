import React, { useState, useContext } from "react";
import ImageGallery from "react-image-gallery";
import axios from "axios";
import { GlobalContext } from "../../../context/globalState";
import styled from "styled-components";

// Styled components
const GalaryWrapper = styled.div`
    margin-top: 10px;
    width: 30vw;
    @media (max-width: 1200px) {
        width: 40vw;
    }
    @media (max-width: 768px) {
        width: 90vw;
    }
`;

const Button = styled.button`
    z-index: 5;
`;

/*
    SUMMARY:
        Display recipe images

    PARAMS: 
        images

*/
export const ImageGalleryComponent = ({ images, recipeId }) => {
    //Context
    const { uploadRecipeImage } = useContext(GlobalContext);

    // State
    const [inputImage, setInputImage] = useState(null);
    const [errors, setErrors] = useState([]);

    //Functions
    const uploadSelectedFile = (e) => {
        const fd = new FormData();
        fd.append("name", e.target.files[0].name);
        fd.append("recipeId", recipeId);
        fd.append("file", e.target.files[0]);
        uploadRecipeImage(fd, recipeId).then((res) => {
            console.log(res);
            if (res !== "") {
                setErrors([res]);
            } else {
                setErrors([]);
            }
        });
    };

    const renderCustomControls = (props) => {
        return (
            <Button className="image-gallery-icon image-gallery-play-button" onClick={() => inputImage.click()}>
                <input ref={(input) => setInputImage(input)} name="img" type="file" accept="image/*" onChange={(e) => uploadSelectedFile(e)} hidden />
                <div className="image-gallery-svg image-gallery-add-photo">+</div>
            </Button>
        );
    };

    return (
        <>
            {errors.map((error) => (
                <p className="error" key={error}>
                    {error}
                </p>
            ))}
            <GalaryWrapper>
                <ImageGallery items={images} showBullets={true} infinite={true} showPlayButton={false} renderCustomControls={renderCustomControls} />
            </GalaryWrapper>
        </>
    );
};
