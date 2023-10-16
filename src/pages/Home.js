
import React, { useState, useEffect } from 'react';
import List from '../components/List';

function Home() {

    const [loading, setLoading] = useState(false)
    const [list, setList] = useState([]);
    const [listURL, setListURL] = useState("https://pokeapi.co/api/v2/pokemon?limit=5");
    const [page, setPage] = useState(0)

    useEffect(() => {
        getPokeList();
    });

    /**
     * Iterate in a array of pokemons to fetch its details
     * and concat it to the already existing list of pokemons
     * @param {*} result list of all pokemons 
     */
    function getPokeDetails(result) {
        result.forEach(async (pokemon) => {
            const res = await fetch(
                `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
            );
            const data = await res.json();
            setList((currentList) => [...currentList, data]);
        });
    }

    /**
     * fetch a new subset of 5 pokemons 
     * then call the getPokeDetails do get more details
     */
    const getPokeList = async () => {
        if (!loading) {
            setLoading(true)
            const res = await fetch(listURL);
            const data = await res.json();

            setListURL(data.next);
            getPokeDetails(data.results);
            setLoading(false)
        }
    };

    /**
     * Receives the new page user is going to change
     * check if data already exists, if yes then wont fetch
     * if not then fetch new data.
     * @param {*} newPage number
     */
    function changePage(newPage) {
        if (newPage < 0) newPage = 0
        setPage(newPage)
        //check if data already existes
        if (!getPageItems(list, newPage).length) {
            getPokeList()
        }
    }


    /**
     * fetch only the 5 pokemons from index to index+5
     * @param {*} items array of pokemons
     * @param {*} index new index to get sub set of data
     * @returns 5 pokemons from index to index+5
     */
    function getPageItems(items, index) {
        return items.slice(index * 5, (index * 5) + 5)
    }

    return (
        <div className="app-container">
            <h1>Pokemon List</h1>
            <div className="pokemon-container">
                <div className="all-container">
                    <List list={getPageItems(list, page)}></List>
                </div>
                <div className="m-3">
                    <button type="button" className="btn btn-outline-primary btn-sm" onClick={() => { changePage(page - 1) }}>-</button>
                    <span className="h6 p-3">{page}</span>
                    <button type="button" className="btn btn-outline-primary btn-sm" onClick={() => { changePage(page + 1) }}>+</button>
                </div>
            </div>
        </div>
    );
}

export default Home;
