import axios from "axios";

export const getSearchMovies = async () => {
  try {
    const response = await axios.request({
      method: "get",
      url: "https://api.themoviedb.org/3/search/movie?query=movie&include_adult=false&language=en-US&page=1",
      headers: {
        Accept: "application/json",
        // eslint-disable-next-line prettier/prettier, max-len
                Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NTgzYWVlNjFlMWZjNTdhZDUzMTIxYzdhNTIyNjAxYSIsInN1YiI6IjY2MmEwZDM4OGE4OGIyMDExY2UzZmE4MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2CUTn2iD0PWDdGqMz7eazEiharn5NQZnYR8EXA6Ibgo",
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching popular categories");
  }
};
