import { useParams } from "react-router-dom";
import getMovieDetails from "../../api/getMovieDetails";
import { CartContext } from "../../CartContext";
import { useContext } from "react";

export default function MoviePage() {
    const { addToCart } = useContext(CartContext);
    const { movieId } = useParams();

    const movieDetails = getMovieDetails(movieId, 0);

    return (
        <div key={movieDetails.id}>
            <img src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster}`} />
            <h1>{movieDetails.title}</h1>
            <h3>{movieDetails.tagline}</h3>
            <p>{movieDetails.overview}</p>
            <p>{movieDetails.price}</p>
            <button onClick={() => addToCart(movieDetails)}>Add to cart</button>
            <p>Release Date: {movieDetails.releaseDate}</p>
            <p>Runtime: {movieDetails.runtime} mins</p>
            <div>Genres: {movieDetails.genres.map((genre, index) => (
                <div key={index}>{genre}</div>
            ))}</div>
            <p>Director: {movieDetails.director}</p>
            <div>Cast: {movieDetails.cast.map((member) => (
                <div key={member.id}>
                    <img src={`https://image.tmdb.org/t/p/w500/${member.image}`} />
                    <p>{member.name}</p>
                    <p>{member.character}</p>
                </div>
            ))}</div>
        </div>
    )
}