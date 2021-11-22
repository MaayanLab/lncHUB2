import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Footer from './Footer';
import Header from './Header';
import Search from './Search';
import Dashboard from './Dashboard';
import Brand from './Brand';
import AppytersList from '../public/appyters.json';

export default function App() {
    return (
        <div className="container">
            <Header />
            <Brand />
            <Search />
            <Dashboard appyters={ AppytersList } />
            <Footer />
        </div>
    );
}
