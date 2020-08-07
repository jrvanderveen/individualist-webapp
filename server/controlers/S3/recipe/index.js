const fs = require("fs");
const AWS = require("aws-sdk");

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET,
});

// exports.getImages = async (userId, recipeId) => {
//     const album = `${userId}/${recipeId}/`;
//     const params = {
//         Bucket: process.env.BUCKET_NAME,
//         Delimiter: "/",
//         Prefix: album,
//     };
//     const images = [];

//     const createAlbumRes = await createAlbumIfNotExists(album);
//     if (!createAlbumRes.success) {
//         return { success: false, error: createAlbumRes.error };
//     } else if (createAlbumRes.created === true) {
//         return { success: true, images: [] };
//     }
//     try {
//         const getImagesRes = await s3.listObjects(params).promise();
//         getImagesRes.Contents.sort((a, b) => b.LastModified - a.LastModified).forEach((image) => {
//             if (image.Size > 0) {
//                 images.push(process.env.AWS_S3_USER_IMAGE_BUCKET_URL + encodeURIComponent(image.Key));
//             }
//         });
//         return { success: true, images: images };
//     } catch (err) {
//         console.log(err);
//         return { success: false, error: "Server Error: " + err.message };
//     }
// };

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

exports.uploadFile = async (filePath, name, userId, recipeId) => {
    // Read content from the file
    const fileContent = fs.readFileSync(filePath);
    const album = `${userId}/${recipeId}/`;
    //Ensure folder exists
    const createAlbumRes = await createAlbumIfNotExists(album);
    if (!createAlbumRes.success) {
        return { success: false, error: createAlbumRes.error };
    }
    // Setting up S3 upload parameters
    const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: `${album + Date.now() + "_" + name}`,
        Body: fileContent,
    };

    // Uploading files to the bucket
    try {
        const uploadRes = await s3.upload(params).promise();
        return { success: true, imageURL: uploadRes.Location };
    } catch (err) {
        console.log(err);
        return { success: false, error: "Server Error: " + err.message };
    }
};
