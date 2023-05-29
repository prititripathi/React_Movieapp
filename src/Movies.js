import React from 'react'
import { useGlobalContext } from './context'
import { NavLink } from 'react-router-dom';

const Movies = () => {
    const { movie } = useGlobalContext();

    return (
 
        <section className='movie-page'>
            <div className='container grid grid-4-col'>

                { movie
                ? movie.map((curMovie) => {
                    const { imdbID, Title, Poster, Year, Type } = curMovie;
                    const movieName = Title.substring(0, 15);
                    return <NavLink to={`movie/${imdbID}`} key={imdbID}>
                        <div className='card '>
                            <div className='card-info'>
                                {/* <h2>{Title}</h2> */}
                                <h2>{movieName.length >= 15 ? `${movieName}...` : movieName}</h2>
                                <img src={(Poster !== "N/A") ? Poster : "https://via.placeholder.com/200/200"} alt={imdbID} />
                                <p>{Year}</p>
                                <p>{Type}</p>
                            </div>
                        </div>
                    </NavLink>;
                })
                : "Enter Movie name to show the Result"}
            </div>
        </section>

    )
}

export default Movies