import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { DogDetails } from "../../actions/index";
import { Link } from "react-router-dom";
import "./Detail.css"


export default function DogDetail() {
    const dispatch = useDispatch();
    let { id } = useParams();

    useEffect(() => {
        dispatch(DogDetails(id));
    }, [dispatch, id]);

    const details = useSelector((state) => state.details)
    // console.log(details);

    let nameDog;
    let imageDog;
    let temperamentDog = [];
    let heightDog;
    let weightDog;
    let lifeSpanDog;

    if (details[0]) { //una vez ya se hayan traido los datos renderizalos
        nameDog = details[0].name;
        imageDog = details[0].image;
        heightDog = details[0].height;
        weightDog = details[0].weight;
        lifeSpanDog = details[0].life_span;

        if (details[0].temperaments[0]) {
            temperamentDog = [...details[0].temperaments]
        }

        if (details[0].temperaments[0].name) {
            temperamentDog = details[0].temperaments.map(temp => temp.name)
        }
    };



    return (
        <div className="main-container">
            <Link to="/home">
                <button className>Home</button>
            </Link>
            <div className>
                <div className>

                    <div className>
                        <img src={imageDog} alt={`imagen de ${nameDog}`} />
                    </div>

                    <div className>
                        <h1>{nameDog}</h1>
                        <h3>{`Height: ${heightDog && heightDog[0]} - ${heightDog && heightDog[1]} CM`}</h3>
                        <h3>{`Weight: ${heightDog && weightDog[0]} - ${weightDog && weightDog[1]} KG`}</h3>
                        <h3>{`Lifespan: ${lifeSpanDog}`}</h3>
                        <div>
                            <h3>Temperaments</h3>
                            <ul className>
                                {temperamentDog.map(t => <li key={t}>{t}</li>)}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}