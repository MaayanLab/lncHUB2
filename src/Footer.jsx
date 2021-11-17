import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import MaayanlabLogo from '../public/maayanlab_logo.png';
import IcahnCbLogo from '../public/icahn_cb_logo.png';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="row justify-content-center m-5">
                    <div className="col-md-2 col-sm text-center">
                        <a href="https://icahn.mssm.edu/research/bioinformatics" target="_blank" rel="noreferrer">
                            <img
                                className="rounded"
                                src={IcahnCbLogo}
                                style={{ height: '5rem' }}
                                alt="Icahn School of Medicine at Mount Sinai Center of Bioinformatics logo"
                            />
                        </a>
                    </div>

                    <div className="col-md-2 col-sm text-center">
                        <a href="https://labs.icahn.mssm.edu/maayanlab/" target="_blank" rel="noreferrer">
                            <img
                                className="rounded"
                                src={MaayanlabLogo}
                                style={{ height: '5rem' }}
                                alt="Ma'ayan lab logo"
                            />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
