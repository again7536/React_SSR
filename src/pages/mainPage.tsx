import React from 'react';
import { Link } from 'react-router-dom';

export default function IntroPage() {
    return (
        <div>
            <h1>Hello, world!</h1>
            <Link to="/intro">
                <h2>Intro</h2>
            </Link>
        </div>
    )
}