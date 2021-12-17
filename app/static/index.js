let appyters = '';
let ens_lncrna = '';

function display_results(appyter, gene) {
    let appyter_card = $('#results__appyter-card'),
        not_in_db = $('#results__not-in-db');

    appyter_card.hide();
    not_in_db.hide();
    if (appyter !== undefined) {
        appyter_card.show()
        $('#results__appyter-iframe').attr('src', `gene\\${appyter.gene}`);
    } else {
        not_in_db.text(`"${gene}" is missing from the database.`)
        not_in_db.show();
    }
}

function example(gene) {
    $('#search').val(gene);
    search(gene);
}

function search_split(appyter_gene) {
    let appyter = undefined;
    if (appyters === '') {
        fetch('static/appyters.json')
            .then(response => response.json())
            .then(data => {
                appyters = data;
                appyter = data.filter(a => a['gene'] === appyter_gene)[0];
                display_results(appyter, appyter_gene);
            })
    } else {
        appyter = appyters.filter(a => a['gene'] === appyter_gene)[0];
        display_results(appyter, appyter_gene);
    }
}

function search(gene) {
    let appyter_gene = gene;
    if (appyter_gene.toUpperCase().slice(0, 4) === "ENSG") {
        if (ens_lncrna === '') {
            fetch('static/ens_lncrna_mapping.json')
                .then(response => response.json())
                .then(data => {
                    ens_lncrna = data;
                    appyter_gene = ens_lncrna[appyter_gene];
                    search_split(appyter_gene);
                })
        } else {
            appyter_gene = ens_lncrna[appyter_gene];
            search_split(appyter_gene);
        }
    } else {
        search_split(appyter_gene)
    }
}

(function () {
    $('#search').val('');
    $.getJSON(`static/lncRNAs.json`, function (json) {
        $('#search').autocomplete({
                source: json,
                minLength: 2,
                delay: 200,
                autoFocus: true,
                select: function (event, ui) {
                    search(ui.item.label)
                },
            }
        );
    });
})();