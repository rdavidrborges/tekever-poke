
import { Link } from "react-router-dom";

/**
 * component to show a list of pokemons on main menu and favourites
 * @param {*} list Array
 */
const List = ({ list }) => {

    return <>
        {list && list.map((pokemon, index) => (
            <div key={index} className="card m-3" style={{ width: '300px' }} >
                <div className="card-body">
                    <img src={pokemon.sprites.other.dream_world.front_default} className="card-img-top " width={50} height={50} />
                </div>
                <div className="card-footer d-flex justify-content-between">
                    <h5 >{pokemon.name}</h5>
                    <Link className="btn btn-primary btn-sm" to={`/details/${pokemon.name}`}>Details</Link>
                </div>
            </div>

        ))}
    </>

};

export default List;