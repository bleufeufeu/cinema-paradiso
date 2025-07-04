import { useEffect, useState } from "react";

const getMoviesList = () => {
    const url = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&region=CA';
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiODE5MzU2MGE5YWViNTZhYWFlMjkzY2FlMWUyMmIzNCIsIm5iZiI6MTc1MTUwMjkxMi42NDk5OTk5LCJzdWIiOiI2ODY1ZDA0MDUzNWM2MzMxNjkzMWY4NWQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.PX1Fc2rnRhuNv3v1_4dgUVZqgqdIoN6NVDwtGyhQfkQ'
        }
    };


    const [nowPlaying, setNowPlaying] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(url, options)
        .then(response => response.json())
        .then(data => setNowPlaying(data.results))
        .catch(error => setError(error))
        .finally(() => setLoading(false));
    }, []);

    return nowPlaying;
}

export default getMoviesList;