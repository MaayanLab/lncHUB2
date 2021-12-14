(function () {
    fetch(`https://appyters.maayanlab.cloud/lncRNA_Appyter/${appyter_id}/gene_correlations/${gene}_correlated_genes.csv`)
        .then(response => response.text())
        .then(data => {
                let dataSet = data.trim().split('\n').slice(1, 100).map(x => [x.split(',')[0], parseFloat(x.split(',')[1])]);
                $(`#table1-${appyter_id}`).DataTable(
                    {
                        data: dataSet,
                        order: [],
                        columns: [
                            {'title': 'Gene'},
                            {'title': 'Pearson\'s Correlation Coefficient'}
                        ]
                    })
            }
        );

    fetch(`https://appyters.maayanlab.cloud/lncRNA_Appyter/${appyter_id}/gene_correlations/${gene}_correlated_lncRNAs.csv`)
        .then(response => response.text())
        .then(data => {
            let dataSet = data.trim().split('\n').slice(1, 100).map(x => [x.split(',')[0], parseFloat(x.split(',')[1])]);

            $(`#table2-${appyter_id}`).DataTable(
                {
                    data: dataSet,
                    order: [],
                    columns: [
                        {'title': 'Gene'},
                        {'title': 'Pearson\'s Correlation Coefficient'}
                    ]
                })
        });

    fetch(`https://appyters.maayanlab.cloud/lncRNA_Appyter/${appyter_id}/l1000_sm_predictions/${gene}_l1000_sm_predictions_up.csv`)
        .then(response => response.text())
        .then(data => {
            let dataSet = data.trim().split('\n').slice(1, 100).map(x => {
                    let s = x.split(',');
                    return [parseInt(s[0]), s[1], s[2], s[3], s[4], s[5], s[6], parseFloat(s[7])]
                }
            );
            $(`#table3-${appyter_id}`).DataTable(
                {
                    data: dataSet,
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
        });

    fetch(`https://appyters.maayanlab.cloud/lncRNA_Appyter/${appyter_id}/l1000_sm_predictions/${gene}_l1000_sm_predictions_down.csv`)
        .then(response => response.text())
        .then(data => {
            let dataSet = data.trim().split('\n').slice(1, 100).map(x => {
                    let s = x.split(',');
                    return [parseInt(s[0]), s[1], s[2], s[3], s[4], s[5], s[6], parseFloat(s[7])]
                }
            );
            $(`#table4-${appyter_id}`).DataTable(
                {
                    data: dataSet,
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
        });
})();