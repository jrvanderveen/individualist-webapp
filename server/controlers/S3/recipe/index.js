const fs = require("fs");
const AWS = require("aws-sdk");

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET,
});

exports.getImages = async (userId, recipeId) => {
    const album = `${userId}/${recipeId}/`;
    const params = {
        Bucket: process.env.BUCKET_NAME,
        Delimiter: "/",
        Prefix: album,
    };
    const images = [];

    const res = await createAlbumIfNotExists(album);
    if (!res.success) {
        return { success: false, error: res.error };
    } else if (res.created === true) {
        return { success: true, images: [] };
    }
    try {
        const getImagesRes = await s3.listObjects(params).promise();
        getImagesRes.Contents.forEach((image) => {
            if (image.Size > 0) {
                images.push(process.env.AWS_S3_USER_IMAGE_BUCKET_URL + encodeURIComponent(image.Key));
            }
        });
        return { success: true, images: images };
    } catch (err) {
        console.log(err);
        return { success: false, error: "Server Error: " + err.message };
    }
};

const createAlbumIfNotExists = async (album) => {
    const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: album,
    };

    try {
        const wait = await s3.headObject(params).promise();
        return { success: true, created: false };
    } catch (err) {
        if (err.code === "NotFound") {
            try {
                let putRes = await s3.putObject(params).promise();
                return { success: true, created: true };
            } catch (err) {
                return { success: false, error: "Server Error: " + err.message };
            }
        }
        return { success: false, error: "Server Error: " + err.message };
    }
};
