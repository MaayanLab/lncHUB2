
const base_path = 'https://maayanlab-public.s3.amazonaws.com/lnchub2/v2'


const human_list = fetch(
    "static/lncRNAs.json"
).then(data => data.json());

const mouse_list = fetch(
    "static/mm_lncRNAs.json"
).then(data => data.json());

const links_div = document.getElementById("links-div")

async function createLinks() {
    human_lncRnas = await human_list
    
    human_lncRnas.map(lncRNA => {
        var a = document.createElement('a');
        var linkText = document.createTextNode(lncRNA);
        a.appendChild(linkText);
        a.title = lncRNA;
        a.href = `#${lncRNA}`;
        links_div.appendChild(a);
        links_div.appendChild(document.createElement('br'));
    })
    mouse_lncRnas = await mouse_list
    mouse_lncRnas.map(lncRNA => {
        var a = document.createElement('a');
        var linkText = document.createTextNode(lncRNA);
        a.appendChild(linkText);
        a.title = lncRNA;
        a.href = `#${lncRNA}`;
        links_div.appendChild(a);
        links_div.appendChild(document.createElement('br'));
    })
}

createLinks()


// update species based on toggle
var species = 'human'
var num_lnc = '18,705'
var gencode = 'v41'
var ensembl = 'Homo_sapiens'
$("#species-toggle").change(function () {
    var isChecked = document.getElementById("species-val").checked;
    if (!isChecked) {
        species = 'human'
        num_lnc = '18,705'
        gencode = 'v41'
        ensembl = 'Homo_sapiens'
        $('#search').val('');
        $('#results').hide();
        $('#localization').show();
        $('#item-4-5').show();
        document.getElementById("examples").innerHTML = `For example <a href="#" onclick="example('HOTAIR');">HOTAIR</a>, <a href="#" onclick="example('MALAT1');">MALAT1</a>,
                                    <a href="#" onclick="example('ENSG00000245532');">ENSG00000245532</a>, <a href="#"
                                    onclick="example('chr7:27,198,574-27,207,260');">chr7:27,198,574-27,207,260</a>`
    } else {
        species = 'mouse'
        num_lnc = '11,274'
        gencode = 'vM30'
        ensembl = 'Mus_musculus'
        $('#search').val('');
        $('#results').hide();
        $('#localization').hide();
        $('#item-4-5').hide();
        document.getElementById("examples").innerHTML = `For example <a href="#" onclick="example('Crnde');">Crnde</a>, <a href="#" onclick="example('Dancr');">Dancr</a>,
                                    <a href="#" onclick="example('ENSMUSG00000097589');">ENSMUSG00000097589</a>, <a href="#"
                                    onclick="example('chr7:27,198,574-27,207,260');">chr7:27,198,574-27,207,260</a>`
    }
});

window.addEventListener('DOMContentLoaded', async () => {
    var url = window.location.href;
    if (!url.includes('#')) {
        return;
    }
    var human_check = await human_list
    var mouse_check = await mouse_list
    var gene = url.split('#')[1];
    if (human_check.includes(gene) || mouse_check.includes(gene)) {
        var isChecked = document.getElementById("species-val").checked;
        if ((human_check.includes(gene) && isChecked) || (mouse_check.includes(gene) && !isChecked)) {
            document.getElementById("species-val").click()
            search(gene)
        } else {
            search(gene)
        }
    }
});


// OPEN GENE LIST IN ENRICHR
function enrich(options) {
    if (typeof options.list === 'undefined') {
        alert('No genes defined.');
        return;
    }

    var description = options.description || "",
        popup = options.popup || false,
        form = document.createElement('form'),
        listField = document.createElement('input'),
        descField = document.createElement('input');

    form.setAttribute('method', 'post');
    form.setAttribute('action', 'https://maayanlab.cloud/Enrichr/enrich');
    if (popup) {
        form.setAttribute('target', '_blank');
    }
    form.setAttribute('enctype', 'multipart/form-data');

    listField.setAttribute('type', 'hidden');
    listField.setAttribute('name', 'list');
    listField.setAttribute('value', options.list);
    form.appendChild(listField);

    descField.setAttribute('type', 'hidden');
    descField.setAttribute('name', 'description');
    descField.setAttribute('value', description);
    form.appendChild(descField);

    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
}


function copy_to_clipboard(text) {
    navigator.clipboard.writeText(text).then(function () {
        console.log('Async: Copying to clipboard was successful!');
    }, function (err) {
        console.error('Async: Could not copy text: ', err);
    });
}



function fill_enrichment(gene, appyter_id) {
    for (const d of ['positively', 'negatively']) {
        fetch(`${base_path}/${species}/${gene}/gene_correlations/${gene}_${d}_correlated_genes.csv`)
            .then(response => {
                return { ok: response.ok, text: response.text() }
            })
            .then(async data => {
                if (data.ok) {
                    let text = await data.text;
                    let genes = text.trim().split('\n').map(x => x.split(',')[0]);
                    for (const n of [25, 50, 100, 200, 300, 500]) {
                        
                        document.getElementById(`enr${n}-${d[0]}`).onclick = function () { 
                            options = {}
                            options.list = genes.splice(1, n).join('\n')
                            options.description = `Top ${n} ${d} correlated genes with the lncRNA: ${gene}`
                            options.popup = true
                            enrich(options) 
                        }
                    }
                }
            }
        );
    }
}


