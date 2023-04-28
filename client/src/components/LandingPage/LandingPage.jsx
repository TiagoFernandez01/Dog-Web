import React from "react";
import { Link } from "react-router-dom";
import img from '..//../images/landingDog.png'
import "./LandingPage.css"

function LandingPage() {
    return (

        <div className="landing-container">

            <div>
                <h1 >Dog Page</h1>
                <p className="parragraph">
                    Come in, search and discover your favorite dog breeds!
                    Search for your pet or create it yourself now!
                </p>

                <div>
                    <img src={img} alt="dog" />
                </div>
                <Link to='/home'>
                    <button className="btn"> Join! </button>
                </Link>
            </div>
        </div>
    )
}

export default LandingPage;