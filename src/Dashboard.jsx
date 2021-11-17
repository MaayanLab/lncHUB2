import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Card from './Card';
import AppytersList from '../public/appyters.json'

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            appyters: AppytersList,
        };
    }

    renderCard(appyter) {
        return (
            <Card appyter={{ appyter }} />
        );
    }

    render() {
        const cards = [];
        for (const appyter of this.state.appyters) {
            cards.push(<div>{this.renderCard(appyter.id)}</div>);
        }
        return (
            <div>
                {cards}
            </div>
        );
    }
}
