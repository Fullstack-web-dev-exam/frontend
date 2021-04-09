import React, { Component } from 'react';
import { Link } from "react-router-dom";

function Nav(props) {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">About</Link>
                </li>
            </ul>
        </nav>
    );
}

