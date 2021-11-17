import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';

export default class Appyter extends React.Component {
    constructor(props) {
        super(props);
        this.state = null;
    }

    render() {
        return (
            <div className="container">
                <h3>Report about the Long Non-coding RNA (lncRNA) HOTAIR</h3>
                <p>
                    Based on lncRNA-gene co-expression, this report provides predictions about the biological functions
                    of HOTAIR,
                    displays the average expression of HOTAIR across tissues and cell-lines, and lists predictions of
                    small
                    molecules that may specifically up- or down-regulate the expression of HOTAIR.
                </p>
                <div className="row">
                    <div className="col-6">
                        <h4>Top correlated genes with HOTAIR</h4>
                        <p>
                            Using the loaded gene-lncRNA correlation matrix, we report the genes that mostly correlate
                            with
                            HOTAIR.
                        </p>
                        <div className="table-responsive-sm">
                            <table id="table1" className="table table-sm">
                                <thead>
                                    <tr>
                                        <th>Gene</th>
                                        <th>Pearson's Correlation Coefficient</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th>HOXC11</th>
                                        <td>0.911</td>
                                    </tr>
                                    <tr>
                                        <th>ENSG00000277994</th>
                                        <td>0.838</td>
                                    </tr>
                                    <tr>
                                        <th>HOXC-AS3</th>
                                        <td>0.829</td>
                                    </tr>
                                    <tr>
                                        <th>HOXC10</th>
                                        <td>0.819</td>
                                    </tr>
                                    <tr>
                                        <th>ENSG00000275589</th>
                                        <td>0.800</td>
                                    </tr>
                                    <tr>
                                        <th>HOXC13</th>
                                        <td>0.774</td>
                                    </tr>
                                    <tr>
                                        <th>HOXC13-AS</th>
                                        <td>0.759</td>
                                    </tr>
                                    <tr>
                                        <th>HOXC-AS1</th>
                                        <td>0.740</td>
                                    </tr>
                                    <tr>
                                        <th>HOXC9</th>
                                        <td>0.740</td>
                                    </tr>
                                    <tr>
                                        <th>ENSG00000273049</th>
                                        <td>0.732</td>
                                    </tr>
                                    <tr>
                                        <th>HOXC-AS2</th>
                                        <td>0.730</td>
                                    </tr>
                                    <tr>
                                        <th>ENSG00000260597</th>
                                        <td>0.720</td>
                                    </tr>
                                    <tr>
                                        <th>HOXC6</th>
                                        <td>0.719</td>
                                    </tr>
                                    <tr>
                                        <th>ENSG00000274817</th>
                                        <td>0.697</td>
                                    </tr>
                                    <tr>
                                        <th>ENSG00000277129</th>
                                        <td>0.695</td>
                                    </tr>
                                    <tr>
                                        <th>HOXC8</th>
                                        <td>0.690</td>
                                    </tr>
                                    <tr>
                                        <th>ENSG00000273046</th>
                                        <td>0.686</td>
                                    </tr>
                                    <tr>
                                        <th>HOXC5</th>
                                        <td>0.652</td>
                                    </tr>
                                    <tr>
                                        <th>HOXA11</th>
                                        <td>0.638</td>
                                    </tr>
                                    <tr>
                                        <th>HOXC12</th>
                                        <td>0.637</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p style={{ fontStyle: 'italic' }}>
                            Table 1. Top 20 genes that mostly correlate with HOTAIR ranked by
                            Pearson’s
                            correlation coefficients.
                        </p>
                        <p>
                            Download Table 1:
                            <a href="">gene_correlations/HOTAIR_correlated_genes.csv</a>
                        </p>
                    </div>
                    <div className="col-6">
                        <h4>Top correlated lncRNAs with HOTAIR</h4>
                        <p>
                            Below we list the top lncRNAs, out of all 5,050 lncRNAs within our database, that mostly
                            correlate with
                            HOTAIR
                            based on their Pearson’s correlation coefficients.
                        </p>
                        <div className="table-responsive-sm">
                            <table id="table2" className="table table-sm">
                                <thead>
                                    <tr>
                                        <th>Gene</th>
                                        <th>Pearson's Correlation Coefficient</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th>HOXC-AS3</th>
                                        <td>0.829</td>
                                    </tr>
                                    <tr>
                                        <th>HOXC13-AS</th>
                                        <td>0.759</td>
                                    </tr>
                                    <tr>
                                        <th>HOXC-AS1</th>
                                        <td>0.740</td>
                                    </tr>
                                    <tr>
                                        <th>HOXC-AS2</th>
                                        <td>0.730</td>
                                    </tr>
                                    <tr>
                                        <th>HOXA11-AS</th>
                                        <td>0.618</td>
                                    </tr>
                                    <tr>
                                        <th>HOXD-AS2</th>
                                        <td>0.517</td>
                                    </tr>
                                    <tr>
                                        <th>TFAP2A-AS1</th>
                                        <td>0.508</td>
                                    </tr>
                                    <tr>
                                        <th>HOXA-AS3</th>
                                        <td>0.500</td>
                                    </tr>
                                    <tr>
                                        <th>HOXA10-AS</th>
                                        <td>0.487</td>
                                    </tr>
                                    <tr>
                                        <th>LNCOC1</th>
                                        <td>0.471</td>
                                    </tr>
                                    <tr>
                                        <th>LINC01116</th>
                                        <td>0.467</td>
                                    </tr>
                                    <tr>
                                        <th>DLX2-DT</th>
                                        <td>0.466</td>
                                    </tr>
                                    <tr>
                                        <th>FOXD1-AS1</th>
                                        <td>0.463</td>
                                    </tr>
                                    <tr>
                                        <th>LINC01117</th>
                                        <td>0.454</td>
                                    </tr>
                                    <tr>
                                        <th>HCG15</th>
                                        <td>0.451</td>
                                    </tr>
                                    <tr>
                                        <th>HOTTIP</th>
                                        <td>0.447</td>
                                    </tr>
                                    <tr>
                                        <th>MNX1-AS1</th>
                                        <td>0.437</td>
                                    </tr>
                                    <tr>
                                        <th>LINC02593</th>
                                        <td>0.432</td>
                                    </tr>
                                    <tr>
                                        <th>CRNDE</th>
                                        <td>0.432</td>
                                    </tr>
                                    <tr>
                                        <th>FOXF2-DT</th>
                                        <td>0.430</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p style={{ fontStyle: 'italic' }}>
                            Table 2. Top 20 lncRNAs that mostly correlate with HOTAIR ranked
                            by Pearson’s
                            correlation coefficients.
                        </p>
                        <p>
                            Download Table 2:
                            <a href="">gene_correlations/HOTAIR_correlated_lncRNAs.csv</a>
                        </p>
                    </div>
                </div>

                <h4>Enrichment analysis applied to the top 200 most correlated genes with HOTAIR</h4>
                <p>
                    The top 200 most correlated genes with HOTAIR were submitted to Enrichr [2-4] for enrichment
                    analysis. NOTE: Only
                    genes with official Entrez gene symbols are submitted to Enrichr. Ensembl IDs that do not map to an
                    official
                    gene symbol were dropped.
                </p>
                <p>
                    Access the enrichment analysis results for HOTAIR 200 most correlated genes here:
                    <a
                        href=""
                    >
                        https://maayanlab.cloud/Enrichr/enrich?dataset=564bc230f69acf57b31ab657c7602179
                    </a>
                </p>

                <h4>Predicted Biological Functions of HOTAIR</h4>
                <p>
                    For each Enrichr library, the mean Pearson’s correlation coefficients are calculated between each
                    gene set and
                    HOTAIR. Terms with a high mean Pearson’s correlation coefficients are prioritized. These terms are
                    predicted to
                    be associated with HOTAIR.
                </p>
                <div className="row">
                    <div className="col-6">
                        <p>
                            <img
                                className="image-fluid w-100"
                                id="fig1"
                                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' id='visual' viewBox='0 0 900 600' width='900' height='600'%3E%3Crect x='0' y='0' width='900' height='600' fill='%23aaaaaa'%3E%3C/rect%3E%3C/svg%3E"
                                alt="Predicted MGI Mammalian Phenotypes and GO Biological Processes for the lncRNA HOTAIR. Terms are ranked by the mean Pearson correlation between HOTAIR and the associated gene sets."
                            />
                        </p>
                        <p style={{ fontStyle: 'italic' }}>
                            Figure 1. Predicted MGI Mammalian Phenotypes and GO Biological
                            Processes for
                            the
                            lncRNA HOTAIR. Terms are ranked by the mean Pearson correlation between HOTAIR and the
                            associated gene
                            sets.
                        </p>
                        <p>
                            Download predictions:
                            <a href="">
                                predicted_functions/MGI Mammalian Phenotype Level 4
                                2021_HOTAIR.csv
                            </a>
                        </p>
                        <p>
                            Download predictions:
                            <a href="">
                                predicted_functions/GO Biological Process
                                2021_HOTAIR.csv
                            </a>
                        </p>
                    </div>
                    <div className="col-6">
                        <p>
                            <img
                                className="image-fluid w-100"
                                id="fig2"
                                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' id='visual' viewBox='0 0 900 600' width='900' height='600'%3E%3Crect x='0' y='0' width='900' height='600' fill='%23aaaaaa'%3E%3C/rect%3E%3C/svg%3E"
                                alt="Predicted KEGG pathways and DisGeNET disease terms for the lncRNA HOTAIR. Terms are ranked by the mean Pearson correlation between HOTAIR and the associated gene sets."
                            />
                        </p>
                        <p style={{ fontStyle: 'italic' }}>
                            Figure 2. Predicted KEGG pathways and DisGeNET disease terms for
                            the lncRNA
                            HOTAIR.
                            Terms are ranked by the mean Pearson correlation between HOTAIR and the associated gene
                            sets.
                        </p>
                        <p>
                            Download predictions:
                            <a href="">predicted_functions/KEGG 2021 Human_HOTAIR.csv</a>
                        </p>
                        <p>
                            Download predictions:
                            <a href="">predicted_functions/DisGeNET_HOTAIR.csv</a>
                        </p>
                    </div>
                </div>

                <h4>Tissue and Cell Line Expression Levels of HOTAIR</h4>
                <p style={{ fontWeight: '600' }}>
                    This part of the report provides the Z-score (Normalized Median Expression)
                    for the
                    lncRNA in various tissues and cell lines.
                </p>
                <p>
                    Samples from Recount3 [1] were automatically labelled by their tissue type or cell line of
                    origin. Tissue and
                    cell line samples were log2 transformed and quantile normalized separately. For HOTAIR, the
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
                                alt="Z-score (median expression) for the lncRNA HOTAIR in various tissue types."
                            />
                        </p>
                        <p style={{ fontStyle: 'italic' }}>
                            Figure 3. Z-score (median expression) for the lncRNA HOTAIR
                            in various tissue
                            types.
                        </p>
                        <p>
                            Download table for z-score (median expression)in tissue types:
                            <a
                                href=""
                            >
                                tissue_and_cell_line_expression/HOTAIR_tissue_zscore.csv
                            </a>
                        </p>
                    </div>
                    <div className="col-6">
                        <p>
                            <img
                                className="image-fluid w-100"
                                id="fig4"
                                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' id='visual' viewBox='0 0 900 600' width='900' height='600'%3E%3Crect x='0' y='0' width='900' height='600' fill='%23aaaaaa'%3E%3C/rect%3E%3C/svg%3E"
                                alt="Z-score (median expression) for the lncRNA HOTAIR in the top 30 cell lines."
                            />
                        </p>
                        <p style={{ fontStyle: 'italic' }}>
                            Figure 4. Z-score (median expression) for the lncRNA HOTAIR
                            in the top 30
                            cell
                            lines.
                        </p>
                        <p>
                            Download table for z-score (median expression)in cell lines:
                            <a
                                href=""
                            >
                                tissue_and_cell_line_expression/HOTAIR_cell_line_zscore.csv
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
                            black arrow is pointing to the location of HOTAIR.
                        </p>
                        <p>
                            <img
                                className="image-fluid w-100"
                                id="fig5"
                                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' id='visual' viewBox='0 0 900 600' width='900' height='600'%3E%3Crect x='0' y='0' width='900' height='600' fill='%23aaaaaa'%3E%3C/rect%3E%3C/svg%3E"
                                alt="UMAP was applied to 2,000 randomly selected samples (with tissue type labels) from Recount3. Samples were first log2 transformed and quantile normalized (samples as features) before applying UMAP. Each data point is a lncRNA (n=5,050) and are colored by z-score (median expression) in testis."
                            />
                        </p>
                        <p style={{ fontStyle: 'italic' }}>
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
                            The black arrow is pointing to the location of HOTAIR.
                        </p>
                        <p>
                            <img
                                className="image-fluid w-100"
                                id="fig6"
                                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' id='visual' viewBox='0 0 900 600' width='900' height='600'%3E%3Crect x='0' y='0' width='900' height='600' fill='%23aaaaaa'%3E%3C/rect%3E%3C/svg%3E"
                                alt="UMAP was applied to 2,000 randomly selected samples (with cell line labels) from Recount3. Samples were first log2 transformed and quantile normalized (samples as features) before applying UMAP. Each data point is a lncRNA (n=5,050) and are colored by z-score (median expression) in FUJI."
                            />
                        </p>
                        <p style={{ fontStyle: 'italic' }}>
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
                <h4>L1000 Small Molecules Predicted to Modulate HOTAIR</h4>
                <p>
                    ~1.4 million L1000 chemical perturbation gene expression signatures (Level 5) were downloaded
                    from SigCom LINCS
                    (https://maayanlab.cloud/sigcom-lincs) [6]. For each signature, all 5,050 lncRNAs were ranked by
                    mean Pearson’s
                    correlation coefficients and the top 250 lncRNAs were retained for each signature. These
                    lncRNA-L1000 signature
                    associations are reported here. The signatures are ranked by their mean Pearson’s correlation
                    coefficients to
                    modulate the expression of HOTAIR. These associations are also separated by direction. If HOTAIR
                    is highly
                    correlated with the up-regulated genes for a specific small molecule, then this small molecule
                    is predicted to
                    up-regulate HOTAIR.
                </p>
                <h4>L1000 Small Molecules Predicted to Up-Regulate HOTAIR</h4>
                <p>The prioritized small molecules below are predicted to specifically up-regulate HOTAIR.</p>
                <div className="table-responsive-sm">
                    <table id="table3" className="table table-sm">
                        <thead>
                            <tr>
                                <th />
                                <th>L1000 Signature ID</th>
                                <th>Drug</th>
                                <th>Up/Down</th>
                                <th>Dose</th>
                                <th>Cell line</th>
                                <th>Time point</th>
                                <th>Mean Pearson Correlation</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>0</th>
                                <td>ERG005_VCAP_24H_I06_genistein_1.11uM up</td>
                                <td>genistein</td>
                                <td>up</td>
                                <td>1.11uM</td>
                                <td>VCAP</td>
                                <td>24H</td>
                                <td>0.241540</td>
                            </tr>
                            <tr>
                                <th>1</th>
                                <td>ERG005_VCAP_24H_J08_fluphenazine_4uM up</td>
                                <td>fluphenazine</td>
                                <td>up</td>
                                <td>4uM</td>
                                <td>VCAP</td>
                                <td>24H</td>
                                <td>0.222786</td>
                            </tr>
                            <tr>
                                <th>2</th>
                                <td>ERG005_VCAP_24H_I12_thioridazine_1.11uM up</td>
                                <td>thioridazine</td>
                                <td>up</td>
                                <td>1.11uM</td>
                                <td>VCAP</td>
                                <td>24H</td>
                                <td>0.218261</td>
                            </tr>
                            <tr>
                                <th>3</th>
                                <td>ERG005_VCAP_24H_E09_tretinoin_1.11uM up</td>
                                <td>tretinoin</td>
                                <td>up</td>
                                <td>1.11uM</td>
                                <td>VCAP</td>
                                <td>24H</td>
                                <td>0.206183</td>
                            </tr>
                            <tr>
                                <th>4</th>
                                <td>ERG015_VCAP_24H_H19_BRD-K61612515_10uM up</td>
                                <td>BRD-K61612515</td>
                                <td>up</td>
                                <td>10uM</td>
                                <td>VCAP</td>
                                <td>24H</td>
                                <td>0.198522</td>
                            </tr>
                            <tr>
                                <th>5</th>
                                <td>ERG005_VCAP_24H_J09_fulvestrant_4uM up</td>
                                <td>fulvestrant</td>
                                <td>up</td>
                                <td>4uM</td>
                                <td>VCAP</td>
                                <td>24H</td>
                                <td>0.194162</td>
                            </tr>
                            <tr>
                                <th>6</th>
                                <td>ERG005_VCAP_24H_K06_genistein_20uM up</td>
                                <td>genistein</td>
                                <td>up</td>
                                <td>20uM</td>
                                <td>VCAP</td>
                                <td>24H</td>
                                <td>0.192163</td>
                            </tr>
                            <tr>
                                <th>7</th>
                                <td>ERG005_VCAP_24H_I08_fluphenazine_1.11uM up</td>
                                <td>fluphenazine</td>
                                <td>up</td>
                                <td>1.11uM</td>
                                <td>VCAP</td>
                                <td>24H</td>
                                <td>0.185212</td>
                            </tr>
                            <tr>
                                <th>8</th>
                                <td>ERG005_VCAP_24H_K09_fulvestrant_20uM up</td>
                                <td>fulvestrant</td>
                                <td>up</td>
                                <td>20uM</td>
                                <td>VCAP</td>
                                <td>24H</td>
                                <td>0.185199</td>
                            </tr>
                            <tr>
                                <th>9</th>
                                <td>ERG005_VCAP_24H_J06_genistein_4uM up</td>
                                <td>genistein</td>
                                <td>up</td>
                                <td>4uM</td>
                                <td>VCAP</td>
                                <td>24H</td>
                                <td>0.182819</td>
                            </tr>
                            <tr>
                                <th>10</th>
                                <td>PAC059_U2OS_6H_C02_BRD-K60637442_10uM up</td>
                                <td>BRD-K60637442</td>
                                <td>up</td>
                                <td>10uM</td>
                                <td>U2OS</td>
                                <td>6H</td>
                                <td>0.175214</td>
                            </tr>
                            <tr>
                                <th>11</th>
                                <td>ERG005_VCAP_24H_I07_LY-294002_1.11uM up</td>
                                <td>LY-294002</td>
                                <td>up</td>
                                <td>1.11uM</td>
                                <td>VCAP</td>
                                <td>24H</td>
                                <td>0.173725</td>
                            </tr>
                            <tr>
                                <th>12</th>
                                <td>ERG005_VCAP_24H_I09_fulvestrant_1.11uM up</td>
                                <td>fulvestrant</td>
                                <td>up</td>
                                <td>1.11uM</td>
                                <td>VCAP</td>
                                <td>24H</td>
                                <td>0.171633</td>
                            </tr>
                            <tr>
                                <th>13</th>
                                <td>FIBR018_MCLF076SZ_6H_C02_BRD-A14233223_0.04uM up</td>
                                <td>BRD-A14233223</td>
                                <td>up</td>
                                <td>0.04uM</td>
                                <td>MCLF076SZ</td>
                                <td>6H</td>
                                <td>0.170627</td>
                            </tr>
                            <tr>
                                <th>14</th>
                                <td>FIBR018_MCLF076SZ_6H_G02_AC-55649_4uM up</td>
                                <td>AC-55649</td>
                                <td>up</td>
                                <td>4uM</td>
                                <td>MCLF076SZ</td>
                                <td>6H</td>
                                <td>0.164437</td>
                            </tr>
                            <tr>
                                <th>15</th>
                                <td>ERG005_VCAP_48H_D07_trifluoperazine_4uM up</td>
                                <td>trifluoperazine</td>
                                <td>up</td>
                                <td>4uM</td>
                                <td>VCAP</td>
                                <td>48H</td>
                                <td>0.162895</td>
                            </tr>
                            <tr>
                                <th>16</th>
                                <td>DOS011_VCAP_24H_L13_BRD-K96804382_4uM up</td>
                                <td>BRD-K96804382</td>
                                <td>up</td>
                                <td>4uM</td>
                                <td>VCAP</td>
                                <td>24H</td>
                                <td>0.161988</td>
                            </tr>
                            <tr>
                                <th>17</th>
                                <td>FIBR037_MCLF035SZ_6H_O21_risperidone_4uM up</td>
                                <td>risperidone</td>
                                <td>up</td>
                                <td>4uM</td>
                                <td>MCLF035SZ</td>
                                <td>6H</td>
                                <td>0.161717</td>
                            </tr>
                            <tr>
                                <th>18</th>
                                <td>FIBR039_MCLF056CN_6H_P07_BRD-K40853697_4uM up</td>
                                <td>BRD-K40853697</td>
                                <td>up</td>
                                <td>4uM</td>
                                <td>MCLF056CN</td>
                                <td>6H</td>
                                <td>0.161435</td>
                            </tr>
                            <tr>
                                <th>19</th>
                                <td>FIBR039_MCLF056CN_6H_M02_BRD-K55591206_4uM up</td>
                                <td>BRD-K55591206</td>
                                <td>up</td>
                                <td>4uM</td>
                                <td>MCLF056CN</td>
                                <td>6H</td>
                                <td>0.160179</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p style={{ fontStyle: 'italic' }}>
                    Table 3. L1000 small molecules predicted to up-regulate the lncRNA
                    HOTAIR. L1000 up
                    signatures are prioritized by their Pearson’s correlation coefficients with HOTAIR.
                </p>
                <p>
                    Download the table of ranked L1000 small molecules predicted to up-regulate HOTAIR:
                    <a
                        href=""
                    >
                        l1000_sm_predictions/HOTAIR_l1000_sm_predictions_up.csv
                    </a>
                </p>
                <h4>L1000 Small Molecules Predicted to Down-Regulate HOTAIR</h4>
                <p>The prioritized small molecules below are predicted to specifically down-regulate HOTAIR.</p>
                <div className="table-responsive-sm">
                    <table id="table4" className="table table-sm">
                        <thead>
                            <tr>
                                <th />
                                <th>L1000 Signature ID</th>
                                <th>Drug</th>
                                <th>Up/Down</th>
                                <th>Dose</th>
                                <th>Cell line</th>
                                <th>Time point</th>
                                <th>Mean Pearson Correlation</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>0</th>
                                <td>REP.B016_THP1_24H_A19_palbociclib_2.22uM down</td>
                                <td>palbociclib</td>
                                <td>down</td>
                                <td>2.22uM</td>
                                <td>THP1</td>
                                <td>24H</td>
                                <td>0.225923</td>
                            </tr>
                            <tr>
                                <th>1</th>
                                <td>CPD003_MCF7_24H_G01_fluorouracil_10uM down</td>
                                <td>fluorouracil</td>
                                <td>down</td>
                                <td>10uM</td>
                                <td>MCF7</td>
                                <td>24H</td>
                                <td>0.216835</td>
                            </tr>
                            <tr>
                                <th>2</th>
                                <td>REP.A016_JURKAT_24H_A19_palbociclib_10uM down</td>
                                <td>palbociclib</td>
                                <td>down</td>
                                <td>10uM</td>
                                <td>JURKAT</td>
                                <td>24H</td>
                                <td>0.214246</td>
                            </tr>
                            <tr>
                                <th>3</th>
                                <td>REP.B018_A375_24H_J19_AMG-232_2.22uM down</td>
                                <td>AMG-232</td>
                                <td>down</td>
                                <td>2.22uM</td>
                                <td>A375</td>
                                <td>24H</td>
                                <td>0.213194</td>
                            </tr>
                            <tr>
                                <th>4</th>
                                <td>REP.B016_JURKAT_24H_A19_palbociclib_2.22uM down</td>
                                <td>palbociclib</td>
                                <td>down</td>
                                <td>2.22uM</td>
                                <td>JURKAT</td>
                                <td>24H</td>
                                <td>0.210659</td>
                            </tr>
                            <tr>
                                <th>5</th>
                                <td>ERG005_VCAP_24H_C12_sirolimus_20uM down</td>
                                <td>sirolimus</td>
                                <td>down</td>
                                <td>20uM</td>
                                <td>VCAP</td>
                                <td>24H</td>
                                <td>0.206630</td>
                            </tr>
                            <tr>
                                <th>6</th>
                                <td>DPK.CP001_A549_24H_L04_nutlin-3_10uM down</td>
                                <td>nutlin-3</td>
                                <td>down</td>
                                <td>10uM</td>
                                <td>A549</td>
                                <td>24H</td>
                                <td>0.204354</td>
                            </tr>
                            <tr>
                                <th>7</th>
                                <td>REP.B018_A375_24H_C08_RG-7388_0.74uM down</td>
                                <td>RG-7388</td>
                                <td>down</td>
                                <td>0.74uM</td>
                                <td>A375</td>
                                <td>24H</td>
                                <td>0.202510</td>
                            </tr>
                            <tr>
                                <th>8</th>
                                <td>REP.B016_THP1_24H_A20_palbociclib_0.74uM down</td>
                                <td>palbociclib</td>
                                <td>down</td>
                                <td>0.74uM</td>
                                <td>THP1</td>
                                <td>24H</td>
                                <td>0.201694</td>
                            </tr>
                            <tr>
                                <th>9</th>
                                <td>DOS012_VCAP_24H_B08_BRD-K39597586_4uM down</td>
                                <td>BRD-K39597586</td>
                                <td>down</td>
                                <td>4uM</td>
                                <td>VCAP</td>
                                <td>24H</td>
                                <td>0.199811</td>
                            </tr>
                            <tr>
                                <th>10</th>
                                <td>ERG005_VCAP_24H_K05_estradiol_20uM down</td>
                                <td>estradiol</td>
                                <td>down</td>
                                <td>20uM</td>
                                <td>VCAP</td>
                                <td>24H</td>
                                <td>0.199233</td>
                            </tr>
                            <tr>
                                <th>11</th>
                                <td>REP.A016_HT29_24H_A19_palbociclib_10uM down</td>
                                <td>palbociclib</td>
                                <td>down</td>
                                <td>10uM</td>
                                <td>HT29</td>
                                <td>24H</td>
                                <td>0.198476</td>
                            </tr>
                            <tr>
                                <th>12</th>
                                <td>REP.A016_HT29_24H_E03_R-547_1.11uM down</td>
                                <td>R-547</td>
                                <td>down</td>
                                <td>1.11uM</td>
                                <td>HT29</td>
                                <td>24H</td>
                                <td>0.197931</td>
                            </tr>
                            <tr>
                                <th>13</th>
                                <td>REP.A016_HT29_24H_A22_palbociclib_0.37uM down</td>
                                <td>palbociclib</td>
                                <td>down</td>
                                <td>0.37uM</td>
                                <td>HT29</td>
                                <td>24H</td>
                                <td>0.197813</td>
                            </tr>
                            <tr>
                                <th>14</th>
                                <td>MUC.CP002_NKDBA_24H_I01_SA-1922659_10uM down</td>
                                <td>SA-1922659</td>
                                <td>down</td>
                                <td>10uM</td>
                                <td>NKDBA</td>
                                <td>24H</td>
                                <td>0.197738</td>
                            </tr>
                            <tr>
                                <th>15</th>
                                <td>REP.B004_A375_24H_E14_KPT-330_0.74uM down</td>
                                <td>KPT-330</td>
                                <td>down</td>
                                <td>0.74uM</td>
                                <td>A375</td>
                                <td>24H</td>
                                <td>0.197224</td>
                            </tr>
                            <tr>
                                <th>16</th>
                                <td>REP.B012_MCF10A_24H_O20_cobimetinib_0.74uM down</td>
                                <td>cobimetinib</td>
                                <td>down</td>
                                <td>0.74uM</td>
                                <td>MCF10A</td>
                                <td>24H</td>
                                <td>0.196907</td>
                            </tr>
                            <tr>
                                <th>17</th>
                                <td>CRCGN006_HEPG2_24H_O04_mitoxantrone_0.74uM down</td>
                                <td>mitoxantrone</td>
                                <td>down</td>
                                <td>0.74uM</td>
                                <td>HEPG2</td>
                                <td>24H</td>
                                <td>0.196828</td>
                            </tr>
                            <tr>
                                <th>18</th>
                                <td>REP.B016_A375_24H_E02_R-547_0.74uM down</td>
                                <td>R-547</td>
                                <td>down</td>
                                <td>0.74uM</td>
                                <td>A375</td>
                                <td>24H</td>
                                <td>0.196113</td>
                            </tr>
                            <tr>
                                <th>19</th>
                                <td>CPC001_VCAP_24H_C02_T-98475_10uM down</td>
                                <td>T-98475</td>
                                <td>down</td>
                                <td>10uM</td>
                                <td>VCAP</td>
                                <td>24H</td>
                                <td>0.196024</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p style={{ fontStyle: 'italic' }}>
                    Table 4. L1000 small molecules predicted to down-regulate the lncRNA
                    HOTAIR. L1000
                    down signatures are prioritized by their Pearson’s correlation coefficients with HOTAIR.
                </p>
                <p>
                    Download the table of ranked L1000 small molecules predicted to down-regulate HOTAIR:
                    <a
                        href=""
                    >
                        l1000_sm_predictions/HOTAIR_l1000_sm_predictions_down.csv
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