function copy_to_clipboard(text) {
    navigator.clipboard.writeText(text).then(function () {
        console.log('Async: Copying to clipboard was successful!');
    }, function (err) {
        console.error('Async: Could not copy text: ', err);
    });
}

function fill_enrichment(gene, appyter_id) {
    for (const d of ['positively', 'negatively']) {
        for (const n of [25, 50, 100, 200, 300, 500]) {
            fetch(`https://maayanlab-public.s3.amazonaws.com/lnchub2/${gene}/enrichment_analysis/${gene}_top_${n}_${d}_correlated_genes_Enrichr_link.txt`)
                .then(response => {
                    return {ok: response.ok, text: response.text()}
                })
                .then(async data => {
                    if (data.ok) {
                        let link = await data.text;
                        $(`#enr${n}-${d[0]}`).attr('href', link)
                    }
                })
        }
    }
}

function draw_tables(gene, appyter_id) {
    fetch(`https://maayanlab-public.s3.amazonaws.com/lnchub2/${gene}/gene_info/${gene}_gene_coordinates.csv`)
        .then(response => {
            return {ok: response.ok, text: response.text()}
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
                            {'title': 'Type'},
                            {'title': 'Transcript name'},
                            {'title': 'Ensembl transcript id'},
                            {'title': 'Exon number'},
                            {'title': 'Ensembl exon id'},
                            {'title': 'Coordinates'},
                            {'title': 'Strand'}]
                    })
            }
        })

    fetch(`https://maayanlab-public.s3.amazonaws.com/lnchub2/${gene}/gene_info/${gene}_canonical_sequence.csv`)
        .then(response => {
            return {ok: response.ok, text: response.text()}
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
                            {'title': 'Ensembl transcript id'},
                            {'title': 'Description'},
                            {'title': 'Copy sequence to clipboard'},
                        ]
                    })
            }
        })

    fetch(`https://maayanlab-public.s3.amazonaws.com/lnchub2/${gene}/gene_info/${gene}_alternative_sequence.csv`)
        .then(response => {
            return {ok: response.ok, text: response.text()}
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
                            {'title': 'Ensembl transcript id'},
                            {'title': 'Description'},
                            {'title': 'Copy sequence to clipboard'},
                        ]
                    })
            }
        })

    $('#table1p-blank').hide()
    fetch(`https://maayanlab-public.s3.amazonaws.com/lnchub2/${gene}/gene_correlations/${gene}_positively_correlated_genes.csv`)
        .then(response => {
            return {ok: response.ok, text: response.text()}
        })
        .then(async data => {
                if (data.ok) {
                    let text = await data.text;
                    let dataSet = text.trim().split('\n').slice(1, 100).map(x => [x.split(',')[0], parseFloat(x.split(',')[1])]);
                    $('#table1p').DataTable(
                        {
                            data: dataSet,
                            destroy: true,
                            responsive: true,
                            order: [],
                            columns: [
                                {'title': 'Gene'},
                                {'title': 'Pearson\'s Correlation Coefficient'}
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
    fetch(`https://maayanlab-public.s3.amazonaws.com/lnchub2/${gene}/gene_correlations/${gene}_negatively_correlated_genes.csv`)
        .then(response => {
            return {ok: response.ok, text: response.text()}
        })
        .then(async data => {
                if (data.ok) {
                    let text = await data.text;
                    let dataSet = text.trim().split('\n').slice(1, 100).map(x => [x.split(',')[0], parseFloat(x.split(',')[1])]);
                    $('#table1n').DataTable(
                        {
                            data: dataSet,
                            destroy: true,
                            responsive: true,
                            order: [],
                            columns: [
                                {'title': 'Gene'},
                                {'title': 'Pearson\'s Correlation Coefficient'}
                            ]
                        })
                    $('#tab1n-down').show()
                } else {
                    $('#table1n-blank').show();
                    $('#tab1n-down').hide();
                }
            }
        );

    fetch(`https://maayanlab-public.s3.amazonaws.com/lnchub2/${gene}/gene_correlations/${gene}_positively_correlated_lncRNAs.csv`)
        .then(response => {
            return {ok: response.ok, text: response.text()}
        })
        .then(async data => {
            $('#table2-blank').hide()
            if (data.ok) {
                let text = await data.text;
                let dataSet = text.trim().split('\n').slice(1, 100).map(x => [x.split(',')[0], parseFloat(x.split(',')[1])]);
                $('#table2').DataTable(
                    {
                        data: dataSet,
                        destroy: true,
                        responsive: true,
                        order: [],
                        columns: [
                            {'title': 'Gene'},
                            {'title': 'Pearson\'s Correlation Coefficient'}
                        ]
                    })
                $('#tab2-down').show()
            } else {
                $('#table2-blank').show()
                $('#tab2-down').hide()
            }
        });

    fetch(`https://maayanlab-public.s3.amazonaws.com/lnchub2/${gene}/l1000_sm_predictions/${gene}_l1000_sm_predictions_up.csv`)
        .then(response => {
            return {ok: response.ok, text: response.text()}
        })
        .then(async data => {
            $('#table3-blank').hide()
            if (data.ok) {
                let text = await data.text;
                let dataSet = text.trim().split('\n').slice(1, 100).map(x => {
                        let s = x.split(',');
                        let pval = parseFloat(s[8]);
                        if (pval >= 0.01) {
                            pval = pval.toFixed(2)
                        } else {
                            pval = pval.toExponential(2)
                        }
                        return [parseInt(s[0]), s[1], s[2], s[3], s[4], s[5], s[6], parseFloat(s[7]), pval]
                    }
                );
                $('#table3').DataTable(
                    {
                        data: dataSet,
                        destroy: true,
                        responsive: true,
                        order: [],
                        columns: [
                            {'title': ''},
                            {'title': 'L1000 Signature ID'},
                            {'title': 'Drug'},
                            {'title': 'Up/Down'},
                            {'title': 'Dose'},
                            {'title': 'Cell line'},
                            {'title': 'Time point'},
                            {'title': 'Mean Pearson Correlation'},
                            {'title': 'P-value'}
                        ]
                    })
                $('#tab3-down').show()
            } else {
                $('#table3-blank').show()
                $('#tab3-down').hide()
            }
        });

    fetch(`https://maayanlab-public.s3.amazonaws.com/lnchub2/${gene}/l1000_sm_predictions/${gene}_l1000_sm_predictions_down.csv`)
        .then(response => {
            return {ok: response.ok, text: response.text()}
        })
        .then(async data => {
            $('#table4-blank').hide();
            if (data.ok) {
                let text = await data.text;
                let dataSet = text.trim().split('\n').slice(1, 100).map(x => {
                        let s = x.split(',');
                        let pval = parseFloat(s[8]);
                        if (pval >= 0.01) {
                            pval = pval.toFixed(2)
                        } else {
                            pval = pval.toExponential(2)
                        }
                        return [parseInt(s[0]), s[1], s[2], s[3], s[4], s[5], s[6], parseFloat(s[7]), pval]
                    }
                );
                $('#table4').DataTable(
                    {
                        data: dataSet,
                        destroy: true,
                        responsive: true,
                        order: [],
                        columns: [
                            {'title': ''},
                            {'title': 'L1000 Signature ID'},
                            {'title': 'Drug'},
                            {'title': 'Up/Down'},
                            {'title': 'Dose'},
                            {'title': 'Cell line'},
                            {'title': 'Time point'},
                            {'title': 'Mean Pearson Correlation'},
                            {'title': 'P-value'}
                        ]
                    })
                $('#tab4-down').show();
            } else {
                $('#table4-blank').show();
                $('#tab4-down').hide();
            }
        });
}

function display_results(data) {
    console.log(data)
    if (data.is_ready === true) {
        $('#appyter-action').text('Open in')
    } else {
        $('#appyter-action').text('Start a new appyter in')
    }

    // Update all gene names in text
    $("span.gene-name").each(function (element) {
        $(this).text(data.gene)
    });

    let struct_img_down_ps = `${data.fig_data.structure.slice(0, -4)}.ps`
    let aws = `https://maayanlab-public.s3.amazonaws.com/lnchub2/${data.gene}`
    draw_tables(data.gene, data.appyter_id)
    fill_enrichment(data.gene, data.appyter_id)
    if (data.fig_data.structure !== 'no_structure') {
        $('#struct-img').attr('src', `${aws}/secondary_structure/${data.fig_data.structure}`).attr('alt', `Predicted secondary structure of ${data.gene}.`)
        $('#struct-img-down').attr('href', `${aws}/secondary_structure/${data.fig_data.structure}`)
        $('#struct-img-down-ps').attr('href', `${aws}/secondary_structure/${struct_img_down_ps}`)
    }
    else
    {
        $('#struct-img').attr('src', './static/no_structure.png').attr('alt', 'lncRNA is too long to reliably predict the structure')
        $('#struct-img-down').attr('href', '')
        $('#struct-img-down-ps').attr('href', '')
    }
    $('#appyter-url').attr('href', `${aws}`)
    $('#tab-coord-down').attr('href', `${aws}/gene_info/${data.gene}_gene_coordinates.csv`)
    $('#table-transc-can-down').attr('href', `${aws}/gene_info/${data.gene}_canonical_sequence.csv`)
    $('#table-transc-alt-down').attr('href', `${aws}/gene_info/${data.gene}_alternative_sequence.csv`)
    $('#tab2-down').attr('href', `${aws}/gene_correlations/${data.gene}_correlated_lncRNAs.csv`)
    $('#appyter-fig1-net').attr('href', `${aws}/coexpression_network/${data.gene}_network.html`)
    $('#appyter-fig1-node-meta').attr('href', `${aws}/coexpression_network/${data.gene}_network_node_metadata.csv`)
    $('#appyter-fig1-edge-meta').attr('href', `${aws}/coexpression_network/${data.gene}_network_edge_metadata.csv`)
    // $('#appyter-enrichr-url').attr('href', data.fig_data.enrichr)
    $('#fig-pub-img').attr('src', `${aws}/autorif/${data.gene}_autorif.png`)
    $('#fig-pub-down-png').attr('href', `${aws}/autorif/${data.gene}_autorif.png`)
    $('#fig-pub-down-pdf').attr('href', `${aws}/autorif/${data.gene}_autorif.pdf`)
    $('#fig-pub-down-svg').attr('href', `${aws}/autorif/${data.gene}_autorif.svg`)
    $('#fig-pub-down-csv').attr('href', `${aws}/autorif/${data.gene}_autorif_results.csv`)

    $('#fig4-img').attr('src', `${aws}/tissue_and_cell_line_expression/${data.gene}_zscore_tissue_expression.png`)
    $('#fig4-img').attr('alt', `Figure 5. Z-score (median expression) for the lncRNA ${data.gene} in various tissue types.`)
    $('#fig4-mod-img').attr('src', `${aws}/tissue_and_cell_line_expression/${data.gene}_zscore_tissue_expression.png`)
    $('#fig4-mod-title').text(`Figure 5. Z-score (median expression) for the lncRNA ${data.gene} in various tissue types.`)
    $('#fig4-down').attr('href', `${aws}/tissue_and_cell_line_expression/${data.gene}_tissue_zscore.csv`)
    $('#fig5-img').attr('src', `${aws}/tissue_and_cell_line_expression/${data.gene}_zscore_cell_line_expression.png`)
    $('#fig5-img').attr('alt', `Figure 6. Z-score (median expression) for the lncRNA ${data.gene} in the top 30 cell lines.`)
    $('#fig5-mod-img').attr('src', `${aws}/tissue_and_cell_line_expression/${data.gene}_zscore_cell_line_expression.png`)
    $('#fig5-mod-title').text(`Figure 6. Z-score (median expression) for the lncRNA ${data.gene} in the top 30 cell lines.`)
    $('#fig5-down').attr('href', `${aws}/tissue_and_cell_line_expression/${data.gene}_cell_line_zscore.csv`)
    $('#fig6-img').attr('src', `${aws}/umap/tissues/figures/static/${data.gene}_${data.fig_data.fig6_tissue}_rank1.png`)
    $('#fig6-img').attr('alt', `Figure 7. UMAP was applied to 3,000 randomly selected samples (with tissue type labels) from Recount3. Each data point represents a lncRNA (n=15,862) and are colored by z-score (median expression) in ${data.fig_data.fig6_tissue}.`)
    $('#fig6-mod-img').attr('src', `${aws}/umap/tissues/figures/static/${data.gene}_${data.fig_data.fig6_tissue}_rank1.png`)
    $('#fig6-mod-title').text(`Figure 7. UMAP was applied to 3,000 randomly selected samples (with tissue type labels) from Recount3. Each data point represents a lncRNA (n=15,862) and are colored by z-score (median expression) in ${data.fig_data.fig6_tissue}.`)
    $('#fig6-tissue').text(data.fig_data.fig6_tissue)
    $('#fig7-img').attr('src', `${aws}/umap/cell_lines/figures/static/${data.gene}_${data.fig_data.fig7_cell_line}_rank1.png`)
    $('#fig7-img').attr('alt', `Figure 8. UMAP was applied to 3,000 randomly selected samples (with cell line labels) from Recount3. Each data point represents a lncRNA (n=15,862) and are colored by z-score (median expression) in ${data.fig_data.fig7_cell_line}.`)
    $('#fig7-mod-img').attr('src', `${aws}/umap/cell_lines/figures/static/${data.gene}_${data.fig_data.fig7_cell_line}_rank1.png`)
    $('#fig7-mod-title').text(`Figure 8. UMAP was applied to 3,000 randomly selected samples (with cell line labels) from Recount3. Each data point represents a lncRNA (n=15,862) and are colored by z-score (median expression) in ${data.fig_data.fig7_cell_line}.`)
    $('#fig7-cell').text(data.fig_data.fig7_cell_line)
    $('#fig7-app').attr('href', `${aws}/#visualizing-all-lncrnas-based-on-their-gene-expression-similarity-across-tissues`)
    $('#tab1p-down').attr('href', `${aws}/gene_correlations/${data.gene}_positively_correlated_genes.csv`)
    $('#tab1n-down').attr('href', `${aws}/gene_correlations/${data.gene}_negatively_correlated_genes.csv`)
    $('#tab3-down').attr('href', `${aws}/l1000_sm_predictions/${data.gene}_l1000_sm_predictions_up.csv`)
    $('#tab4-down').attr('href', `${aws}/l1000_sm_predictions/${data.gene}_l1000_sm_predictions_down.csv`)


    // Enrichment figures
    $('#fig-mgi-go-r-img').attr('src', `${aws}/predicted_functions/${data.gene}_biological_function_predictions_f1_right-tailed-pvalue.png`)
    $('#fig-mgi-go-r-img').attr('alt', `Figure 3a. Predicted MGI Mammalian Phenotypes Level 4 2021 and GO Biological Process 2021 for the lncRNA ${data.gene}. Terms are ranked by the right-tailed p-value for the mean Pearson correlation coefficient calculated between each gene set and ${data.gene}.`)
    $('#fig-mgi-go-r-img-png').attr('href', `${aws}/predicted_functions/${data.gene}_biological_function_predictions_f1_right-tailed-pvalue.png`)
    $('#fig-mgi-go-r-img-svg').attr('href', `${aws}/predicted_functions/${data.gene}_biological_function_predictions_f1_right-tailed-pvalue.svg`)
    $('#fig-mgi-go-r-img-pdf').attr('href', `${aws}/predicted_functions/${data.gene}_biological_function_predictions_f1_right-tailed-pvalue.pdf`)
    $('#fig-mgi-go-r-mod-img').attr('src', `${aws}/predicted_functions/${data.gene}_biological_function_predictions_f1_right-tailed-pvalue.png`)
    $('#fig-mgi-go-r-mod-title').text(`Figure 3a. Predicted MGI Mammalian Phenotypes Level 4 2021 and GO Biological Process 2021 for the lncRNA ${data.gene}. Terms are ranked by the right-tailed p-value for the mean Pearson correlation coefficient calculated between each gene set and ${data.gene}.`)
    $('#fig-mgi-go-r-down1').attr('href', `${aws}/predicted_functions/${data.gene}_MGI Mammalian Phenotype Level 4 2021_right-tailed-pvalue.csv`)
    $('#fig-mgi-go-r-down2').attr('href', `${aws}/predicted_functions/${data.gene}_GO Biological Process 2021_right-tailed-pvalue.csv`)
    $('#fig-mgi-go-l-img').attr('src', `${aws}/predicted_functions/${data.gene}_biological_function_predictions_f4_left-tailed-pvalue.png`)
    $('#fig-mgi-go-l-img').attr('alt', `Figure 3b. Predicted MGI Mammalian Phenotypes Level 4 2021 and GO Biological Process 2021 for the lncRNA ${data.gene}. Terms are ranked by the left-tailed p-value for the mean Pearson correlation coefficient calculated between each gene set and ${data.gene}.`)
    $('#fig-mgi-go-l-img-png').attr('href', `${aws}/predicted_functions/${data.gene}_biological_function_predictions_f4_left-tailed-pvalue.png`)
    $('#fig-mgi-go-l-img-svg').attr('href', `${aws}/predicted_functions/${data.gene}_biological_function_predictions_f4_left-tailed-pvalue.svg`)
    $('#fig-mgi-go-l-img-pdf').attr('href', `${aws}/predicted_functions/${data.gene}_biological_function_predictions_f4_left-tailed-pvalue.pdf`)
    $('#fig-mgi-go-l-mod-img').attr('src', `${aws}/predicted_functions/${data.gene}_biological_function_predictions_f4_left-tailed-pvalue.png`)
    $('#fig-mgi-go-l-mod-title').text(`Figure 3b. Predicted MGI Mammalian Phenotypes Level 4 2021 and GO Biological Process 2021 for the lncRNA ${data.gene}. Terms are ranked by the left-tailed p-value for the mean Pearson correlation coefficient calculated between each gene set and ${data.gene}.`)
    $('#fig-mgi-go-l-down1').attr('href', `${aws}/predicted_functions/${data.gene}_MGI Mammalian Phenotype Level 4 2021_left-tailed-pvalue.csv`)
    $('#fig-mgi-go-l-down2').attr('href', `${aws}/predicted_functions/${data.gene}_GO Biological Process 2021_left-tailed-pvalue.csv`)
    $('#fig-kegg-dgn-r-img').attr('src', `${aws}/predicted_functions/${data.gene}_biological_function_predictions_f2_right-tailed-pvalue.png`)
    $('#fig-kegg-dgn-r-img').attr('alt', `Figure 4a. Predicted KEGG pathways and DisGeNET disease terms for the lncRNA ${data.gene}. Terms are ranked by the right-tailed p-value for the mean Pearson correlation coefficient calculated between each gene set and ${data.gene}.`)
    $('#fig-kegg-dgn-r-img-png').attr('href', `${aws}/predicted_functions/${data.gene}_biological_function_predictions_f2_right-tailed-pvalue.png`)
    $('#fig-kegg-dgn-r-img-svg').attr('href', `${aws}/predicted_functions/${data.gene}_biological_function_predictions_f2_right-tailed-pvalue.svg`)
    $('#fig-kegg-dgn-r-img-pdf').attr('href', `${aws}/predicted_functions/${data.gene}_biological_function_predictions_f2_right-tailed-pvalue.pdf`)
    $('#fig-kegg-dgn-r-mod-img').attr('src', `${aws}/predicted_functions/${data.gene}_biological_function_predictions_f2_right-tailed-pvalue.png`)
    $('#fig-kegg-dgn-r-mod-title').text(`Figure 4a. Predicted KEGG pathways and DisGeNET disease terms for the lncRNA ${data.gene}. Terms are ranked by the right-tailed p-value for the mean Pearson correlation coefficient calculated between each gene set and ${data.gene}.`)
    $('#fig-kegg-dgn-r-down1').attr('href', `${aws}/predicted_functions/${data.gene}_KEGG 2021 Human_right-tailed-pvalue.csv`)
    $('#fig-kegg-dgn-r-down2').attr('href', `${aws}/predicted_functions/${data.gene}_DisGeNET_right-tailed-pvalue.csv`)
    $('#fig-kegg-dgn-l-img').attr('src', `${aws}/predicted_functions/${data.gene}_biological_function_predictions_f5_left-tailed-pvalue.png`)
    $('#fig-kegg-dgn-l-img').attr('alt', `Figure 4b. Predicted KEGG pathways and DisGeNET disease terms for the lncRNA ${data.gene}. Terms are ranked by the left-tailed p-value for the mean Pearson correlation coefficient calculated between each gene set and ${data.gene}.`)
    $('#fig-kegg-dgn-l-img-png').attr('href', `${aws}/predicted_functions/${data.gene}_biological_function_predictions_f5_left-tailed-pvalue.png`)
    $('#fig-kegg-dgn-l-img-svg').attr('href', `${aws}/predicted_functions/${data.gene}_biological_function_predictions_f5_left-tailed-pvalue.svg`)
    $('#fig-kegg-dgn-l-img-pdf').attr('href', `${aws}/predicted_functions/${data.gene}_biological_function_predictions_f5_left-tailed-pvalue.pdf`)
    $('#fig-kegg-dgn-l-mod-img').attr('src', `${aws}/predicted_functions/${data.gene}_biological_function_predictions_f5_left-tailed-pvalue.png`)
    $('#fig-kegg-dgn-l-mod-title').text(`Figure 4b. Predicted KEGG pathways and DisGeNET disease terms for the lncRNA ${data.gene}. Terms are ranked by the left-tailed p-value for the mean Pearson correlation coefficient calculated between each gene set and ${data.gene}.`)
    $('#fig-kegg-dgn-l-down1').attr('href', `${aws}/predicted_functions/${data.gene}_KEGG 2021 Human_left-tailed-pvalue.csv`)
    $('#fig-kegg-dgn-l-down2').attr('href', `${aws}/predicted_functions/${data.gene}_DisGeNET_left-tailed-pvalue.csv`)
    $('#fig-chea-enc-r-img').attr('src', `${aws}/predicted_functions/${data.gene}_biological_function_predictions_f3_right-tailed-pvalue.png`)
    $('#fig-chea-enc-r-img').attr('alt', `Figure 5a. Predicted ChEA and ENCODE terms for the lncRNA ${data.gene}. Terms are ranked by the right-tailed p-value for the mean Pearson correlation coefficient calculated between each gene set and ${data.gene}.`)
    $('#fig-chea-enc-r-img-png').attr('href', `${aws}/predicted_functions/${data.gene}_biological_function_predictions_f3_right-tailed-pvalue.png`)
    $('#fig-chea-enc-r-img-svg').attr('href', `${aws}/predicted_functions/${data.gene}_biological_function_predictions_f3_right-tailed-pvalue.svg`)
    $('#fig-chea-enc-r-img-pdf').attr('href', `${aws}/predicted_functions/${data.gene}_biological_function_predictions_f3_right-tailed-pvalue.pdf`)
    $('#fig-chea-enc-r-mod-img').attr('src', `${aws}/predicted_functions/${data.gene}_biological_function_predictions_f3_right-tailed-pvalue.png`)
    $('#fig-chea-enc-r-mod-title').text(`Figure 5a. Predicted ChEA and ENCODE terms for the lncRNA ${data.gene}. Terms are ranked by the right-tailed p-value for the mean Pearson correlation coefficient calculated between each gene set and ${data.gene}.`)
    $('#fig-chea-enc-r-down1').attr('href', `${aws}/predicted_functions/${data.gene}_KEGG 2021 Human_right-tailed-pvalue.csv`)
    $('#fig-chea-enc-r-down2').attr('href', `${aws}/predicted_functions/${data.gene}_DisGeNET_right-tailed-pvalue.csv`)
    $('#fig-chea-enc-l-img').attr('src', `${aws}/predicted_functions/${data.gene}_biological_function_predictions_f6_left-tailed-pvalue.png`)
    $('#fig-chea-enc-l-img').attr('alt', `Figure 5b. Predicted ChEA and ENCODE terms for the lncRNA ${data.gene}. Terms are ranked by the left-tailed p-value for the mean Pearson correlation coefficient calculated between each gene set and ${data.gene}.`)
    $('#fig-chea-enc-l-img-png').attr('href', `${aws}/predicted_functions/${data.gene}_biological_function_predictions_f6_left-tailed-pvalue.png`)
    $('#fig-chea-enc-l-img-svg').attr('href', `${aws}/predicted_functions/${data.gene}_biological_function_predictions_f6_left-tailed-pvalue.svg`)
    $('#fig-chea-enc-l-img-pdf').attr('href', `${aws}/predicted_functions/${data.gene}_biological_function_predictions_f6_left-tailed-pvalue.pdf`)
    $('#fig-chea-enc-l-mod-img').attr('src', `${aws}/predicted_functions/${data.gene}_biological_function_predictions_f6_left-tailed-pvalue.png`)
    $('#fig-chea-enc-l-mod-title').text(`Figure 5b. Predicted ChEA and ENCODE terms for the lncRNA ${data.gene}. Terms are ranked by the left-tailed p-value for the mean Pearson correlation coefficient calculated between each gene set and ${data.gene}.`)
    $('#fig-chea-enc-l-down1').attr('href', `${aws}/predicted_functions/${data.gene}_KEGG 2021 Human_left-tailed-pvalue.csv`)
    $('#fig-chea-enc-l-down2').attr('href', `${aws}/predicted_functions/${data.gene}_DisGeNET_left-tailed-pvalue.csv`)

    $('#results__appyter-card').show();
    $('#navbar-toc').show();
}

function example(gene) {
    $('#search').val(gene);
    search(gene);
}


function convert_coordinates(coordinates) {
    $('#navbar-toc').hide();
    fetch(`coordinates/${coordinates}`)
        .then(response => response.json())
        .then(r => {
            if (r.data.length === 0) {
                $('#coordinates-lncRNA').show()
                $('#coordinates-lncRNA-msg').text('This range doesn\'t have any lncRNAs.')
            } else if (r.data.length <= 5) {
                let genes = r.data.map(x => `<a href="#" onclick="example('${x}');">${x}</a>`);
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
                    $('#not-lncRNA-msg').text(`${gene} does not appear among the 15,862 processed long non-coding RNAs.`)

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
            src: async () => {
                try {
                    // Loading placeholder text
                    document
                        .getElementById("search")
                        .setAttribute("placeholder", "Loading...");
                    // Fetch External Data Source
                    const source = await fetch(
                        "static/lncRNAs.json"
                    );
                    const data = await source.json();
                    // Post Loading placeholder text
                    document
                        .getElementById("search")
                        .setAttribute("placeholder", autoCompleteJS.placeHolder);
                    // Returns Fetched data
                    return data;
                } catch (error) {
                    return error;
                }
            },
            cache: true,
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