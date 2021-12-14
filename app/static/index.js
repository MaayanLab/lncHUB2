let appyters = '';

function display_results(appyter) {
    let appyter_card = $('#results__appyter-card'),
        not_processed = $('#results__not-processed');

    appyter_card.hide();
    not_processed.hide();
    if (appyter !== '') {
        appyter_card.show()
        $('#results__appyter-iframe').attr('src', `gene\\${appyter.gene}`);
    } else {
        not_processed.show();
    }
}

function example(gene) {
    $('#search').val(gene);
    search(gene);
}

function search(gene) {
    let appyter = '';

    if (appyters === '') {
        fetch('static/appyters.json')
            .then(response => response.json())
            .then(data => {
                appyters = data;
                appyter = data.filter(a => a['gene'] === gene)[0];
                display_results(appyter);
            })
    } else {
        appyter = appyters.filter(a => a['gene'] === gene);
        display_results(appyter);
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