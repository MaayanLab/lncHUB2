import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Card from './Card';

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            appyters: null,
        };
    }

    renderCard(appyter) {
        return (
            <Card appyter={{ gene: 'HOTAIR', appyter: '001' }} />
        );
    }

    render() {
        return (
            <div>
                {this.renderCard('')}
            </div>
        );
    }
}