function draw_tables(gene, appyter_id) {
    fetch(`${base_path}/${species}/${gene}/gene_info/${gene}_gene_coordinates.csv`)
        .then(response => {
            return { ok: response.ok, text: response.text() }
        })
        .then(async data => {
            if (data.ok) {
                let text = await data.text;
                let dataSet = text.trim().split('\n').slice(1, 101).map(x => {
                    let s = x.split(',');
                    // return [parseInt(s[0]), s[1], s[2], s[3], s[4], s[5], s[6], parseInt(s[7]), s[8], `${s[12]}:${s[9]}-${s[10]}`, s[11]]
                    return [s[4], s[5], s[6], parseInt(s[7]), s[8], `${s[12]}:${s[9]}-${s[10]}`, s[11]]

                });

                $('#table-coordinates').DataTable(
                    {
                        data: dataSet,
                        destroy: true,
                        responsive: true,
                        order: [],
                        columns: [
                            // {'title': ''},
                            // {'title': 'Gene name'},
                            // {'title': 'Ensembl gene id'},
                            // {'title': 'HGNC id'},
                            { 'title': 'Type' },
                            { 'title': 'Transcript name' },
                            { 'title': 'Ensembl transcript id' },
                            { 'title': 'Exon number' },
                            { 'title': 'Ensembl exon id' },
                            { 'title': 'Coordinates' },
                            { 'title': 'Strand' }]
                    })
            }
        })

    fetch(`${base_path}/${species}/${gene}/gene_info/${gene}_canonical_sequence.csv`)
        .then(response => {
            return { ok: response.ok, text: response.text() }
        })
        .then(async data => {
            if (data.ok) {
                let text = await data.text;
                let dataSet = text.trim().split('\n').slice(1, 10).map(x => {
                    let s = x.split(',');
                    return [s[2], s[3].split(' ').join('; '), `<button class="cp-btn" onclick="copy_to_clipboard('${s[5]}')"><i class="fas fa-copy"></i></button>`]
                });

                $('#table-transc-can').DataTable(
                    {
                        data: dataSet,
                        destroy: true,
                        responsive: true,
                        order: [],
                        columns: [
                            { 'title': 'Ensembl transcript id' },
                            { 'title': 'Description' },
                            { 'title': 'Copy sequence to clipboard' },
                        ]
                    })
            }
        })

    fetch(`${base_path}/${species}/${gene}/gene_info/${gene}_alternative_sequence.csv`)
        .then(response => {
            return { ok: response.ok, text: response.text() }
        })
        .then(async data => {
            if (data.ok) {
                let text = await data.text;
                let dataSet = text.trim().split('\n').slice(1, 10).map(x => {
                    let s = x.split(',');
                    return [s[2], s[3].split(' ').join('; '), `<button class="cp-btn" onclick="copy_to_clipboard('${s[5]}')"><i class="fas fa-copy"></i></button>`]
                });

                $('#table-transc-alt').DataTable(
                    {
                        data: dataSet,
                        destroy: true,
                        responsive: true,
                        order: [],
                        columns: [
                            { 'title': 'Ensembl transcript id' },
                            { 'title': 'Description' },
                            { 'title': 'Copy sequence to clipboard' },
                        ]
                    })
            }
        })

    $('#table1p-blank').hide()
    fetch(`${base_path}/${species}/${gene}/gene_correlations/${gene}_positively_correlated_genes.csv`)
        .then(response => {
            return { ok: response.ok, text: response.text() }
        })
        .then(async data => {
            if (data.ok) {
                let text = await data.text;
                let dataSet = text.trim().split('\n').slice(1, 101).map(x => [x.split(',')[0], parseFloat(x.split(',')[1])]);
                $('#table1p').DataTable(
                    {
                        data: dataSet,
                        destroy: true,
                        responsive: true,
                        order: [],
                        columns: [
                            { 'title': 'Gene' },
                            { 'title': 'Pearson\'s Correlation Coefficient' }
                        ]
                    })
                $('#tab1p-down').show()
            } else {
                $('#table1p-blank').show();
                $('#tab1p-down').hide();
            }
        }
        );

    $('#table1n-blank').hide()
    fetch(`${base_path}/${species}/${gene}/gene_correlations/${gene}_negatively_correlated_genes.csv`)
        .then(response => {
            return { ok: response.ok, text: response.text() }
        })
        .then(async data => {
            if (data.ok) {
                let text = await data.text;
                let dataSet = text.trim().split('\n').slice(1, 101).map(x => [x.split(',')[0], parseFloat(x.split(',')[1])]);
                $('#table1n').DataTable(
                    {
                        data: dataSet,
                        destroy: true,
                        responsive: true,
                        order: [],
                        columns: [
                            { 'title': 'Gene' },
                            { 'title': 'Pearson\'s Correlation Coefficient' }
                        ]
                    })
                $('#tab1n-down').show()
            } else {
                $('#table1n-blank').show();
                $('#tab1n-down').hide();
            }
        }
        );

    fetch(`${base_path}/${species}/${gene}/gene_correlations/${gene}_positively_correlated_lncRNAs.csv`)
        .then(response => {
            return { ok: response.ok, text: response.text() }
        })
        .then(async data => {
            $('#table2-blank').hide()
            if (data.ok) {
                let text = await data.text;
                let dataSet = text.trim().split('\n').slice(1, 101).map(x => [x.split(',')[0], parseFloat(x.split(',')[1])]);
                $('#table2').DataTable(
                    {
                        data: dataSet,
                        destroy: true,
                        responsive: true,
                        order: [],
                        columns: [
                            { 'title': 'Gene' },
                            { 'title': 'Pearson\'s Correlation Coefficient' }
                        ]
                    })
                $('#tab2-down').show()
            } else {
                $('#table2-blank').show()
                $('#tab2-down').hide()
            }
        });

    fetch(`${base_path}/${species}/${gene}/l1000_sm_predictions/${gene}_l1000_sm_predictions_up.csv`)
        .then(response => {
            return { ok: response.ok, text: response.text() }
        })
        .then(async data => {
            $('#table3-blank').hide()
            if (data.ok) {
                let text = await data.text;
                let dataSet = text.trim().split('\n').slice(1, 100).map(x => {
                    let s = x.split(',');
                    let pval = parseFloat(s[4]);
                    if (pval >= 0.01) {
                        pval = pval.toFixed(2)
                    } else {
                        pval = pval.toExponential(2)
                    }
                    return [parseInt(s[0]), s[1], s[2], parseFloat(s[3]), pval]
                }
                );
                $('#table3').DataTable(
                    {
                        data: dataSet,
                        destroy: true,
                        responsive: true,
                        order: [],
                        columns: [
                            { 'title': '' },
                            { 'title': 'Drug' },
                            { 'title': 'Up/Down' },
                            { 'title': 'Mean Pearson Correlation' },
                            { 'title': 'P-value' }
                        ]
                    })
                $('#tab3-down').show()
            } else {
                $('#table3-blank').show()
                $('#tab3-down').hide()
            }
        });

    fetch(`${base_path}/${species}/${gene}/l1000_sm_predictions/${gene}_l1000_sm_predictions_down.csv`)
        .then(response => {
            return { ok: response.ok, text: response.text() }
        })
        .then(async data => {
            $('#table4-blank').hide();
            if (data.ok) {
                let text = await data.text;
                let dataSet = text.trim().split('\n').slice(1, 100).map(x => {
                    let s = x.split(',');
                    let pval = parseFloat(s[4]);
                    if (pval >= 0.01) {
                        pval = pval.toFixed(2)
                    } else {
                        pval = pval.toExponential(2)
                    }
                    return [parseInt(s[0]), s[1], s[2], parseFloat(s[3]), pval]
                }
                );
                $('#table4').DataTable(
                    {
                        data: dataSet,
                        destroy: true,
                        responsive: true,
                        order: [],
                        columns: [
                            { 'title': '' },
                            { 'title': 'Drug' },
                            { 'title': 'Up/Down' },
                            { 'title': 'Mean Pearson Correlation' },
                            { 'title': 'P-value' }
                        ]
                    })
                $('#tab4-down').show();
            } else {
                $('#table4-blank').show();
                $('#tab4-down').hide();
            }
        });

    fetch(`${base_path}/${species}/${gene}/l1000_crispr_predictions/${gene}_l1000_crispr_predictions_up.csv`)
        .then(response => {
            return { ok: response.ok, text: response.text() }
        })
        .then(async data => {
            $('#table5-blank').hide();
            if (data.ok) {
                let text = await data.text;
                let dataSet = text.trim().split('\n').slice(1, 100).map(x => {
                    let s = x.split(',');
                    let pval = parseFloat(s[4]);
                    if (pval >= 0.01) {
                        pval = pval.toFixed(2)
                    } else {
                        pval = pval.toExponential(2)
                    }
                    return [parseInt(s[0]), s[1], s[2], parseFloat(s[3]), pval]
                }
                );
                $('#table5').DataTable(
                    {
                        data: dataSet,
                        destroy: true,
                        responsive: true,
                        order: [],
                        columns: [
                            { 'title': '' },
                            { 'title': 'Drug' },
                            { 'title': 'Up/Down' },
                            { 'title': 'Mean Pearson Correlation' },
                            { 'title': 'P-value' }
                        ]
                    })
                $('#tab5-down').show();
            } else {
                $('#table5-blank').show();
                $('#tab5-down').hide();
            }
        });


    fetch(`${base_path}/${species}/${gene}/l1000_crispr_predictions/${gene}_l1000_crispr_predictions_down.csv`)
        .then(response => {
            return { ok: response.ok, text: response.text() }
        })
        .then(async data => {
            $('#table6-blank').hide();
            if (data.ok) {
                let text = await data.text;
                let dataSet = text.trim().split('\n').slice(1, 100).map(x => {
                    let s = x.split(',');
                    let pval = parseFloat(s[4]);
                    if (pval >= 0.01) {
                        pval = pval.toFixed(2)
                    } else {
                        pval = pval.toExponential(2)
                    }
                    return [parseInt(s[0]), s[1], s[2], parseFloat(s[3]), pval]
                }
                );
                $('#table6').DataTable(
                    {
                        data: dataSet,
                        destroy: true,
                        responsive: true,
                        order: [],
                        columns: [
                            { 'title': '' },
                            { 'title': 'Drug' },
                            { 'title': 'Up/Down' },
                            { 'title': 'Mean Pearson Correlation' },
                            { 'title': 'P-value' }
                        ]
                    })
                $('#tab6-down').show();
            } else {
                $('#table6-blank').show();
                $('#tab6-down').hide();
            }
        });



}



