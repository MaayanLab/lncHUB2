import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Appyter from './Appyter';
import mockPlot from '../static/mock_plot.png';

window.bootstrap = require('bootstrap');

export default function Card(props) {
    const { appyter } = props.appyter;

    return (
        <div className="card m-2">
            <div className="row no-gutters">
                <div className="col-4">
                    {/* img templates="https://appyters.maayanlab.cloud/lncRNA_Appyter/${this.props.appyter_id}/mock_plot.png" */}
                    <img
                        src={mockPlot}
                        style={{ width: '200px', height: '160px' }}
                        className="card-img-left p-2"
                        alt="..."
                    />
                </div>
                <div className="col-8">
                    <div className="card-body">
                        <h5 className="card-title">{appyter.gene}</h5>
                        <p className="card-text">
                            Some quick example text to build on the card title and make up the
                            bulk of
                            the card&apos;s content.
                        </p>
                    </div>
                </div>
                <div className="card-footer" style={{ background: 'white' }}>
                    <div className="accordion accordion-flush" id={`accordion${appyter.id}`}>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id={`flush-heading${appyter.id}`}>
                                <button
                                    className="accordion-button collapsed"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target={`#flush-collapse${appyter.id}`}
                                    aria-expanded="false"
                                    aria-controls={`flush-collapse${appyter.id}`}
                                />
                            </h2>
                            <div
                                id={`flush-collapse${appyter.id}`}
                                className="accordion-collapse collapse"
                                aria-labelledby={`flush-heading${appyter.id}`}
                                data-bs-parent={`#accordion${appyter.id}`}
                            >
                                <div className="accordion-body">
                                    <Appyter appyter={props.appyter} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
