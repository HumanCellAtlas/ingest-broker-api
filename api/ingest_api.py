import json
import os
import urllib.request

import requests


class IngestApi:
    def __init__(self, url=None):
        if not url and 'INGEST_API' in os.environ:
            url = os.environ['INGEST_API']
            # expand interpolated env vars
            url = os.path.expandvars(url)
        self.url = url if url else "http://localhost:8080"

        self.ingest_api = None
        self.headers = {'Content-type': 'application/json'}
        self.submission_links = {}
        self.load_root()

    def load_root(self):
        if not self.ingest_api:
            reply = urllib.request.urlopen(self.url)
            self.ingest_api = json.load(reply)["_links"]

    def get_submissions(self):
        params = {'sort': 'submissionDate,desc'}
        response = requests.get(self.ingest_api["submissionEnvelopes"]["href"].rsplit("{")[0], params=params,
                         headers=self.headers)
        if response.status_code == requests.codes.ok:
            return json.loads(response.text)["_embedded"]["submissionEnvelopes"]
