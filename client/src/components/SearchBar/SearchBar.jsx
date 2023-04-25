import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getBreed } from "../../actions/index";
import "./SearchBar.css"

export default function SearchBar() {
    const dispatch = useDispatch();
    const [searchDog, setSearchDog] = useState("");

    const handleInput = (e) => {
        e.preventDefault()
        setSearchDog(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(getBreed(searchDog));
    }

    return(
        <div className="search-container">
            <input className="search-input" type="text" onChange={handleInput} placeholder="Search..."/>
            <button className="search-buttom" type="submit" onClick={handleSubmit}>
                Search
            </button>
        </div>
    )
}