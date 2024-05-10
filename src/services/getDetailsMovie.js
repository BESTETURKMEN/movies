import axios from "axios";

export const getDetailsMovie = async (movie_id) => {
  try {
    const response = await axios.request({
      method: "get",
      url: `https://api.themoviedb.org/3/movie/${movie_id}`,
      headers: {
        Accept: "application/json",
        Authorization:
          // eslint-disable-next-line max-len, max-len
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NTgzYWVlNjFlMWZjNTdhZDUzMTIxYzdhNTIyNjAxYSIsInN1YiI6IjY2MmEwZDM4OGE4OGIyMDExY2UzZmE4MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2CUTn2iD0PWDdGqMz7eazEiharn5NQZnYR8EXA6Ibgo",
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching movie details");
  }
};
