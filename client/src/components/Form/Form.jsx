import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTemperaments, postDog } from "../../actions/index";
import "./From.css"


const validate = (form) => {
    const { name, min_height, max_height, min_weight, max_weight, life_span } = form;
    const errors = {};

    if (!name || /\d/.test(name)) {
        errors.name = "Name is required and should not contain numbers";
    }

    if (!min_height || !max_height) {
        errors.height = "Height is required";
    }

    if (!min_weight || !max_weight) {
        errors.weight = "Weight is required";
    }

    const lifeSpanRegex = /^\d+\-\d+$/;
    if (!life_span || !lifeSpanRegex.test(life_span)) {
        errors.life_span = "Lifespan is required and should be in the format of 'number-number'";
    }

    return errors;
};

export default function Form() {

    const dispatch = useDispatch();
    const temperaments = useSelector((state) => state.temperaments);

    const [button, setButton] = useState(true);
    const [errors, setErrors] = useState({
        name: "",
        min_height: "",
        max_height: "",
        min_weight: "",
        max_weight: "",
        life_span: "",
        image: "",
    });

    const [form, setForm] = useState({
        name: "",
        min_height: "",
        max_height: "",
        min_weight: "",
        max_weight: "",
        life_span: "",
        image: "",
        temperaments: [],
    })

    useEffect(() => {
        dispatch(getTemperaments());
    }, [dispatch]);

    useEffect(() => {//verefico que se hayan completado los campos,sino el boton queda desactivado
        if (form.name.length > 0 && form.min_height.length > 0 && form.max_height.length > 0 && form.min_weight.length > 0 && form.max_weight.length > 0) setButton(false)
        else setButton(true)
    }, [form, setButton]);

    const handleSubmit = (e) => { //creo el perro y reseteo el form 
        e.preventDefault();
        dispatch(postDog(form));
        alert("The new dog was added successfully");
        setForm({
            name: "",
            min_height: "",
            max_height: "",
            min_weight: "",
            max_weight: "",
            life_span: "",
            image: "",
            temperaments: []
        });
    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value //tomo el valor del campi en tiempo real
        });
        setErrors(validate({
            ...form,
            [e.target.name]: e.target.value
        }))
    }

    const handleSelect = (e) => {
        setForm({
            ...form,
            temperaments: [...form.temperaments, e.target.value]
        })
    }

    const handleDelete = (el) => {
        setForm({
            ...form,
            temperaments: form.temperaments.filter(temp => temp !== el)
        })
    }

    return (
        <div className="form-container">
            <div className="form-header">
                <Link to="/home">
                    <button className="header-button">Go home</button>
                </Link>
                <form action="" id="form" onSubmit={handleSubmit} className="dog-form">
                    <div className="input-container">
                        <input className="name-input" type="text" value={form.name} name="name" onChange={(e) => handleChange(e)} placeholder="Name" />
                    </div>
                    <div className="error-container">{errors.name && <p>{errors.name}</p>}</div>

                    <div className="height-container">
                        <div className="min-height-input-container">
                            <input type="text" value={form.min_height} name="min_height" placeholder="Min height" onChange={(e) => handleChange(e)} />
                        </div>

                        <div className="max-height-input-container">
                            <input type="text" value={form.max_height} name="max_height" placeholder="Max height" onChange={(e) => handleChange(e)} />
                        </div>
                    </div>
                    <div className="error-container">{errors.height && <p>{errors.height}</p>}</div>

                    <div className="weight-container">
                        <div className="min-weight-input-container">
                            <input type="text" value={form.min_weight} name="min_weight" placeholder="Min weight" onChange={(e) => handleChange(e)} />
                        </div>

                        <div className="max-weight-input-container">
                            <input type="text" value={form.max_weight} name="max_weight" placeholder="Max weight" onChange={(e) => handleChange(e)} />
                        </div>
                    </div>
                    <div className="error-container">{errors.weight && <p>{errors.weight}</p>}</div>

                    <div className="life-span-container">
                        <input type="text" autoComplete="off" name="life_span" value={form.life_span} placeholder="lifespan example: 10 - 12" onChange={(e) => handleChange(e)} />
                    </div>
                    <div className="error-container">{errors.life_span && <p>{errors.life_span}</p>}</div>

                    <div className="image-input-container">
                        <input type="text" autoComplete="off" value={form.image} name="image" placeholder="Image URL" onChange={(e) => handleChange(e)} />
                    </div>

                    <div className="select-container">
                        <h3>Select Temperaments</h3>
                        <select className="temperament-select" onChange={handleSelect}>
                            <option disabled selected>Temperaments</option>
                            {temperaments.map(d => (
                                <option value={d.name} key={d.name + Math.random()} className="temperament-option">{d.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="button-container">
                        <button className="create-dog-button" disabled={button} type="submit" form="form">Create Dog</button>
                    </div>
                </form>

                <div className="temperament-list-container">
                    <div className="temperament-list-header">
                        <h2>Temperaments</h2>
                    </div>

                    <div className="temperament-list">
                        {form.temperaments.map(el =>
                            <div className="temperament-item" key={el} onClick={() => handleDelete(el)}>
                                <p>{`${el}`}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}