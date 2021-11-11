import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';


export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            appyters: null,
        };
    }

    renderCard(appyter) {
        return (
            <Card appyter_id={appyter_id}/>
        );
    }

    render() {
        return (
            <div>

            </div>
        );
    }
}
