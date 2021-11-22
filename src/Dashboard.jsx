import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import AppytersList from '../public/appyters.json';

import Card from './Card';

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            appyters: AppytersList,
        };
    }

    renderCard(appyter) {
        return (
            <Card appyter={{ appyter }} key={ appyter.id } />
        );
    }

    render() {
        const cards = [];
        for (const appyter of this.state.appyters) {
            cards.push(<div>{this.renderCard(appyter)}</div>);
        }
        return (
            <div className="row justify-content-center my-3">
                {cards}
            </div>
        );
    }
}
