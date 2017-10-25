'use strict';
const request = require('request-promise')
const ingestApiUrl = process.env.INGEST_API_URL

const headers = {
    'Content-Type': 'application/json'
}

module.exports.listSubmissions = (event, context, callback) => {

    const options = {
        method: 'GET',
        uri: ingestApiUrl + '/submissionEnvelopes',
        headers: headers,
        qs: {
            sort: 'submissionDate,desc'
        }
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
            const submissions = {}
            const jsonResponse = JSON.parse(apiResponse)
            response.statusCode = 200
            response.body = JSON.stringify(jsonResponse._embedded.submissionEnvelopes)
            callback(null, response)
        })
        .catch(function (err) {
            console.log(err)
            response.statusCode = 500
            callback(null, response)
        })
}

