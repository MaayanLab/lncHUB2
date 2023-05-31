import requests
import json
import numpy as np


base_url = 'https://maayanlab-public.s3.amazonaws.com/lnchub2/v2'


def get_appyter_id(gene, species):
    url = "https://appyters.maayanlab.cloud/lncHUB2/"

    if species == 'human':
        species = 'Human'
        gene_input = 'Homo_sapiens'
    else:
        species = 'Mouse'
        gene_input = 'Mus_musculus'

    payload = json.dumps({
        "species_input": species, 
        gene_input: gene,
        "fast_compute": False
    })
    headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
    try:
        response = requests.request("POST", url, headers=headers, data=payload, timeout=5)
        return json.loads(response.text)['session_id']
    except: 
        return ''


def check_status(appyter_id, gene):
    url = f'https://appyters.maayanlab.cloud/lncHUB2/{appyter_id}/l1000_sm_predictions/{gene}_l1000_sm_predictions_down.csv'
    try:
        response = requests.get(url, timeout=5)
        return True if response.status_code == 200 else False
    except:
        return False

def fetch_appyter_data(gene, species):
    fig6_tissues = requests.get(
        f'{base_url}/{species.lower()}/{gene}/tissue_and_cell_line_expression/{gene}_tissue_median_expr.csv').text.strip().split(
        '\n')
    
    fig7_cell_lines = requests.get(
        f'{base_url}/{species.lower()}/{gene}/tissue_and_cell_line_expression/{gene}_cell_line_median_expr.csv').text.strip().split(
        '\n')
    enrichr_link = requests.get(
        f'{base_url}/{species.lower()}/{gene}/enrichment_analysis/{gene}_top_200_correlated_genes_Enrichr_link.txt').text.strip()
    fig6_tissue = fig6_tissues[0].split(',')[2]
    fig7_cell_line = fig7_cell_lines[0].split(',')[2]
    return {'fig6_tissue': fig6_tissue, 'fig7_cell_line': fig7_cell_line, 'enrichr': enrichr_link}


def lnc_range(coordinates_json, input_coor):
    input_coor = input_coor.replace(',', '')
    chr = input_coor.split(':')[0]
    i_start = int(input_coor.split(':')[1].split('-')[0])
    i_end = int(input_coor.split(':')[1].split('-')[1])

    chr_coor = np.array(coordinates_json[chr]['coordinates']['c'])
    starts = chr_coor[(chr_coor >= i_start) & (chr_coor <= i_end)]

    return list(set(coordinates_json[chr]['start'][str(start)][0] for start in starts))


if __name__ == '__main__':
    print()
    
