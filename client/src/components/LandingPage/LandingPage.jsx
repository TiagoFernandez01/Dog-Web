import React from "react";
import { Link } from "react-router-dom";
import img from '../LandingPage/img/landingDog.png'

import style from "../LandingPage/LandingPage.module.css"

function LandingPage() {
    return (

        <body className={`${style.contedor_uno}`}>


            <div className={`${style.main_container}`}>
                <h1 className={`${style.tittle}`}>Dog Page</h1>
                <p>
                    Come in, search and discover your favorite dog breeds!
                    Search for your pet or create it yourself now!
                </p>

                <div className={`${style.img_container}`}>
                    <img src={img} alt="dog" />
                </div>
                <Link to='/home'>
                    <button class={`${style.btn}`}> Join! </button>
                </Link>
            </div>
        </body>
    )
}

export default LandingPage;