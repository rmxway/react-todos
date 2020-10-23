import React from 'react';

export const Navbar = () => (
    <nav className="navbar">
        <div className="container">
            <img src="img/logo.png" alt="" />
            <ul>
                <li>
                    <a href="/">Notes</a>
                </li>
                <li>
                    <a href="/about">About</a>
                </li>
            </ul>
        </div>
    </nav>
);
