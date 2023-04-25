import React from "react";
import "./Paginate.css"

export default function Paginate({ dogsPerPage, allDogs, paginate }) {
    let pageNumbers = [];
    Array.from({ length: Math.ceil(allDogs / dogsPerPage) }, (_, i) => i + 1)
        .forEach(number => pageNumbers.push(number));

        return(
            <nav className="nav-container">
                <ul className="ul-container">
                    { pageNumbers && pageNumbers.map(number => (
                        <li className="li-container" onClick={()=> paginate(number)} key={number}>
                            <button type="button">{number}</button>
                        </li>
                    ))}
                </ul>
            </nav>
        )
}