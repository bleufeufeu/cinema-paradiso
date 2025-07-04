import { useEffect, useState } from "react";

const getMovieDetails = (id, delay) => {
    const detailsUrl = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
    const creditsUrl = `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiODE5MzU2MGE5YWViNTZhYWFlMjkzY2FlMWUyMmIzNCIsIm5iZiI6MTc1MTUwMjkxMi42NDk5OTk5LCJzdWIiOiI2ODY1ZDA0MDUzNWM2MzMxNjkzMWY4NWQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.PX1Fc2rnRhuNv3v1_4dgUVZqgqdIoN6NVDwtGyhQfkQ'
        }
    };


    const [movieDetails, setMovieDetails] = useState({});
    const [movieCredits, setMovieCredits] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            fetch(detailsUrl, options)
            .then(response => response.json())
            .then(data => setMovieDetails(data))
            .catch(error => setError(error))
            .finally(() => setLoading(false))
        }, delay);

        setTimeout(() => {
            fetch(creditsUrl, options)
            .then(response => response.json())
            .then(data => setMovieCredits(data))
            .catch(error => setError(error))
            .finally(() => setLoading(false))
        }, delay + 500)
    }, []);

    const getCast = (cast) => {
        if (!cast || !Array.isArray(cast)) {
            return [];
        }

        return cast.slice(0, 5).map((member) => ({ 
            id: member.id || crypto.randomUUID(),
            name: member.name || "Unknown",
            character: member.character || "Unknown",
            image: member.profile_path || "Unknown"
        }));

    }

    return {
        id: movieDetails.id,
        title: movieDetails.title,
        tagline: movieDetails.tagline,
        overview: movieDetails.overview,
        releaseDate: movieDetails.release_date,
        runtime: movieDetails.runtime,
        genres: movieDetails.genres?.map((genre) => genre.name) || [],
        price: 4.99,
        poster: movieDetails.poster_path,
        backdrop: movieDetails.backdrop_path,
        director: movieCredits.crew?.find((member) => member.job == "Director").name || "Director Unknown",
        cast: getCast(movieCredits.cast) || []
    };
}

export default getMovieDetails;