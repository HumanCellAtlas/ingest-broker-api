import json

from api.ingest_api import IngestApi


def create_submission(event, context):
    pass


def list_submissions(event, context):
    response = {}
    try:
        submissions = IngestApi().get_submissions()
        response['statusCode'] = 200
        response['body'] = json.dumps(submissions)
    except Exception as e:
        response['statusCode'] = 500
        response['body'] = e.message
    return response


def list_files(event, context):
    pass