function display_results(data) {
    if (data.is_ready === true) {
        $('#appyter-action').text('Open in')
    } else {
        $('#appyter-action').text('Start a new appyter in')
    }

    // Update all gene names in text
    $("span.gene-name").each(function (element) {
        $(this).text(data.gene)
    });
    $("span.num-lnc").each(function (element) {
        $(this).text(num_lnc)
    });
    $("span.gencode").each(function (element) {
        $(this).text(gencode)
    });
    $("span.ensembl").each(function (element) {
        $(this).text(ensembl)
    });

    let struct_img_down_ps = `${data.fig_data.structure.slice(0, -4)}.ps`
    let struct_img_down_jpg = `${data.fig_data.structure.slice(0, -4)}.jpg`
    let aws2 = `${base_path}/${species}/${data.gene}`
    draw_tables(data.gene, data.appyter_id)
    fill_enrichment(data.gene, data.appyter_id)
    if (data.fig_data.structure !== 'no_structure') {
        $('#struct-img').attr('src', `${base_path}/${species}/secondary-structures/${struct_img_down_jpg}`).attr('alt', `Predicted secondary structure of ${data.gene}.`)
        $('#struct-img-down').attr('href', `${base_path}/${species}/secondary-structures/${struct_img_down_jpg}`)
        $('#struct-img-down-ps').attr('href', `${base_path}/${species}/secondary-structures/${struct_img_down_ps}`)
    }
    else {
        $('#struct-img').attr('src', './static/no_structure.png').attr('alt', 'lncRNA is too long to reliably predict the structure')
        $('#struct-img-down').attr('href', '')
        $('#struct-img-down-ps').attr('href', '')
    }
    $('#appyter-url').attr('href', `https://appyters.maayanlab.cloud/lncHUB2/${data.appyter_id}`)
    $('#tab-coord-down').attr('href', `${aws2}/gene_info/${data.gene}_gene_coordinates.csv`)
    $('#table-transc-can-down').attr('href', `${aws2}/gene_info/${data.gene}_canonical_sequence.csv`)
    $('#table-transc-alt-down').attr('href', `${aws2}/gene_info/${data.gene}_alternative_sequence.csv`)
    $('#tab2-down').attr('href', `${aws2}/gene_correlations/${data.gene}_positively_correlated_lncRNAs.csv`)

    $('#appyter-fig1-net').attr('href', `${aws2}/coexpression_network/${data.gene}_network.html`)
    $('#appyter-fig1-node-meta').attr('href', `${aws2}/coexpression_network/${data.gene}_network_node_metadata.csv`)
    $('#appyter-fig1-edge-meta').attr('href', `${aws2}/coexpression_network/${data.gene}_network_edge_metadata.csv`)
    // $('#appyter-enrichr-url').attr('href', data.fig_data.enrichr)
    $('#fig-pub-img').attr('src', `${aws2}/autorif/${data.gene}_autorif.png`)
    $('#fig-pub-down-png').attr('href', `${aws2}/autorif/${data.gene}_autorif.png`)
    $('#fig-pub-down-pdf').attr('href', `${aws2}/autorif/${data.gene}_autorif.pdf`)
    $('#fig-pub-down-svg').attr('href', `${aws2}/autorif/${data.gene}_autorif.svg`)
    $('#fig-pub-down-csv').attr('href', `${aws2}/autorif/${data.gene}_autorif_results.csv`)

    $('#localization-img').attr('src', `${aws2}/localization/${data.gene}_localization.png`)
    $('#fig-local-png').attr('href', `${aws2}/localization/${data.gene}_localization.png`)
    $('#local-csv').attr('href', `${aws2}/localization/${data.gene}_localization.csv`)

    $('#fig4-img').attr('src', `${aws2}/tissue_and_cell_line_expression/${data.gene}_tissue_expression.png`)
    $('#fig4-img').attr('alt', `Figure 5. Expression statisctis for the lncRNA ${data.gene} in various tissue types.`)
    $('#fig4-mod-img').attr('src', `${aws2}/tissue_and_cell_line_expression/${data.gene}_tissue_expression.png`)
    $('#fig4-mod-title').text(`Figure 5. Expression statistics for the lncRNA ${data.gene} in various tissue types.`)
    $('#fig4-down').attr('href', `${aws2}/tissue_and_cell_line_expression/${data.gene}_tissue_median_expr.csv`)
    $('#fig5-img').attr('src', `${aws2}/tissue_and_cell_line_expression/${data.gene}_cell_line_expression.png`)
    $('#fig5-img').attr('alt', `Figure 6. Expression statistics for the lncRNA ${data.gene} in the top 30 cell lines.`)
    $('#fig5-mod-img').attr('src', `${aws2}/tissue_and_cell_line_expression/${data.gene}_cell_line_expression.png`)
    $('#fig5-mod-title').text(`Figure 6. Expression statistics for the lncRNA ${data.gene} in the top 30 cell lines.`)
    $('#fig5-down').attr('href', `${aws2}/tissue_and_cell_line_expression/${data.gene}_cell_line_median_expr.csv`)
    $('#fig6-img').attr('src', `${aws2}/umap/tissues/figures/static/${data.gene}_${data.fig_data.fig6_tissue}_rank1.png`)
    $('#fig6-img').attr('alt', `Figure 7. UMAP was applied to 3,000 randomly selected samples (with tissue type labels) from ARCHS4. Each data point represents a lncRNA (n=18,705) and are colored by median expression in ${data.fig_data.fig6_tissue}.`)
    $('#fig6-mod-img').attr('src', `${aws2}/umap/tissues/figures/static/${data.gene}_${data.fig_data.fig6_tissue}_rank1.png`)
    $('#fig6-mod-title').text(`Figure 7. UMAP was applied to 3,000 randomly selected samples (with tissue type labels) from ARCHS4. Each data point represents a lncRNA (n=18,705) and are colored by median expression in ${data.fig_data.fig6_tissue}.`)
    $('#fig6-tissue').text(data.fig_data.fig6_tissue)
    $('#fig7-img').attr('src', `${aws2}/umap/cell_lines/figures/static/${data.gene}_${data.fig_data.fig7_cell_line}_rank1.png`)
    $('#fig7-img').attr('alt', `Figure 8. UMAP was applied to 3,000 randomly selected samples (with cell line labels) from ARCHS4. Each data point represents a lncRNA (n=18,705) and are colored by median expression in ${data.fig_data.fig7_cell_line}.`)
    $('#fig7-mod-img').attr('src', `${aws2}/umap/cell_lines/figures/static/${data.gene}_${data.fig_data.fig7_cell_line}_rank1.png`)
    $('#fig7-mod-title').text(`Figure 8. UMAP was applied to 3,000 randomly selected samples (with cell line labels) from ARCHS4. Each data point represents a lncRNA (n=18,705) and are colored by median expression in ${data.fig_data.fig7_cell_line}.`)
    $('#fig7-cell').text(data.fig_data.fig7_cell_line)
    $('#fig7-app').attr('href', `${aws2}/#visualizing-all-lncrnas-based-on-their-gene-expression-similarity-across-tissues`)
    $('#tab1p-down').attr('href', `${aws2}/gene_correlations/${data.gene}_positively_correlated_genes.csv`)
    $('#tab1n-down').attr('href', `${aws2}/gene_correlations/${data.gene}_negatively_correlated_genes.csv`)
    $('#tab3-down').attr('href', `${aws2}/l1000_sm_predictions/${data.gene}_l1000_sm_predictions_up.csv`)
    $('#tab4-down').attr('href', `${aws2}/l1000_sm_predictions/${data.gene}_l1000_sm_predictions_down.csv`)
    $('#tab5-down').attr('href', `${aws2}/l1000_crispr_predictions/${data.gene}_l1000_crispr_predictions_up.csv`)
    $('#tab6-down').attr('href', `${aws2}/l1000_crispr_predictions/${data.gene}_l1000_crispr_predictions_down.csv`)


    // Enrichment figures
    $('#fig-mgi-go-r-img').attr('src', `${aws2}/predicted_functions/${data.gene}_biological_function_predictions_f1_right-tailed-pvalue.png`)
    $('#fig-mgi-go-r-img').attr('alt', `Figure 3a. Predicted MGI Mammalian Phenotypes Level 4 2021 and GO Biological Process 2021 for the lncRNA ${data.gene}. Terms are ranked by the right-tailed p-value for the mean Pearson correlation coefficient calculated between each gene set and ${data.gene}.`)
    $('#fig-mgi-go-r-img-png').attr('href', `${aws2}/predicted_functions/${data.gene}_biological_function_predictions_f1_right-tailed-pvalue.png`)
    $('#fig-mgi-go-r-img-svg').attr('href', `${aws2}/predicted_functions/${data.gene}_biological_function_predictions_f1_right-tailed-pvalue.svg`)
    $('#fig-mgi-go-r-img-pdf').attr('href', `${aws2}/predicted_functions/${data.gene}_biological_function_predictions_f1_right-tailed-pvalue.pdf`)
    $('#fig-mgi-go-r-mod-img').attr('src', `${aws2}/predicted_functions/${data.gene}_biological_function_predictions_f1_right-tailed-pvalue.png`)
    $('#fig-mgi-go-r-mod-title').text(`Figure 3a. Predicted MGI Mammalian Phenotypes Level 4 2021 and GO Biological Process 2021 for the lncRNA ${data.gene}. Terms are ranked by the right-tailed p-value for the mean Pearson correlation coefficient calculated between each gene set and ${data.gene}.`)
    $('#fig-mgi-go-r-down1').attr('href', `${aws2}/predicted_functions/${data.gene}_MGI Mammalian Phenotype Level 4 2021_right-tailed-pvalue.csv`)
    $('#fig-mgi-go-r-down2').attr('href', `${aws2}/predicted_functions/${data.gene}_GO Biological Process 2021_right-tailed-pvalue.csv`)
    $('#fig-mgi-go-l-img').attr('src', `${aws2}/predicted_functions/${data.gene}_biological_function_predictions_f4_left-tailed-pvalue.png`)
    $('#fig-mgi-go-l-img').attr('alt', `Figure 3b. Predicted MGI Mammalian Phenotypes Level 4 2021 and GO Biological Process 2021 for the lncRNA ${data.gene}. Terms are ranked by the left-tailed p-value for the mean Pearson correlation coefficient calculated between each gene set and ${data.gene}.`)
    $('#fig-mgi-go-l-img-png').attr('href', `${aws2}/predicted_functions/${data.gene}_biological_function_predictions_f4_left-tailed-pvalue.png`)
    $('#fig-mgi-go-l-img-svg').attr('href', `${aws2}/predicted_functions/${data.gene}_biological_function_predictions_f4_left-tailed-pvalue.svg`)
    $('#fig-mgi-go-l-img-pdf').attr('href', `${aws2}/predicted_functions/${data.gene}_biological_function_predictions_f4_left-tailed-pvalue.pdf`)
    $('#fig-mgi-go-l-mod-img').attr('src', `${aws2}/predicted_functions/${data.gene}_biological_function_predictions_f4_left-tailed-pvalue.png`)
    $('#fig-mgi-go-l-mod-title').text(`Figure 3b. Predicted MGI Mammalian Phenotypes Level 4 2021 and GO Biological Process 2021 for the lncRNA ${data.gene}. Terms are ranked by the left-tailed p-value for the mean Pearson correlation coefficient calculated between each gene set and ${data.gene}.`)
    $('#fig-mgi-go-l-down1').attr('href', `${aws2}/predicted_functions/${data.gene}_MGI Mammalian Phenotype Level 4 2021_left-tailed-pvalue.csv`)
    $('#fig-mgi-go-l-down2').attr('href', `${aws2}/predicted_functions/${data.gene}_GO Biological Process 2021_left-tailed-pvalue.csv`)
    $('#fig-kegg-dgn-r-img').attr('src', `${aws2}/predicted_functions/${data.gene}_biological_function_predictions_f2_right-tailed-pvalue.png`)
    $('#fig-kegg-dgn-r-img').attr('alt', `Figure 4a. Predicted KEGG pathways and DisGeNET disease terms for the lncRNA ${data.gene}. Terms are ranked by the right-tailed p-value for the mean Pearson correlation coefficient calculated between each gene set and ${data.gene}.`)
    $('#fig-kegg-dgn-r-img-png').attr('href', `${aws2}/predicted_functions/${data.gene}_biological_function_predictions_f2_right-tailed-pvalue.png`)
    $('#fig-kegg-dgn-r-img-svg').attr('href', `${aws2}/predicted_functions/${data.gene}_biological_function_predictions_f2_right-tailed-pvalue.svg`)
    $('#fig-kegg-dgn-r-img-pdf').attr('href', `${aws2}/predicted_functions/${data.gene}_biological_function_predictions_f2_right-tailed-pvalue.pdf`)
    $('#fig-kegg-dgn-r-mod-img').attr('src', `${aws2}/predicted_functions/${data.gene}_biological_function_predictions_f2_right-tailed-pvalue.png`)
    $('#fig-kegg-dgn-r-mod-title').text(`Figure 4a. Predicted KEGG pathways and DisGeNET disease terms for the lncRNA ${data.gene}. Terms are ranked by the right-tailed p-value for the mean Pearson correlation coefficient calculated between each gene set and ${data.gene}.`)
    $('#fig-kegg-dgn-r-down1').attr('href', `${aws2}/predicted_functions/${data.gene}_KEGG 2021 Human_right-tailed-pvalue.csv`)
    $('#fig-kegg-dgn-r-down2').attr('href', `${aws2}/predicted_functions/${data.gene}_DisGeNET_right-tailed-pvalue.csv`)
    $('#fig-kegg-dgn-l-img').attr('src', `${aws2}/predicted_functions/${data.gene}_biological_function_predictions_f5_left-tailed-pvalue.png`)
    $('#fig-kegg-dgn-l-img').attr('alt', `Figure 4b. Predicted KEGG pathways and DisGeNET disease terms for the lncRNA ${data.gene}. Terms are ranked by the left-tailed p-value for the mean Pearson correlation coefficient calculated between each gene set and ${data.gene}.`)
    $('#fig-kegg-dgn-l-img-png').attr('href', `${aws2}/predicted_functions/${data.gene}_biological_function_predictions_f5_left-tailed-pvalue.png`)
    $('#fig-kegg-dgn-l-img-svg').attr('href', `${aws2}/predicted_functions/${data.gene}_biological_function_predictions_f5_left-tailed-pvalue.svg`)
    $('#fig-kegg-dgn-l-img-pdf').attr('href', `${aws2}/predicted_functions/${data.gene}_biological_function_predictions_f5_left-tailed-pvalue.pdf`)
    $('#fig-kegg-dgn-l-mod-img').attr('src', `${aws2}/predicted_functions/${data.gene}_biological_function_predictions_f5_left-tailed-pvalue.png`)
    $('#fig-kegg-dgn-l-mod-title').text(`Figure 4b. Predicted KEGG pathways and DisGeNET disease terms for the lncRNA ${data.gene}. Terms are ranked by the left-tailed p-value for the mean Pearson correlation coefficient calculated between each gene set and ${data.gene}.`)
    $('#fig-kegg-dgn-l-down1').attr('href', `${aws2}/predicted_functions/${data.gene}_KEGG 2021 Human_left-tailed-pvalue.csv`)
    $('#fig-kegg-dgn-l-down2').attr('href', `${aws2}/predicted_functions/${data.gene}_DisGeNET_left-tailed-pvalue.csv`)
    $('#fig-chea-enc-r-img').attr('src', `${aws2}/predicted_functions/${data.gene}_biological_function_predictions_f3_right-tailed-pvalue.png`)
    $('#fig-chea-enc-r-img').attr('alt', `Figure 5a. Predicted ChEA and ENCODE terms for the lncRNA ${data.gene}. Terms are ranked by the right-tailed p-value for the mean Pearson correlation coefficient calculated between each gene set and ${data.gene}.`)
    $('#fig-chea-enc-r-img-png').attr('href', `${aws2}/predicted_functions/${data.gene}_biological_function_predictions_f3_right-tailed-pvalue.png`)
    $('#fig-chea-enc-r-img-svg').attr('href', `${aws2}/predicted_functions/${data.gene}_biological_function_predictions_f3_right-tailed-pvalue.svg`)
    $('#fig-chea-enc-r-img-pdf').attr('href', `${aws2}/predicted_functions/${data.gene}_biological_function_predictions_f3_right-tailed-pvalue.pdf`)
    $('#fig-chea-enc-r-mod-img').attr('src', `${aws2}/predicted_functions/${data.gene}_biological_function_predictions_f3_right-tailed-pvalue.png`)
    $('#fig-chea-enc-r-mod-title').text(`Figure 5a. Predicted ChEA and ENCODE terms for the lncRNA ${data.gene}. Terms are ranked by the right-tailed p-value for the mean Pearson correlation coefficient calculated between each gene set and ${data.gene}.`)
    $('#fig-chea-enc-r-down1').attr('href', `${aws2}/predicted_functions/${data.gene}_KEGG 2021 Human_right-tailed-pvalue.csv`)
    $('#fig-chea-enc-r-down2').attr('href', `${aws2}/predicted_functions/${data.gene}_DisGeNET_right-tailed-pvalue.csv`)
    $('#fig-chea-enc-l-img').attr('src', `${aws2}/predicted_functions/${data.gene}_biological_function_predictions_f6_left-tailed-pvalue.png`)
    $('#fig-chea-enc-l-img').attr('alt', `Figure 5b. Predicted ChEA and ENCODE terms for the lncRNA ${data.gene}. Terms are ranked by the left-tailed p-value for the mean Pearson correlation coefficient calculated between each gene set and ${data.gene}.`)
    $('#fig-chea-enc-l-img-png').attr('href', `${aws2}/predicted_functions/${data.gene}_biological_function_predictions_f6_left-tailed-pvalue.png`)
    $('#fig-chea-enc-l-img-svg').attr('href', `${aws2}/predicted_functions/${data.gene}_biological_function_predictions_f6_left-tailed-pvalue.svg`)
    $('#fig-chea-enc-l-img-pdf').attr('href', `${aws2}/predicted_functions/${data.gene}_biological_function_predictions_f6_left-tailed-pvalue.pdf`)
    $('#fig-chea-enc-l-mod-img').attr('src', `${aws2}/predicted_functions/${data.gene}_biological_function_predictions_f6_left-tailed-pvalue.png`)
    $('#fig-chea-enc-l-mod-title').text(`Figure 5b. Predicted ChEA and ENCODE terms for the lncRNA ${data.gene}. Terms are ranked by the left-tailed p-value for the mean Pearson correlation coefficient calculated between each gene set and ${data.gene}.`)
    $('#fig-chea-enc-l-down1').attr('href', `${aws2}/predicted_functions/${data.gene}_KEGG 2021 Human_left-tailed-pvalue.csv`)
    $('#fig-chea-enc-l-down2').attr('href', `${aws2}/predicted_functions/${data.gene}_DisGeNET_left-tailed-pvalue.csv`)

    $('#results__appyter-card').show();
    $('#navbar-toc').show();
}

