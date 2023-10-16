import { useParams } from "react-router-dom";
import { add, remove } from '../reducers/favorites';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';


const Details = () => {
    //name as identifier
    const { name } = useParams();

    const [details, setDetails] = useState({})
    const [isFav, setIsFav] = useState(false)

    const dispatch = useDispatch()
    const favorites = useSelector((state) => state.favorites.value)

    //dispach the reducer to add pokemons as favorite
    const addToFav = () => {
        dispatch(add(name))
    }
    //dispach the reducer to remove pokemons as favorite
    const rmFromFav = () => {
        dispatch(remove(name))
    }


    /**
     * fetch the info for a specific pokemon
     * @param {*} pName 
     */
    const getDetails = async (pName) => {
        const res = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${pName}`
        );
        const data = await res.json();
        const obj = {
            name: data.name,
            experience: data.base_experience,
            height: data.height,
            weight: data.weight,
            img: data.sprites.other.dream_world.front_default,
            abilities: data.abilities,
            items: data.held_items
        }
        setDetails(obj);
    }

    useEffect(() => {
        getDetails(name)

        //set the isFav to true or false depending is its in favorites
        //depending will show Add or Remove buttons
        setIsFav(favorites.indexOf(name) !== -1)

    }, [favorites, name]);

    return <div className="m-4">

        <h1 className="m-2">{name}</h1>



        <div className="card" style={{ width: '300px' }}>

            <div className="card-body">
                <img src={details.img} className="card-img-top" alt='pokemon thumbnail' />
            </div>


            <ul className="list-group list-group-flush">
                <li className="list-group-item">Name: {details.name}</li>
                <li className="list-group-item">Experience: {details.experience}</li>
                <li className="list-group-item">Height: {details.height}</li>
                <li className="list-group-item">Weight: {details.weight}</li>
            </ul>

            <div className="card-body">
                <h6>Abilities:</h6>
                <div className="list-group">
                    {details.abilities && details.abilities.map((item, i) => (
                        <span key={i} className="list-group-item">{item.ability.name}</span>
                    ))}

                </div>
            </div>

            <div className="card-body">
                <h6>Items:</h6>
                <div className="list-group">
                    {details.items && details.items.map((item, i) => (
                        <span key={i} className="list-group-item">{item.item.name}</span>
                    ))}

                </div>
            </div>

            <div className="card-body">
                {isFav ?
                    <button onClick={rmFromFav} className="btn btn-danger">Remove from favorites</button>
                    :
                    <button onClick={addToFav} className="btn btn-primary">Add to favorites</button>
                }
            </div>
        </div>
    </div>
};

export default Details;