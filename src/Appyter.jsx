import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Table from './Table';

export default class Appyter extends React.Component {

    fetchTable = async (url) => {
        const table = await fetch(url);
        if (table.ok) {
            const { data, success } = await table.text()
            if ((Array.isArray(data)) && success) {
                if (data.length > 0) {
                    return data
                }
            }
        }
    }

    render() {
        const {appyter} = this.props.appyter;
        // const table1 = await this.fetchTable(`https://appyters.maayanlab.cloud/lncRNA_Appyter/${appyter.id}/gene_correlations/${appyter.gene}_correlated_genes.csv`);
        // const table2 = await this.fetchTable(`https://appyters.maayanlab.cloud/lncRNA_Appyter/${appyter.id}/gene_correlations/${appyter.gene}_correlated_lncRNAs.csv`);
        // const table3 = await this.fetchTable(`https://appyters.maayanlab.cloud/lncRNA_Appyter/${appyter.id}/l1000_sm_predictions/${appyter.gene}_l1000_sm_predictions_up.csv`);
        // const table4 = await this.fetchTable(`https://appyters.maayanlab.cloud/lncRNA_Appyter/${appyter.id}/l1000_sm_predictions/${appyter.gene}_l1000_sm_predictions_down.csv`);
        const table1 = ',Pearson\'s Correlation Coefficient\n' +
            'HOXC11,0.911\n' +
            'ENSG00000277994,0.838\n' +
            'HOXC-AS3,0.829\n' +
            'HOXC10,0.819\n' +
            'ENSG00000275589,0.8\n' +
            'HOXC13,0.774\n' +
            'HOXC13-AS,0.759\n' +
            'HOXC-AS1,0.74\n' +
            'HOXC9,0.74\n' +
            'ENSG00000273049,0.732';
        const table2 = ',Pearson\'s Correlation Coefficient\n' +
            'HOXC11,0.911\n' +
            'ENSG00000277994,0.838\n' +
            'HOXC-AS3,0.829\n' +
            'HOXC10,0.819\n' +
            'ENSG00000275589,0.8\n' +
            'HOXC13,0.774\n' +
            'HOXC13-AS,0.759\n' +
            'HOXC-AS1,0.74\n' +
            'HOXC9,0.74\n' +
            'ENSG00000273049,0.732';
        const table3 = ',L1000 Signature ID,Drug,Up/Down,Dose,Cell line,Time point,Mean Pearson Correlation\n' +
            '0,ERG005_VCAP_24H_I06_genistein_1.11uM up,genistein,up,1.11uM,VCAP,24H,0.2415403\n' +
            '1,ERG005_VCAP_24H_J08_fluphenazine_4uM up,fluphenazine,up,4uM,VCAP,24H,0.22278596\n' +
            '2,ERG005_VCAP_24H_I12_thioridazine_1.11uM up,thioridazine,up,1.11uM,VCAP,24H,0.21826123\n' +
            '3,ERG005_VCAP_24H_E09_tretinoin_1.11uM up,tretinoin,up,1.11uM,VCAP,24H,0.20618293\n' +
            '4,ERG015_VCAP_24H_H19_BRD-K61612515_10uM up,BRD-K61612515,up,10uM,VCAP,24H,0.19852242\n' +
            '5,ERG005_VCAP_24H_J09_fulvestrant_4uM up,fulvestrant,up,4uM,VCAP,24H,0.19416192\n' +
            '6,ERG005_VCAP_24H_K06_genistein_20uM up,genistein,up,20uM,VCAP,24H,0.19216326\n' +
            '7,ERG005_VCAP_24H_I08_fluphenazine_1.11uM up,fluphenazine,up,1.11uM,VCAP,24H,0.18521222\n' +
            '8,ERG005_VCAP_24H_K09_fulvestrant_20uM up,fulvestrant,up,20uM,VCAP,24H,0.18519919\n' +
            '9,ERG005_VCAP_24H_J06_genistein_4uM up,genistein,up,4uM,VCAP,24H,0.18281928';
        const table4 = ',L1000 Signature ID,Drug,Up/Down,Dose,Cell line,Time point,Mean Pearson Correlation\n' +
            '0,REP.B016_THP1_24H_A19_palbociclib_2.22uM down,palbociclib,down,2.22uM,THP1,24H,0.22592276\n' +
            '1,CPD003_MCF7_24H_G01_fluorouracil_10uM down,fluorouracil,down,10uM,MCF7,24H,0.21683468\n' +
            '2,REP.A016_JURKAT_24H_A19_palbociclib_10uM down,palbociclib,down,10uM,JURKAT,24H,0.21424589\n' +
            '3,REP.B018_A375_24H_J19_AMG-232_2.22uM down,AMG-232,down,2.22uM,A375,24H,0.21319427\n' +
            '4,REP.B016_JURKAT_24H_A19_palbociclib_2.22uM down,palbociclib,down,2.22uM,JURKAT,24H,0.21065862\n' +
            '5,ERG005_VCAP_24H_C12_sirolimus_20uM down,sirolimus,down,20uM,VCAP,24H,0.20663004\n' +
            '6,DPK.CP001_A549_24H_L04_nutlin-3_10uM down,nutlin-3,down,10uM,A549,24H,0.2043536\n' +
            '7,REP.B018_A375_24H_C08_RG-7388_0.74uM down,RG-7388,down,0.74uM,A375,24H,0.20251021\n' +
            '8,REP.B016_THP1_24H_A20_palbociclib_0.74uM down,palbociclib,down,0.74uM,THP1,24H,0.20169379\n' +
            '9,DOS012_VCAP_24H_B08_BRD-K39597586_4uM down,BRD-K39597586,down,4uM,VCAP,24H,0.19981126';

        return (
            <div className="container">
                <h3>
                    Report about the Long Non-coding RNA (lncRNA)
                    {appyter.gene}
                </h3>
                <p>
                    Based on lncRNA-gene co-expression, this report provides predictions about the biological functions
                    of
                    {' '}
                    {appyter.gene}
                    ,
                    displays the average expression of
                    {' '}
                    {appyter.gene}
                    {' '}
                    across tissues and cell-lines, and lists predictions of
                    small
                    molecules that may specifically up- or down-regulate the expression of
                    {' '}
                    {appyter.gene}
                    .
                </p>
                <div className="row">
                    <div className="col-6">
                        <h4>
                            Top correlated genes with
                            {appyter.gene}
                        </h4>
                        <p>
                            Using the loaded gene-lncRNA correlation matrix, we report the genes that mostly correlate
                            with
                            {appyter.gene}
                            .
                        </p>
                        <div className="table-responsive-sm">
                            <Table table={table1} top={10}/>
                        </div>
                        <p style={{fontStyle: 'italic'}}>
                            Table 1. Top 20 genes that mostly correlate with
                            {' '}
                            {appyter.gene}
                            {' '}
                            ranked by
                            Pearson’s
                            correlation coefficients.
                        </p>
                        <p>
                            Download Table 1:
                            <a href="">
                                gene_correlations/
                                {appyter.gene}
                                _correlated_genes.csv
                            </a>
                        </p>
                    </div>
                    <div className="col-6">
                        <h4>
                            Top correlated lncRNAs with
                            {appyter.gene}
                        </h4>
                        <p>
                            Below we list the top lncRNAs, out of all 5,050 lncRNAs within our database, that mostly
                            correlate with
                            {appyter.gene}
                            based on their Pearson’s correlation coefficients.
                        </p>
                        <div className="table-responsive-sm">
                            <Table table={table2} top={10}/>
                        </div>
                        <p style={{fontStyle: 'italic'}}>
                            Table 2. Top 20 lncRNAs that mostly correlate with
                            {' '}
                            {appyter.gene}
                            {' '}
                            ranked
                            by Pearson’s
                            correlation coefficients.
                        </p>
                        <p>
                            Download Table 2:
                            <a href="">
                                gene_correlations/
                                {appyter.gene}
                                _correlated_lncRNAs.csv
                            </a>
                        </p>
                    </div>
                </div>

                <h4>
                    Enrichment analysis applied to the top 200 most correlated genes with
                    {appyter.gene}
                </h4>
                <p>
                    The top 200 most correlated genes with
                    {' '}
                    {appyter.gene}
                    {' '}
                    were submitted to Enrichr [2-4] for enrichment
                    analysis. NOTE: Only
                    genes with official Entrez gene symbols are submitted to Enrichr. Ensembl IDs that do not map to an
                    official
                    gene symbol were dropped.
                </p>
                <p>
                    Access the enrichment analysis results for
                    {' '}
                    {appyter.gene}
                    {' '}
                    200 most correlated genes here:
                    <a
                        href=""
                    >
                        https://maayanlab.cloud/Enrichr/enrich?dataset=564bc230f69acf57b31ab657c7602179
                    </a>
                </p>

                <h4>
                    Predicted Biological Functions of
                    {appyter.gene}
                </h4>
                <p>
                    For each Enrichr library, the mean Pearson’s correlation coefficients are calculated between each
                    gene set and
                    {appyter.gene}
                    . Terms with a high mean Pearson’s correlation coefficients are prioritized. These terms are
                    predicted to
                    be associated with
                    {appyter.gene}
                    .
                </p>
                <div className="row">
                    <div className="col-6">
                        <p>
                            <img
                                className="image-fluid w-100"
                                id="fig1"
                                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' id='visual' viewBox='0 0 900 600' width='900' height='600'%3E%3Crect x='0' y='0' width='900' height='600' fill='%23aaaaaa'%3E%3C/rect%3E%3C/svg%3E"
                                alt="Predicted MGI Mammalian Phenotypes and GO Biological Processes for the lncRNA {appyter.gene}}. Terms are ranked by the mean Pearson correlation between {appyter.gene}} and the associated gene sets."
                            />
                        </p>
                        <p style={{fontStyle: 'italic'}}>
                            Figure 1. Predicted MGI Mammalian Phenotypes and GO Biological
                            Processes for
                            the
                            lncRNA
                            {' '}
                            {appyter.gene}
                            . Terms are ranked by the mean Pearson correlation between
                            {' '}
                            {appyter.gene}
                            {' '}
                            and the
                            associated gene
                            sets.
                        </p>
                        <p>
                            Download predictions:
                            <a href="">
                                predicted_functions/MGI Mammalian Phenotype Level 4
                                2021_
                                {appyter.gene}
                                .csv
                            </a>
                        </p>
                        <p>
                            Download predictions:
                            <a href="">
                                predicted_functions/GO Biological Process
                                2021_
                                {appyter.gene}
                                .csv
                            </a>
                        </p>
                    </div>
                    <div className="col-6">
                        <p>
                            <img
                                className="image-fluid w-100"
                                id="fig2"
                                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' id='visual' viewBox='0 0 900 600' width='900' height='600'%3E%3Crect x='0' y='0' width='900' height='600' fill='%23aaaaaa'%3E%3C/rect%3E%3C/svg%3E"
                                alt="Predicted KEGG pathways and DisGeNET disease terms for the lncRNA {appyter.gene}}. Terms are ranked by the mean Pearson correlation between {appyter.gene}} and the associated gene sets."
                            />
                        </p>
                        <p style={{fontStyle: 'italic'}}>
                            Figure 2. Predicted KEGG pathways and DisGeNET disease terms for
                            the lncRNA
                            {appyter.gene}
                            .
                            Terms are ranked by the mean Pearson correlation between
                            {appyter.gene}
                            {' '}
                            and the associated gene
                            sets.
                        </p>
                        <p>
                            Download predictions:
                            <a href="">
                                predicted_functions/KEGG 2021 Human_
                                {appyter.gene}
                                .csv
                            </a>
                        </p>
                        <p>
                            Download predictions:
                            <a href="">
                                predicted_functions/DisGeNET_
                                {appyter.gene}
                                .csv
                            </a>
                        </p>
                    </div>
                </div>

                <h4>
                    Tissue and Cell Line Expression Levels of
                    {appyter.gene}
                </h4>
                <p style={{fontWeight: '600'}}>
                    This part of the report provides the Z-score (Normalized Median Expression)
                    for the
                    lncRNA in various tissues and cell lines.
                </p>
                <p>
                    Samples from Recount3 [1] were automatically labelled by their tissue type or cell line of
                    origin. Tissue and
                    cell line samples were log2 transformed and quantile normalized separately. For
                    {' '}
                    {appyter.gene}
                    , the
                    median expression
                    was then calculated for each tissue type and cell line. Tissues and cell lines with less than 20
                    samples were
                    removed. Z-scoring was then applied along the lncRNA axis to compare expression levels across
                    all tissues and
                    cell lines.
                </p>
                <div className="row">
                    <div className="col-6">
                        <p>
                            <img
                                className="image-fluid w-100"
                                id="fig3"
                                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' id='visual' viewBox='0 0 900 600' width='900' height='600'%3E%3Crect x='0' y='0' width='900' height='600' fill='%23aaaaaa'%3E%3C/rect%3E%3C/svg%3E"
                                alt="Z-score (median expression) for the lncRNA {appyter.gene}} in various tissue types."
                            />
                        </p>
                        <p style={{fontStyle: 'italic'}}>
                            Figure 3. Z-score (median expression) for the lncRNA
                            {' '}
                            {appyter.gene}
                            {' '}
                            in various tissue types.
                        </p>
                        <p>
                            Download table for z-score (median expression)in tissue types:
                            <a
                                href=""
                            >
                                tissue_and_cell_line_expression/
                                {appyter.gene}
                                _tissue_zscore.csv
                            </a>
                        </p>
                    </div>
                    <div className="col-6">
                        <p>
                            <img
                                className="image-fluid w-100"
                                id="fig4"
                                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' id='visual' viewBox='0 0 900 600' width='900' height='600'%3E%3Crect x='0' y='0' width='900' height='600' fill='%23aaaaaa'%3E%3C/rect%3E%3C/svg%3E"
                                alt="Z-score (median expression) for the lncRNA {appyter.gene}} in the top 30 cell lines."
                            />
                        </p>
                        <p style={{fontStyle: 'italic'}}>
                            Figure 4. Z-score (median expression) for the lncRNA
                            {' '}
                            {appyter.gene}
                            {' '}
                            in the top 30 cell lines.
                        </p>
                        <p>
                            Download table for z-score (median expression)in cell lines:
                            <a
                                href=""
                            >
                                tissue_and_cell_line_expression/
                                {appyter.gene}
                                _cell_line_zscore.csv
                            </a>
                        </p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <h4>Visualizing all lncRNAs based on their gene expression similarity across tissues</h4>
                        <p>
                            UMAP visualization [5] was applied to 2,000 randomly selected samples (with tissue type
                            labels) from
                            Recount3[1].
                            Samples were first log2 transformed and quantile normalized (samples as features) before
                            applying UMAP.
                            Each
                            data point is a lncRNA (n=5,050). Use the drop-down menu to color lncRNAs by z-score in
                            a specific
                            tissue. The
                            black arrow is pointing to the location of
                            {' '}
                            {appyter.gene}
                            .
                        </p>
                        <p>
                            <img
                                className="image-fluid w-100"
                                id="fig5"
                                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' id='visual' viewBox='0 0 900 600' width='900' height='600'%3E%3Crect x='0' y='0' width='900' height='600' fill='%23aaaaaa'%3E%3C/rect%3E%3C/svg%3E"
                                alt="UMAP was applied to 2,000 randomly selected samples (with tissue type labels) from Recount3. Samples were first log2 transformed and quantile normalized (samples as features) before applying UMAP. Each data point is a lncRNA (n=5,050) and are colored by z-score (median expression) in testis."
                            />
                        </p>
                        <p style={{fontStyle: 'italic'}}>
                            Figure 5. UMAP was applied to 2,000 randomly selected samples
                            (with tissue
                            type
                            labels) from Recount3. Samples were first log2 transformed and quantile normalized
                            (samples as features)
                            before
                            applying UMAP. Each data point is a lncRNA (n=5,050) and are colored by z-score (median
                            expression) in
                            testis.
                        </p>
                    </div>
                    <div className="col-6">
                        <h4>Visualizing all lncRNAs based on their gene expression similarity across cell lines</h4>
                        <p>
                            UMAP visualization [5] was applied to 2,000 randomly selected samples (with cell line
                            labels) from
                            Recount3
                            [1].
                            Samples were first log2 transformed and quantile normalized (samples as features) before
                            applying UMAP.
                            Each
                            data point is a lncRNA (n=5,050). Use the drop-down menu to color lncRNAs by z-score in
                            a specific cell
                            line.
                            The black arrow is pointing to the location of
                            {' '}
                            {appyter.gene}
                            .
                        </p>
                        <p>
                            <img
                                className="image-fluid w-100"
                                id="fig6"
                                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' id='visual' viewBox='0 0 900 600' width='900' height='600'%3E%3Crect x='0' y='0' width='900' height='600' fill='%23aaaaaa'%3E%3C/rect%3E%3C/svg%3E"
                                alt="UMAP was applied to 2,000 randomly selected samples (with cell line labels) from Recount3. Samples were first log2 transformed and quantile normalized (samples as features) before applying UMAP. Each data point is a lncRNA (n=5,050) and are colored by z-score (median expression) in FUJI."
                            />
                        </p>
                        <p style={{fontStyle: 'italic'}}>
                            Figure 6. UMAP was applied to 2,000 randomly selected samples
                            (with cell line
                            labels)
                            from Recount3. Samples were first log2 transformed and quantile normalized (samples as
                            features) before
                            applying
                            UMAP. Each data point is a lncRNA (n=5,050) and are colored by z-score (median
                            expression) in FUJI.
                        </p>
                    </div>
                </div>
                <h4>
                    L1000 Small Molecules Predicted to Modulate
                    {appyter.gene}
                </h4>
                <p>
                    ~1.4 million L1000 chemical perturbation gene expression signatures (Level 5) were downloaded
                    from SigCom LINCS
                    (https://maayanlab.cloud/sigcom-lincs) [6]. For each signature, all 5,050 lncRNAs were ranked by
                    mean Pearson’s
                    correlation coefficients and the top 250 lncRNAs were retained for each signature. These
                    lncRNA-L1000 signature
                    associations are reported here. The signatures are ranked by their mean Pearson’s correlation
                    coefficients to
                    modulate the expression of
                    {' '}
                    {appyter.gene}
                    . These associations are also separated by direction. If
                    {' '}
                    {appyter.gene}
                    is highly
                    correlated with the up-regulated genes for a specific small molecule, then this small molecule
                    is predicted to
                    up-regulate
                    {' '}
                    {appyter.gene}
                    .
                </p>
                <h4>
                    L1000 Small Molecules Predicted to Up-Regulate
                    {appyter.gene}
                </h4>
                <p>
                    The prioritized small molecules below are predicted to specifically up-regulate
                    {appyter.gene}
                    .
                </p>
                <div className="table-responsive-sm">
                    <Table table={table3} top={10}/>
                </div>
                <p style={{fontStyle: 'italic'}}>
                    Table 3. L1000 small molecules predicted to up-regulate the lncRNA
                    {appyter.gene}
                    . L1000 up
                    signatures are prioritized by their Pearson’s correlation coefficients with
                    {appyter.gene}
                    .
                </p>
                <p>
                    Download the table of ranked L1000 small molecules predicted to up-regulate
                    {' '}
                    {appyter.gene}
                    :
                    <a
                        href=""
                    >
                        l1000_sm_predictions/
                        {appyter.gene}
                        _l1000_sm_predictions_up.csv
                    </a>
                </p>
                <h4>
                    L1000 Small Molecules Predicted to Down-Regulate
                    {appyter.gene}
                </h4>
                <p>
                    The prioritized small molecules below are predicted to specifically down-regulate
                    {appyter.gene}
                    .
                </p>
                <div className="table-responsive-sm">
                    <Table table={table4} top={10}/>
                </div>
                <p style={{fontStyle: 'italic'}}>
                    Table 4. L1000 small molecules predicted to down-regulate the lncRNA
                    {appyter.gene}
                    . L1000
                    down signatures are prioritized by their Pearson’s correlation coefficients with
                    {appyter.gene}
                    .
                </p>
                <p>
                    Download the table of ranked L1000 small molecules predicted to down-regulate
                    {' '}
                    {appyter.gene}
                    :
                    <a
                        href=""
                    >
                        l1000_sm_predictions/
                        {appyter.gene}
                        _l1000_sm_predictions_down.csv
                    </a>
                </p>
                <h4>References</h4>
                <p>
                    [1] Wilks C, Zheng SC, Chen FY, Charles R, Solomon B, Ling JP, Imada EL, Zhang D, Joseph L, Leek
                    JT: recount3:
                    summaries and queries for large-scale RNA-seq expression and splicing. bioRxiv
                    2021:2021.2005.2021.445138.
                </p>
                <p>
                    [2] Xie Z, Bailey A, Kuleshov MV, Clarke DJB, Evangelista JE, Jenkins SL, Lachmann A,
                    Wojciechowicz ML,
                    Kropiwnicki E, Jagodnik KM: Gene Set Knowledge Discovery with Enrichr. Current Protocols 2021,
                    1(3):e90.
                </p>
                <p>
                    [3] Chen EY, Tan CM, Kou Y, Duan Q, Wang Z, Meirelles GV, Clark NR, Ma’ayan A: Enrichr:
                    interactive and
                    collaborative HTML5 gene list enrichment analysis tool. BMC Bioinformatics 2013, 14(1):128.
                </p>
                <p>
                    [4] Kuleshov MV, Jones MR, Rouillard AD, Fernandez NF, Duan Q, Wang Z, Koplev S, Jenkins SL,
                    Jagodnik KM,
                    Lachmann A: Enrichr: a comprehensive gene set enrichment analysis web server 2016 update.
                    Nucleic Acids Research
                    2016, 44(W1):W90-W97.
                </p>
                <p>
                    [5] McInnes L, Healy J, Melville J: Umap: Uniform manifold approximation and projection for
                    dimension reduction.
                    arXiv preprint arXiv:180203426 2018.
                </p>
                <p>
                    [6] Evangelista et al. SigCom LINCS: Data and Metadata Search Engine for Gene Expression
                    Signatures. 2021. In
                    preparation.
                </p>
            </div>
        );
    }
}