function example(gene) {
    $('#navbar-toc').hide()
    $('#search').val(gene);
    search(gene);
}


function convert_coordinates(coordinates) {
    $('#navbar-toc').hide();
    fetch(`coordinates/${coordinates}`)
        .then(response => response.json())
        .then(async r => {
            if (r.data.length === 0) {
                $('#coordinates-lncRNA').show()
                $('#coordinates-lncRNA-msg').text('This range doesn\'t have any lncRNAs.')
                return;
            }
            var check_list = await human_list
            if (species == 'mouse') {
                check_list = await mouse_list
            }
            var genes_species = r.data.filter(function (value) {
                return check_list.includes(value);
            });
            let genes = genes_species.map(x => `<a href="#" onclick="example('${x}');">${x}</a>`);
            if (genes_species.length === 0) {
                $('#coordinates-lncRNA').show()
                $('#coordinates-lncRNA-msg').text('This range doesn\'t have any lncRNAs.')
                return;
            }
            else if (genes_species.length <= 5) {
                $('#coordinates-lncRNA').show()
                $('#coordinates-lncRNA-msg').html(`${genes.join(", ")} found in this range.`)
            } else {
                $('#coordinates-lncRNA').show()
                $('#coordinates-lncRNA-msg').text('This coordinates range contains at least five lncRNAs. Consider reducing it.')
            }
        });
}


