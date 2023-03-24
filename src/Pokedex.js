import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Pokedex = () => {

    // Set state for pokemon data
    const [pokemonData, setPokemonData] = useState([]);
    // Set state for search
    const [searchTerm, setSearchTerm] = useState('');
    // Set states for pagenation
    const [currentPage, setCurrentPage] = useState('https://pokeapi.co/api/v2/pokemon?limit=20');
    const [nextPage, setNextPage] = useState('');
    const [prevPage, setPrevPage] = useState('');
    const [loading, setLoading] = useState(true);


    // Effect for collecting pokemon data
    useEffect(() => {
        axios.get('https://pokeapi.co/api/v2/pokemon?limit=20')
            .then((response) => {
                setPokemonData(response.data.results);
            });
    }, []);

    // Set useEffect for our pagenation
    useEffect(() => {
        setLoading(true);
        axios.get(currentPage)
            .then((response) => {
                setLoading(false);
                setNextPage(response.data.next);
                setPrevPage(response.data.previous);
                setPokemonData(response.data.results);
            });
    }, [currentPage]);

    // Handle the search change
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    }

    // Filter the pokemon based on search terms
    const filteredPokemon = pokemonData.filter((pokemon) => {
        return pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
    })

    // pagenation
    const gotoNextPage = () => {
        setCurrentPage(nextPage);
    }

    const gotoPrevPage = () => {
        setCurrentPage(prevPage);
    }

    return (
    <div className="pokedex">
        <h1>POKEDEX</h1>
        <input type='text' value={searchTerm} placeholder='Search pokemon here...' onChange={handleSearchChange} />
        <ul>
            {filteredPokemon.map((pokemon) => (
                <li key={pokemon.name}>
                    <a href={`/#/pokemon/${pokemon.url.split('/')[6]}`}>
                        <li key={pokemon.name}>{pokemon.name.toUpperCase()}</li>
                    </a>
                </li>
            ))}
        </ul>
        <button onClick={gotoPrevPage} disabled={!prevPage}>Prev</button>
        <button onClick={gotoNextPage}>Next</button>
    </div>
    )
}

export default Pokedex;