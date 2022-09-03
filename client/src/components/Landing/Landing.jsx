import React from 'react';

import img from '../../481909.png';
import {Link} from 'react-router-dom';

import './Landing.css';
const Landing = () => {


    return (
        <>
            <div className="img_landing">
                <h1>Pokemon APP PI</h1>
                <button>
                <Link to='/home'>
                Home
                </Link>
                
                </button>
                <img src={img}  alt="img_p481909"/>
            </div>
        </>
    )
}

export default Landing;