function search(gene) {
    $('#results__appyter-card').hide();
    $('#not-lncRNA').hide()
    $('#coordinates-lncRNA').hide()

    fetch(`search/${gene}`)
        .then(response => response.json())
        .then(r => {
            if (r.data.lncrna === true) {

                fetch(`gene/${gene}`)
                    .then(response => response.json())
                    .then(r => {
                        let d = r.data;
                        let start = d.start, end = d.end, chr = d.chr;
                        $('#lncrn-coor').text(`${chr}:${start}-${end}`)
                        $('#ucsc-url').attr('href', `https://genome.ucsc.edu/cgi-bin/hgTracks?db=hg38&lastVirtModeType=default&lastVirtModeExtraState=&virtModeType=default&virtMode=0&nonVirtPosition=&position=${chr}%3A${start}-${end}`)
                    })

                let res_element = $('#results');
                display_results(r.data);
                res_element.show();
                // Scroll to 'Results' on 'Submit' click
                $('body').animate({
                    scrollTop: res_element.offset().top
                }, 300, function () {
                    window.location.hash = `#${gene}`;
                });
            } else {
                let chr = '';
                if (gene.split(':').length === 2) {
                    chr = gene.split(':')[0].slice(0, 3)
                }

                if (chr !== '') {
                    convert_coordinates(gene);
                } else {
                    $('#not-lncRNA').show()
                    if (species == 'human') {
                        $('#not-lncRNA-msg').text(`${gene} does not appear among the 18,705 processed human long non-coding RNAs.`)
                    } else {
                        $('#not-lncRNA-msg').text(`${gene} does not appear among the 11,274 processed mouse long non-coding RNAs.`)
                    }

                }
            }
        });
}




(function () {
    $('#search').val('');
    const autoCompleteJS = new autoComplete({
        selector: "#search",
        placeHolder: "Input a gene symbol or an Ensembl ID",
        data: {
            src: function (query) {
                if (species == 'mouse') {
                    return mouse_list
                }
                else {
                    return human_list
                }
            }

        },
        resultsList: {
            element: (list, data) => {
                const info = document.createElement("p");
                if (data.results.length > 0) {
                    info.innerHTML = `Displaying <strong>${data.results.length}</strong> out of <strong>${data.matches.length}</strong> results`;
                } else {
                    info.innerHTML = `Found <strong>${data.matches.length}</strong> matching results for <strong>"${data.query}"</strong>`;
                }
                list.prepend(info);
            },
            noResults: true,
            maxResults: 15,
            tabSelect: true
        },
        resultItem: {
            highlight: true
        },
        events: {
            input: {
                selection: (event) => {
                    autoCompleteJS.input.value = event.detail.selection.value;
                    search(event.detail.selection.value);
                }
            }
        }
    });

})();


