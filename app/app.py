import os
import json
import flask
from app import utils

ROOT_PATH = os.environ.get('ROOT_PATH', '/lncHUB2/')
BASE_PATH = os.environ.get('BASE_PATH', 'maayanlab.cloud')

app = flask.Flask(__name__, static_url_path=ROOT_PATH + 'static')
lncrns = json.load(open(os.path.join(app.static_folder, "lncrna_mapping.json")))
gene_struct_mapping = json.load(open(os.path.join(app.static_folder, "ss_mapping.json")))


@app.route(ROOT_PATH, methods=['GET'])
def route_index():
    return flask.render_template('index.html', base_path=BASE_PATH)


@app.route(f'{ROOT_PATH}/search/<gene>', methods=['GET'])
def route_search(gene):
    data = {}
    gene = gene.upper()
    gene = lncrns.get(gene, '')
    data['gene'] = gene
    lncrna = True if gene else False
    if lncrna:
        appyter_id = utils.get_appyter_id(gene)
        data['appyter_id'] = appyter_id
        is_ready = utils.check_status(appyter_id, gene)
        data['is_ready'] = is_ready
        data['fig_data'] = utils.fetch_appyter_data(gene)
        data['fig_data']['structure'] = gene_struct_mapping[gene]
    return json.dumps({'success': True, 'data': data}), 200, {'ContentType': 'application/json'}