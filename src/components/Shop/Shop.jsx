import { Link } from "react-router-dom";
import getMoviesList from "../../api/getMoviesList"

export default function Shop() {

    const moviesList = getMoviesList();

    return (
        <div>
            {moviesList.map((movie) => {
                return (
                    <div key={movie.id}>
                        <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
                    </div>
                )
            })}
        </div>
    )
}