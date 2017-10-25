# HCA Ingest Broker API

This project provides a REST API for brokering submissions into HCA Ingest.

API Specification is in [Swagger 2](https://swagger.io/docs/specification/2-0/describing-responses/) format

## Deploy
Deploy a service
```
serverless deploy -v
```

Single function:
```
serverless deploy function -f functionName
```

Single function with event:
```
serverless invoke local --function listFiles --path ./example-requests/listFiles.json
```

## Run locally
serverless invoke local --function functionName

## Run remotely
serverless invoke --function functionName

## View logs
```
serverless logs -f listFiles
```