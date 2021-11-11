import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';

export default class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: null,
            appyters: null,
        };
        this.handleChange = this.handleChange.bind(this);
        this.retrieveAppyters = this.retrieveAppyters.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    retrieveAppyters(search) {

    }

    render() {
        return (
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Input a gene symbol or Ensembl ID"
                    aria-label="lncRNA"
                    aria-describedby="search-button"
                    value={this.state.search}
                    onChange={this.handleChange}
                />
                <button
                    className="btn btn-outline-secondary"
                    type="button"
                    id="search-button"
                    onClick={this.retrieveAppyters(this.state.search)}
                >
                    Search
                </button>
            </div>
        );
    }
}
