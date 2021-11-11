import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';

export default class Brand extends React.Component {
    render() {
        return (
            <div className="row mt-2">
                <div className="d-flex justify-content-center align-items-start">
                    <img className="img-fluid mx-2" style="width: 60px;" src="/public/logo.png" />
                    <h1 className="display-5">lncRNA function prediction</h1>
                </div>
                <p className="text-center">
                    Predict the biological functions of long non-coding RNAs from Recount3 using
                    lncRNA-gene
                    co-expression.
                </p>
            </div>
        );
    }
}
