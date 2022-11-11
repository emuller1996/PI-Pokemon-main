import React from 'react';

import img from '../../481909.png';
import {Link} from 'react-router-dom';
import Button from '@mui/material/Button';
import './Landing.css';
const Landing = () => {


    return (
        <>
            <div className="img_landing">
                <h1>Pokemon APP PI</h1>
                <Button variant="contained">
                <Link to='/home'>
                Home
                </Link>
                
                </Button>
                <img src={img}  alt="img_p481909"/>
            </div>
        </>
    )
}

export default Landing;