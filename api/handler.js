'use strict';
const request = require('request-promise')
const ingestApiUrl = process.env.INGEST_API_URL

const headers = {
    'Content-Type': 'application/json'
}

module.exports.createSubmission = (event, context, callback) => {

    const options = {
        method: 'POST',
        uri: ingestApiUrl + '/submissionEnvelopes',
        headers: headers,
        body: {},
        json: true,
        resolveWithFullResponse: true
    }

    const response = {
        headers: {
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        }
    }

    request(options)
        .then(function (fullResponse) {
            const submissions = {}
            response.statusCode = fullResponse.statusCode
            response.body = JSON.stringify(fullResponse.body.uuid)
            callback(null, response)
        })
        .catch(function (err) {
            console.log(err)
            response.statusCode = 500
            callback(null, response)
        })
}

module.exports.listSubmissions = (event, context, callback) => {

    const options = {
        method: 'GET',
        uri: ingestApiUrl + '/submissionEnvelopes',
        headers: headers,
        qs: {
            sort: 'submissionDate,desc'
        },
        json: true
    }

    const response = {
        headers: {
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        }
    }

    request(options)
        .then(function (apiResponse) {
            const submissions = apiResponse._embedded.submissionEnvelopes
            response.statusCode = 200
            response.body = JSON.stringify(submissions)
            callback(null, response)
        })
        .catch(function (err) {
            console.log(err)
            response.statusCode = 500
            callback(null, response)
        })
}

module.exports.listFiles = (event, context, callback) => {
    const uuid = event.pathParameters.uuid

    const options = {
        method: 'GET',
        uri: ingestApiUrl + '/submissionEnvelopes/' + uuid + '/files',
        headers: headers,
        json: true
    }

    const response = {
        headers: {
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        }
    }

    request(options)
        .then(function (apiResponse) {
            const files = apiResponse._embedded.files
            response.statusCode = 200
            response.body = JSON.stringify(files)
            callback(null, response)
        })
        .catch(function (err) {
            console.log(err)
            response.statusCode = 500
            callback(null, response)
        })
}
