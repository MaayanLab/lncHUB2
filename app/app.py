import os
import json
import flask
import datetime
from app import utils

ROOT_PATH = os.environ.get('ROOT_PATH', '/lncrnafp/')
BASE_PATH = os.environ.get('BASE_PATH', 'maayanlab.cloud')

app = flask.Flask(__name__, static_url_path=ROOT_PATH + 'static')


@app.route(ROOT_PATH, methods=['GET'])
def route_index():
    return flask.render_template('index.html', base_path=BASE_PATH)
