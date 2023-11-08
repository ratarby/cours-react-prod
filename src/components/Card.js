import React from 'react';

const Card = ({ country, index}) => {

    return (
        <div className="card" key={index}>
            <li >
                <img 
                    src={country.flags.svg} 
                    alt={country.translations.fra.common}  
                />
                <div className="infos">
                    <h2>{country.translations.fra.common}</h2>
                    <h4>{country.capital}</h4>
                    <p>
                        {country.population.toLocaleString()}
                    </p>
                </div>
            </li>
        </div>
            

    );
};

export default Card;