'use strict'

const AWS = require('aws-sdk');

module.exports.requestUploadUrl = (event, context, callback) => {

    const s3 = new AWS.S3();
    const uploadBucket = process.env.UPLOAD_BUCKET
    const params = queryString.parse(event.body)

    const s3Params = {
        Bucket: uploadBucket,
        Key: params.name,
        ContentType: params.type,
        ACL: 'public-read',
    };

    const uploadURL = s3.getSignedUrl('putObject', s3Params);

    callback(null, {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({uploadURL: uploadURL}),
    })
}