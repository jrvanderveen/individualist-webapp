const fs = require("fs");
const AWS = require("aws-sdk");

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET,
});

exports.uploadFile = async (filePath, name, userId, recipeId) => {
    // Read content from the file
    const fileContent = fs.readFileSync(filePath);
    const album = `${userId}/${recipeId}/`;
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

exports.emptyS3ImageDirectory = async (userId, recipeId) => {
    const album = `${userId}/${recipeId}/`;
    const params = {
        Bucket: process.env.BUCKET_NAME,
        Prefix: album,
    };
    try {
        const listedObjects = await s3.listObjectsV2(params).promise();
        if (listedObjects.Contents.length === 0) return;

        const deleteParams = {
            Bucket: process.env.BUCKET_NAME,
            Delete: { Objects: [] },
        };

        listedObjects.Contents.forEach(({ Key }) => {
            deleteParams.Delete.Objects.push({ Key });
        });

        await s3.deleteObjects(deleteParams).promise();

        if (listedObjects.IsTruncated) await emptyS3Directory(process.env.BUCKET_NAME, album);
        return {
            success: true,
        };
    } catch (err) {
        return {
            success: false,
            error: err.message,
        };
    }
};
