import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs, getTemperaments, FilterByTemperament, OrderByName, OrderByWeight, filterDogs } from "../../actions";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import Paginate from "../Paginate/Paginate";
import SearchBar from "../SearchBar/SearchBar";
import "./Home.css"

function Home() {
  const dispatch = useDispatch();
  const allDogs = useSelector(state => state.dogs); //valores del estado global de redux que requiero
  const allTemperaments = useSelector(state => state.temperaments);
  

  const [currentPage, setCurrentPage] = useState(1);
  const dogsPerPage = 8;
  const lastIndex = currentPage * dogsPerPage;
  const firstIndex = lastIndex - dogsPerPage;
  const currentDogs = allDogs.slice(firstIndex, lastIndex);

  console.log(currentDogs);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  };

  
  const [orden, setOrden] = useState("");

  useEffect(() => {
    // usamos useEffect para despachar ambas actions una vez montado el componente
    dispatch(getDogs());
    dispatch(getTemperaments());
  }, [dispatch]);

  const handleFilterByTemperament = (e) => {
    e.preventDefault();
    dispatch(FilterByTemperament(e.target.value));
  };

  const handleOrderByName = (e) => {
    e.preventDefault();                                    //creamos los handlers para ejecutar nuestras actions de ordenamineto y filtrado
    dispatch(OrderByName(e.target.value));
    setOrden(`Sorted ${e.target.value}`);
  };

  const handleOrderByWeight = (e) => {
    e.preventDefault();
    dispatch(OrderByWeight(e.target.value));
    setOrden(`Sorted ${e.target.value}`);
  };

  const handleFIlterDods = (e) => {
    e.preventDefault();
    dispatch(filterDogs(e.target.value));

  };

  return (
    <>
      <header className="header-container">
        <div className="header-content">
          <div className="search-bar-container">
            <SearchBar />
            <div className="select-container">
              <select onChange={handleOrderByName} className="order-select">
                <option disabled selected defaultValue>
                  Alphabetical order
                </option>
                <option value="A-Z">A-Z</option>
                <option value="Z-A">Z-A</option>
              </select>

              <select onChange={handleOrderByWeight} className="filter-select">
                <option disabled selected defaultValue>
                  Filter by weight
                </option>
                <option value="max_weight">Max</option>
                <option value="min_weight">Min</option>
              </select>

              <select className="filter-select" onChange={handleFIlterDods}>
                <option value="All_dogs" >All Dogs</option>
                <option value="db_dogs" >DB Dogs</option>
                <option value="api_dogs" >API Dogs</option>
              </select>

              <select onChange={handleFilterByTemperament} className="temperament-select">
                <option disabled selected defaultValue>Temperaments</option>
                <option value="All">All</option>
                {
                  allTemperaments?.map(el => (
                    <option value={el.name} key={el.id}>{el.name}</option>
                  ))
                }
              </select>
            </div>
          </div>
          <div className="create-dog-container">
            <Link to="/dog">
              <button className="create-dog-button">CREATE DOG</button>
            </Link>
          </div>
        </div>
      </header>

      <hr />

      <div className="dog-list-container">
        <div className="dog-list-content">
          {currentDogs?.map((el) => {
            return (
              <div className="dog-card-container" key={el.id}>
                <Link to={"/dog-detail/" + el.id}>
                  {
                    <Card key={el.id} image={el.image} name={el.name} temperaments={el.temperaments[0].name ? el.temperaments.map(el => el.name) : el.temperaments} />
                  }
                </Link>
              </div>
            )
          })}
        </div>
        <div className="paginate-container">
          <Paginate dogsPerPage={dogsPerPage} allDogs={allDogs.length} paginate={paginate} currentPage={currentPage} />
        </div>
      </div>
    </>
  )
};

export default Home;