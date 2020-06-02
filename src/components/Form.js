import React, { useState } from 'react';
import Error from './Error';
import PropTypes from 'prop-types';

const Form = ({search, saveSearch, saveQuery}) => {

    const [ error, saveError ] = useState(false);

    // Destructure city and country
    const { city, country } = search;

    // Puts elements on state
    const handleChange = e => {
        // Update state
        saveSearch({
            ...search,
            [e.target.name] : e.target.value
        })
    }

    // User submits form
    const handleSubmit = e => {
        e.preventDefault();

        // Validation
        if(city.trim() === '' || country.trim() === ''){
            saveError(true);
            return;
        }

        saveError(false);

        saveQuery(true);
    }

    return (  
        <form
            onSubmit={handleSubmit}
        >
            {error ? <Error message="All fields are required"/> : null}
            <div className="input-field col s12">
                <input 
                    type="text"
                    name="city"
                    id="city"
                    value={city}
                    onChange={handleChange}
                />
                <label htmlFor="city">City: </label>
            </div>
            <div className="input-field col s12">
                <select 
                    name="country"
                    id="country"
                    value={country}
                    onChange={handleChange}
                >
                    <option value="">-- Select a country --</option>
                    <option value="US">Estados Unidos</option>
                    <option value="MX">México</option>
                    <option value="AR">Argentina</option>
                    <option value="CO">Colombia</option>
                    <option value="CR">Costa Rica</option>
                    <option value="ES">España</option>
                    <option value="PE">Perú</option>
                </select>
                <label htmlFor="country">Country: </label>
            </div>
            <div className="input-field col s12">
                <button 
                    type="submit" 
                    className="waves-effect waves-light btn-large btn-block yellow accent-4"
                >
                    Search Weather
                </button>
            </div>
        </form>
    );
}

Form.propTypes = {
    search: PropTypes.object.isRequired,
    saveSearch: PropTypes.func.isRequired,
    saveQuery: PropTypes.func.isRequired
}
export default Form;