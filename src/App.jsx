import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Footer from './Footer';
import Header from './Header';
import Search from './Search';
import Dashboard from './Dashboard';
import Brand from './Brand';

export default function App() {
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
