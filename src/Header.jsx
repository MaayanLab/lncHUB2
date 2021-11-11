import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';

export default class Header extends React.Component {
    render() {
        return (
            <div>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta property="og:title" content="lncRNA Appyter Catalog" />
                <meta property="og:type" content="website" />
                <meta name="author" content="Ma'ayan Lab" />
                <link rel="shortcut icon" href="/logos/logo.png" type="image/x-icon" />
                <link rel="manifest" href="/site.webmanifest" />
                <meta name="theme-color" content="#ffffff" />
                <title>lncRNA Appyter Catalog</title>
            </div>
        );
    }
}
