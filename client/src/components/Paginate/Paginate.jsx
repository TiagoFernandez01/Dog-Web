import React from "react";
import "./Paginate.css"

export default function Paginate({ dogsPerPage, allDogs, paginate, currentPage }) {
    let pageNumbers = [];
    Array.from({ length: Math.ceil(allDogs / dogsPerPage) }, (_, i) => i + 1)
        .forEach(number => pageNumbers.push(number));

    const lastPage = pageNumbers.length;

    const handlePrevPage = () => {
        if (currentPage > 1) {
            paginate(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < lastPage) {
            paginate(currentPage + 1);
        }
    };

    return (
        <nav className="nav-container">
            <ul className="ul-container">
                <li className="li-container" onClick={() => handlePrevPage()}>
                    <button type="button">Prev</button>
                </li>
                {pageNumbers && pageNumbers.map(number => (
                    <li className="li-container" onClick={() => paginate(number)} key={number}>
                        <button type="button">{number}</button>
                    </li>
                ))}
                <li className="li-container" onClick={() => handleNextPage()}>
                    <button type="button">Next</button>
                </li>
            </ul>
        </nav>
    )
}