import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';

export default class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            table: props.table,
        };
    }

    render() {
        return (
            <div />
        );
    }
}
