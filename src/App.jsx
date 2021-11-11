import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Footer from './Footer';
import Header from './Header';
import Search from './Search';
import Dashboard from './Dashboard';
import Brand from './Brand';

class App extends React.Component {
    render() {
        return (
            <>
                <Header />
                <Brand />
                <Search />
                <Dashboard />
                <Footer />
            </>
        );
    }
}

export default App;
