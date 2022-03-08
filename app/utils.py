import requests
import json
import numpy as np


def get_appyter_id(gene):
    url = "https://appyters.maayanlab.cloud/lncRNA_Appyter/"

    payload = json.dumps({
        "gene": gene,
        "fast_compute": False
    })
    headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }

    response = requests.request("POST", url, headers=headers, data=payload)
    return json.loads(response.text)['session_id']


def check_status(appyter_id, gene):
    url = f'https://appyters.maayanlab.cloud/lncRNA_Appyter/{appyter_id}/l1000_sm_predictions/{gene}_l1000_sm_predictions_down.csv'
    response = requests.get(url)
    return True if response.status_code == 200 else False


def fetch_appyter_data(gene):
    fig6_tissues = requests.get(
        f'https://maayanlab-public.s3.amazonaws.com/lnchub2/{gene}/tissue_and_cell_line_expression/{gene}_tissue_zscore.csv').text.strip().split(
        '\n')
    fig7_cell_lines = requests.get(
        f'https://maayanlab-public.s3.amazonaws.com/lnchub2/{gene}/tissue_and_cell_line_expression/{gene}_cell_line_zscore.csv').text.strip().split(
        '\n')
    enrichr_link = requests.get(
        f'https://maayanlab-public.s3.amazonaws.com/lnchub2/{gene}/enrichment_analysis/{gene}_top_200_correlated_genes_Enrichr_link.txt').text.strip()
    fig6_tissue = fig6_tissues[1].split(',')[0]
    fig7_cell_line = fig7_cell_lines[1].split(',')[0]
    return {'fig6_tissue': fig6_tissue, 'fig7_cell_line': fig7_cell_line, 'enrichr': enrichr_link}


def lnc_range(coordinates_json, input_coor):
    chr = input_coor.split(':')[0]
    i_start = int(input_coor.split(':')[1].split('-')[0])
    i_end = int(input_coor.split(':')[1].split('-')[1])

    chr_coor = np.array(coordinates_json[chr]['coordinates']['c'])
    starts = chr_coor[(chr_coor >= i_start) & (chr_coor <= i_end)]

    return [coordinates_json[chr]['start'][str(start)][0] for start in starts]


if __name__ == '__main__':
    print()
