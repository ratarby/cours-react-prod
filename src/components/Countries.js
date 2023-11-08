import React, { useEffect, useState } from 'react';
import axios from "axios";
import Card from './Card';

const Countries = () => {
    const [ data, setData] = useState([]);
    const [rangeValue, setRangeValue] = useState(36);
    const [selectedRadio, setSelectedRadioValue] = useState("");
    const radios = ["Africa", "America", "Asia", "Europe", "Oceania"];

    // Le useEffect se joue lorsque le composant est monté
    useEffect(() => {
        axios
            .get('https://restcountries.com/v3.1/all')
            .then((res) => {
                setData(res.data);
            });
    }, []);
    return (
        <div>
            <div className="countries">
                <ul className="radio-container">
                    <input type="range" 
                    min="1" 
                    max="250" 
                    defaultValue={rangeValue} 
                    onChange={(e) => setRangeValue(e.target.value)}
                    />
                    {radios.map((continents) => (
                        <li>
                            <input 
                                type="radio" 
                                id={continents}
                                name="continentsRadio" 
                                checked = {selectedRadio === continents}
                                onChange={(e) => setSelectedRadioValue(e.target.id)} />
                            <label htmlFor={continents}>{continents}</label>
                        </li>
                    ))}
                </ul>
                {selectedRadio  && <button on onClick={() => setSelectedRadioValue("")}>Annuler la recherche</button>}
                <ul>
                    {data
                        .filter((country) => country.continents[0].includes(selectedRadio))
                        .sort((a, b) => b.population - a.population)
                        .slice(0,rangeValue)
                        .map((country, id) => (
                            <Card key={id} country={country}/>
                    ))}
                </ul>
            </div>
        </div>
    );
};
export default Countries;


