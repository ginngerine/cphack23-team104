const AWS = require('aws-sdk');
require('dotenv').config();

// Configuring the AWS environment
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

const s3 = new AWS.S3();

const uploadFileToS3 = (file) => {
    const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: file.name,
        Body: file.content
    };

    return new Promise((resolve, reject) => {
        s3.upload(params, function(err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};
