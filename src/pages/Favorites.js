import { connect, useSelector } from 'react-redux';
import List from '../components/List';
import { useState, useEffect } from 'react';

const Favorites = () => {

    //fetch the favorites from the store
    const favorites = useSelector((state) => state.favorites.value)

    const [list, setList] = useState([])

    useEffect(() => {
        //fetch all data related to the pokemons
        favorites.forEach(async (pokemon) => {
            const res = await fetch(
                `https://pokeapi.co/api/v2/pokemon/${pokemon}`
            );
            const data = await res.json();
            setList((currentList) => [...currentList, data]);
        });
    }, [favorites]);


    return <div>
        <h1>Favorites</h1>
        {list.length ?
            <List list={list}></List>
            :
            <span>No favorites...</span>
        }
    </div>

};

export default connect()(Favorites);