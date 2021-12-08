import os
import json
import flask
import datetime
from app import utils

ROOT_PATH = os.environ.get('ROOT_PATH', '/lncrnafp/')
BASE_PATH = os.environ.get('BASE_PATH', 'maayanlab.cloud')

app = flask.Flask(__name__, static_url_path=ROOT_PATH + 'static')
appyters = json.load(open(os.path.join(app.static_folder, "appyters.json")))
g_appyters = {g['gene']: g for g in appyters}
a_appyters = {a['id']: a for a in appyters}


@app.route(ROOT_PATH, methods=['GET'])
def route_index():
    return flask.render_template('index.html', base_path=BASE_PATH)


@app.route(f'{ROOT_PATH}/appyter/<appyter_id>', methods=['GET'])
def route_appyter(appyter_id):
    return flask.render_template('appyter.html', appyter=a_appyters[appyter_id], base_path=BASE_PATH)


@app.route(f'{ROOT_PATH}/gene/<gene>', methods=['GET'])
def route_gene(gene):
    return flask.render_template('appyter.html', appyter=g_appyters[gene], base_path=BASE_PATH)
