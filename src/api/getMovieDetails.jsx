import { useEffect, useState } from "react";
import { format } from "date-fns";

const getMovieDetails = (id) => {
  const detailsUrl = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
  const creditsUrl = `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`;
  const logoUrl = `https://api.themoviedb.org/3/movie/${id}/images?include_image_language=en`;
  const trailerUrl = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiODE5MzU2MGE5YWViNTZhYWFlMjkzY2FlMWUyMmIzNCIsIm5iZiI6MTc1MTUwMjkxMi42NDk5OTk5LCJzdWIiOiI2ODY1ZDA0MDUzNWM2MzMxNjkzMWY4NWQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.PX1Fc2rnRhuNv3v1_4dgUVZqgqdIoN6NVDwtGyhQfkQ",
    },
  };

  const [movieDetails, setMovieDetails] = useState({});
  const [movieCredits, setMovieCredits] = useState({});
  const [movieLogo, setMovieLogo] = useState({});
  const [movieTrailer, setMovieTrailer] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllDetails = async () => {
      try {
        setLoading(true);

        const [
          detailsResponse,
          creditsResponse,
          logoResponse,
          trailerResponse,
        ] = await Promise.all([
          fetch(detailsUrl, options),
          fetch(creditsUrl, options),
          fetch(logoUrl, options),
          fetch(trailerUrl, options),
        ]);

        const [details, credits, logo, trailer] = await Promise.all([
          detailsResponse.json(),
          creditsResponse.json(),
          logoResponse.json(),
          trailerResponse.json(),
        ]);

        setMovieDetails(details);
        setMovieCredits(credits);
        setMovieLogo(logo);
        setMovieTrailer(trailer);
      } catch {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllDetails();
  }, []);

  const getCast = (cast) => {
    if (!cast || !Array.isArray(cast)) {
      return [];
    }

    return cast.slice(0, 5).map((member) => ({
      id: member.id || crypto.randomUUID(),
      name: member.name || "Unknown",
      character: member.character || "Unknown",
      image: member.profile_path || "Unknown",
    }));
  };

  if (loading) {
    return {
      loading: true,
    };
  }

  return {
    loading: false,
    id: movieDetails.id,
    title: movieDetails.title,
    tagline: movieDetails.tagline,
    overview: movieDetails.overview,
    releaseDate: format(new Date(movieDetails.release_date), "MMMM dd, yyyy"),
    runtime: movieDetails.runtime,
    genres: movieDetails.genres?.map((genre) => genre.name) || [],
    price: 4.99,
    poster: movieDetails.poster_path,
    backdrop: movieDetails.backdrop_path,
    director:
      movieCredits.crew
        ?.filter((member) => member.job == "Director")
        .map((director) => director.name) || "Director Unknown",
    writers:
      movieCredits.crew
        ?.filter(
          (member) => member.job == "Writer" || member.job == "Screenplay",
        )
        .map((writer) => writer.name) || "Writers Unknown",
    cast: getCast(movieCredits.cast) || [],
    logo:
      movieLogo.logos?.find((logo) => logo.file_path.length > 0)?.file_path ||
      "",
    trailer:
      movieTrailer.results?.find((video) => video.type == "Trailer")?.key || "",
  };
};

export default getMovieDetails;
