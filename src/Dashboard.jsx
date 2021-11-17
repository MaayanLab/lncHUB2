import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Card from './Card';

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            appyters: JSON.parse('/public/appyters.json'),
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
