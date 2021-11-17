import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Appyter from './Appyter';
import mockPlot from '../public/mock_plot.png';

export default class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            appyter: { gene: '', id: '' },
        };
    }

    render() {
        const { gene } = this.state.appyter;
        console.log(gene);
        return (
            <div className="card m-2" style={{ width: '35rem' }}>
                <div className="row no-gutters">
                    <div className="col-4">
                        {/* img src="https://appyters.maayanlab.cloud/lncRNA_Appyter/${this.props.appyter_id}/mock_plot.png" */}
                        <img
                            src={mockPlot}
                            style={{ width: '200px', height: '160px' }}
                            className="card-img-left p-2"
                            alt="..."
                        />
                    </div>
                    <div className="col-8">
                        <div className="card-body">
                            <h5 className="card-title">{this.props.appyter.gene}</h5>
                            <p className="card-text">
                                Some quick example text to build on the card title and make up the
                                bulk of
                                the card&apos;s content.
                            </p>
                        </div>
                    </div>
                    <div className="card-footer" style={{ background: 'white' }}>
                        <div className="accordion accordion-flush" id="accordion1">
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="flush-heading1">
                                    <button
                                        className="accordion-button collapsed"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#flush-collapse1"
                                        aria-expanded="false"
                                        aria-controls="flush-collapse1"
                                    >
                                        <Appyter />
                                    </button>
                                </h2>
                                <div
                                    id="flush-collapse1"
                                    className="accordion-collapse collapse"
                                    aria-labelledby="flush-heading1"
                                    data-bs-parent="#accordion1"
                                >
                                    <div className="accordion-body">
                                        Placeholder content for this accordion, which is
                                        intended to demonstrate the
                                        <code>.accordion-flush</code>
                                        {' '}
                                        class. This is the
                                        first item&apos;s accordion body.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
