let appyters = '';

function display_results(appyter, gene) {
    let appyter_card = $('#results__appyter-card'),
        not_in_db = $('#results__not-in-db');

    appyter_card.hide();
    not_in_db.hide();
    if (appyter !== undefined) {
        console.log('def')
        appyter_card.show()
        $('#results__appyter-iframe').attr('src', `gene\\${appyter.gene}`);
    } else {
        console.log('undef')
        not_in_db.text(`"${gene}" is missing from the database.`)
        not_in_db.show();
    }
}

function example(gene) {
    $('#search').val(gene);
    search(gene);
}

function search(gene) {
    let appyter = undefined;

    if (appyters === '') {
        fetch('static/appyters.json')
            .then(response => response.json())
            .then(data => {
                appyters = data;
                appyter = data.filter(a => a['gene'] === gene)[0];
                display_results(appyter, gene);
            })
    } else {
        appyter = appyters.filter(a => a['gene'] === gene);
        display_results(appyter, gene);
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