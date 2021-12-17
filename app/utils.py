import requests


def fetch_appyter_data(appyter_id, gene):
    fig6_tissues = requests.get(f'https://appyters.maayanlab.cloud/lncRNA_Appyter/{appyter_id}/tissue_and_cell_line_expression/{gene}_tissue_zscore.csv').text.strip().split('\n')
    fig7_cell_lines = requests.get(f'https://appyters.maayanlab.cloud/lncRNA_Appyter/{appyter_id}/tissue_and_cell_line_expression/{gene}_cell_line_zscore.csv').text.strip().split('\n')
    enrichr_link = requests.get(f'https://appyters.maayanlab.cloud/lncRNA_Appyter/{appyter_id}/enrichment_analysis/{gene}_top_200_correlated_genes_Enrichr_link.txt').text.strip()
    fig6_tissue = fig6_tissues[1].split(',')[0]
    fig7_cell_line = fig7_cell_lines[1].split(',')[0]
    return {'fig6_tissue': fig6_tissue, 'fig7_cell_line': fig7_cell_line, 'enrichr': enrichr_link}


if __name__ == '__main__':
    fetch_appyter_data('1de6fbd77f8e4d3fc0bb14f52033eafa76ecc308', 'HOTAIR')
