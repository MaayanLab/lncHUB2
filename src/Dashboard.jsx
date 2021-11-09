import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';


class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            appyters: null,
        };
    }

    renderCard(appyter) {
        return (
            <Card value={appyter}/>
        );
    }

    render() {
        return (
            <div>

            </div>
        );
    }
}
