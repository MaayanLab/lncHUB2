function draw_tables(gene) {
    $('#table1-blank').hide()
    fetch(`https://maayanlab-public.s3.amazonaws.com/lnchub2/${gene}/gene_correlations/${gene}_correlated_genes.csv`)
        .then(response => {
            return {ok: response.ok, text: response.text()}
        })
        .then(async data => {
                if (data.ok) {
                    let text = await data.text;
                    let dataSet = text.trim().split('\n').slice(1, 100).map(x => [x.split(',')[0], parseFloat(x.split(',')[1])]);
                    $('#table1').DataTable(
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
                    $('#tab1-down').show()
                } else {
                    $('#table1-blank').show();
                    $('#tab1-down').hide();
                }
            }
        );

    fetch(`https://maayanlab-public.s3.amazonaws.com/lnchub2/${gene}/gene_correlations/${gene}_correlated_lncRNAs.csv`)
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
                        return [parseInt(s[0]), s[1], s[2], s[3], s[4], s[5], s[6], parseFloat(s[7])]
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
                            {'title': 'Mean Pearson Correlation'}
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
                        return [parseInt(s[0]), s[1], s[2], s[3], s[4], s[5], s[6], parseFloat(s[7])]
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
                            {'title': 'Mean Pearson Correlation'}
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
    if (data.is_ready === true) {
        $('#appyter-action').text('Open in')
    } else {
        $('#appyter-action').text('Start a new appyter in')
    }

    // Update all gene names in text
    $("span.gene-name").each(function (element) {
        $(this).text(data.gene)
    });
    draw_tables(data.gene)
    $('#struct-img').attr('src', `https://maayanlab-public.s3.amazonaws.com/lnchub2/${data.gene}/secondary_structure/${data.fig_data.structure}`)
    $('#struct-img').attr('alt', `Predicted secondary structure of ${data.gene}.`)
    $('#struct-img-down').attr('href', `https://maayanlab-public.s3.amazonaws.com/lnchub2/${data.gene}/secondary_structure/${data.fig_data.structure}`)
    $('#appyter-url').attr('href', `https://appyters.maayanlab.cloud/lncRNA_Appyter/${data.appyter_id}`)
    $('#tab1-down').attr('href', `https://maayanlab-public.s3.amazonaws.com/lnchub2/${data.gene}/gene_correlations/${data.gene}_correlated_genes.csv`)
    $('#tab2-down').attr('href', `https://maayanlab-public.s3.amazonaws.com/lnchub2/${data.gene}/gene_correlations/${data.gene}_correlated_lncRNAs.csv`)
    $('#appyter-fig1-net').attr('href', `https://maayanlab-public.s3.amazonaws.com/lnchub2/${data.gene}/coexpression_network/${data.gene}_network.html`)
    $('#appyter-fig1-node-meta').attr('href', `https://maayanlab-public.s3.amazonaws.com/lnchub2/${data.gene}/coexpression_network/${data.gene}_network_node_metadata.csv`)
    $('#appyter-fig1-edge-meta').attr('href', `https://maayanlab-public.s3.amazonaws.com/lnchub2/${data.gene}/coexpression_network/${data.gene}_network_edge_metadata.csv`)
    $('#appyter-enrichr-url').attr('href', data.fig_data.enrichr)
    $('#fig2-img').attr('src', `https://maayanlab-public.s3.amazonaws.com/lnchub2/${data.gene}/predicted_functions/${data.gene}_biological_function_predictions_figure2.png`)
    $('#fig2-img').attr('alt', `Figure 2. Predicted MGI Mammalian Phenotypes and GO Biological Processes for the lncRNA ${data.gene}. Terms are ranked by averaging the mean Pearson correlation coefficients between each gene in a gene set and ${data.gene}.`)
    $('#fig2-mod-img').attr('src', `https://maayanlab-public.s3.amazonaws.com/lnchub2/${data.gene}/predicted_functions/${data.gene}_biological_function_predictions_figure2.png`)
    $('#fig2-mod-title').text(`Figure 2. Predicted MGI Mammalian Phenotypes and GO Biological Processes for the lncRNA ${data.gene}. Terms are ranked by averaging the mean Pearson correlation coefficients between each gene in a gene set and ${data.gene}.`)
    $('#fig2-down1').attr('href', `https://maayanlab-public.s3.amazonaws.com/lnchub2/${data.gene}/predicted_functions/MGI Mammalian Phenotype Level 4 2021_${data.gene}.csv`)
    $('#fig2-down2').attr('href', `https://maayanlab-public.s3.amazonaws.com/lnchub2/${data.gene}/predicted_functions/GO Biological Process 2021_${data.gene}.csv`)
    $('#fig3-img').attr('src', `https://maayanlab-public.s3.amazonaws.com/lnchub2/${data.gene}/predicted_functions/${data.gene}_biological_function_predictions_figure3.png`)
    $('#fig3-img').attr('alt', `Figure 3. Predicted KEGG pathways and DisGeNET disease terms for the lncRNA ${data.gene}. Terms are ranked by averaging the mean Pearson correlation coefficients between each gene in a gene set and ${data.gene}.`)
    $('#fig3-mod-img').attr('src', `https://maayanlab-public.s3.amazonaws.com/lnchub2/${data.gene}/predicted_functions/${data.gene}_biological_function_predictions_figure3.png`)
    $('#fig3-mod-title').text(`Figure 3. Predicted KEGG pathways and DisGeNET disease terms for the lncRNA ${data.gene}. Terms are ranked by averaging the mean Pearson correlation coefficients between each gene in a gene set and ${data.gene}.`)
    $('#fig3-down1').attr('href', `https://maayanlab-public.s3.amazonaws.com/lnchub2/${data.gene}/predicted_functions/KEGG 2021 Human_${data.gene}.csv`)
    $('#fig3-down2').attr('href', `https://maayanlab-public.s3.amazonaws.com/lnchub2/${data.gene}/predicted_functions/DisGeNET_${data.gene}.csv`)
    $('#fig4-img').attr('src', `https://maayanlab-public.s3.amazonaws.com/lnchub2/${data.gene}/tissue_and_cell_line_expression/${data.gene}_zscore_tissue_expression.png`)
    $('#fig4-img').attr('alt', `Figure 5. Z-score (median expression) for the lncRNA ${data.gene} in various tissue types.`)
    $('#fig4-mod-img').attr('src', `https://maayanlab-public.s3.amazonaws.com/lnchub2/${data.gene}/tissue_and_cell_line_expression/${data.gene}_zscore_tissue_expression.png`)
    $('#fig4-mod-title').text(`Figure 5. Z-score (median expression) for the lncRNA ${data.gene} in various tissue types.`)
    $('#fig4-down').attr('href', `https://maayanlab-public.s3.amazonaws.com/lnchub2/${data.gene}/tissue_and_cell_line_expression/${data.gene}_tissue_zscore.csv`)
    $('#fig5-img').attr('src', `https://maayanlab-public.s3.amazonaws.com/lnchub2/${data.gene}/tissue_and_cell_line_expression/${data.gene}_zscore_cell_line_expression.png`)
    $('#fig5-img').attr('alt', `Figure 6. Z-score (median expression) for the lncRNA ${data.gene} in the top 30 cell lines.`)
    $('#fig5-mod-img').attr('src', `https://maayanlab-public.s3.amazonaws.com/lnchub2/${data.gene}/tissue_and_cell_line_expression/${data.gene}_zscore_cell_line_expression.png`)
    $('#fig5-mod-title').text(`Figure 6. Z-score (median expression) for the lncRNA ${data.gene} in the top 30 cell lines.`)
    $('#fig5-down').attr('href', `https://maayanlab-public.s3.amazonaws.com/lnchub2/${data.gene}/tissue_and_cell_line_expression/${data.gene}_cell_line_zscore.csv`)
    $('#fig6-img').attr('src', `https://maayanlab-public.s3.amazonaws.com/lnchub2/${data.gene}/umap/tissues/figures/static/${data.gene}_${data.fig_data.fig6_tissue}_rank1.png`)
    $('#fig6-img').attr('alt', `Figure 7. UMAP was applied to 3,000 randomly selected samples (with tissue type labels) from Recount3. Each data point represents a lncRNA (n=15,862) and are colored by z-score (median expression) in ${data.fig_data.fig6_tissue}.`)
    $('#fig6-mod-img').attr('src', `https://maayanlab-public.s3.amazonaws.com/lnchub2/${data.gene}/umap/tissues/figures/static/${data.gene}_${data.fig_data.fig6_tissue}_rank1.png`)
    $('#fig6-mod-title').text(`Figure 7. UMAP was applied to 3,000 randomly selected samples (with tissue type labels) from Recount3. Each data point represents a lncRNA (n=15,862) and are colored by z-score (median expression) in ${data.fig_data.fig6_tissue}.`)
    $('#fig6-tissue').text(data.fig_data.fig6_tissue)
    $('#fig7-img').attr('src', `https://maayanlab-public.s3.amazonaws.com/lnchub2/${data.gene}/umap/cell_lines/figures/static/${data.gene}_${data.fig_data.fig7_cell_line}_rank1.png`)
    $('#fig7-img').attr('alt', `Figure 8. UMAP was applied to 3,000 randomly selected samples (with cell line labels) from Recount3. Each data point represents a lncRNA (n=15,862) and are colored by z-score (median expression) in ${data.fig_data.fig7_cell_line}.`)
    $('#fig7-mod-img').attr('src', `https://maayanlab-public.s3.amazonaws.com/lnchub2/${data.gene}/umap/cell_lines/figures/static/${data.gene}_${data.fig_data.fig7_cell_line}_rank1.png`)
    $('#fig7-mod-title').text(`Figure 8. UMAP was applied to 3,000 randomly selected samples (with cell line labels) from Recount3. Each data point represents a lncRNA (n=15,862) and are colored by z-score (median expression) in ${data.fig_data.fig7_cell_line}.`)
    $('#fig7-cell').text(data.fig_data.fig7_cell_line)
    $('#fig7-app').attr('href', `https://appyters.maayanlab.cloud/lncRNA_Appyter/${data.appyter_id}/#visualizing-all-lncrnas-based-on-their-gene-expression-similarity-across-tissues`)
    $('#fig8-img').attr('src', `https://maayanlab-public.s3.amazonaws.com/lnchub2/${data.gene}/predicted_functions/${data.gene}_biological_function_predictions_figure4.png`)
    $('#fig8-img').attr('alt', `Figure 4. Predicted transcription factors from ChEA 2016 and ENCODE ChIP-seq 2015 libraries for the lncRNA ${data.gene}. Terms are ranked by averaging the mean Pearson correlation coefficients between each gene in a gene set and ${data.gene}.`)
    $('#fig8-mod-img').attr('src', `https://maayanlab-public.s3.amazonaws.com/lnchub2/${data.gene}/predicted_functions/${data.gene}_biological_function_predictions_figure4.png`)
    $('#fig8-mod-title').text(`Figure 4. Predicted transcription factors from ChEA 2016 and ENCODE ChIP-seq 2015 libraries for the lncRNA ${data.gene}. Terms are ranked by averaging the mean Pearson correlation coefficients between each gene in a gene set and ${data.gene}.`)
    $('#fig8-app').attr('href', `https://appyters.maayanlab.cloud/lncRNA_Appyter/${data.appyter_id}/#visualizing-all-lncrnas-based-on-their-gene-expression-similarity-across-cell-lines`)
    $('#fig8-down1').attr('href', `https://maayanlab-public.s3.amazonaws.com/lnchub2/${data.gene}/predicted_functions/ChEA_${data.gene}.csv`)
    $('#fig8-down2').attr('href', `https://maayanlab-public.s3.amazonaws.com/lnchub2/${data.gene}/predicted_functions/ENCODE_${data.gene}.csv`)
    $('#tab3-down').attr('href', `https://maayanlab-public.s3.amazonaws.com/lnchub2/${data.gene}/l1000_sm_predictions/${data.gene}_l1000_sm_predictions_up.csv`)
    $('#tab4-down').attr('href', `https://maayanlab-public.s3.amazonaws.com/lnchub2/${data.gene}/l1000_sm_predictions/${data.gene}_l1000_sm_predictions_down.csv`)
    $('#results__appyter-card').show();
    $('#navbar-toc').show();
}

function example(gene) {
    $('#search').val(gene);
    search(gene);
}


function search(gene) {
    $('#results__appyter-card').hide();
    $('#not-lncRNA').hide()
    fetch(`search/${gene}`)
        .then(response => response.json())
        .then(r => {
            if (r.data.lncrna === true) {
                let res_element = $('#results');
                display_results(r.data);
                res_element.show();
                // Scroll to 'Results' on 'Submit' click
                $('body').animate({
                    scrollTop: res_element.offset().top
                }, 300, function () {
                    window.location.hash = '#results';
                });
            } else {
                $('#not-lncRNA').show()
                $('#not-lncRNA-msg').text(`${gene} does not appear among the 15,862 processed long non-coding RNAs.`)
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
                    const selection = event.detail.selection.value;
                    autoCompleteJS.input.value = selection;
                    search(event.detail.selection.value);
                }
            }
        }
    });

})();