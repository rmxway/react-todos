import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Nav } from '../styled';

export const Navbar = ({ onToggle, colorTheme }) => {
    return (
        <Nav>
            <div className="container">
                <img src="img/logo.png" alt="" />

                {/* Переключение цвета темы */}
                <Button onClick={() => onToggle()}>
                    {colorTheme === 'light' ? 'Светлая' : 'Темная'} тема
                </Button>

                <ul>
                    <li>
                        <NavLink exact to="/" activeClassName="active">
                            Notes
                        </NavLink>
                    </li>
                    <li>
                        <NavLink exact to="/motion" activeClassName="active">
                            Motion
                        </NavLink>
                    </li>
                </ul>
            </div>
        </Nav>
    );
};
