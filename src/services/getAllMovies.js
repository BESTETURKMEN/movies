/* eslint-disable max-len */
import axios from "axios";

export const getAllMovies = async () => {
  try {
    const response = await axios.request({
      method: "get",
      url: "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
      headers: {
        Accept: "application/json",
        // eslint-disable-next-line prettier/prettier
                Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NmNkYWExMWQ5ZjQ2MDI0ZDFmYmQ5YzEwZGVhOWRhZCIsInN1YiI6IjY2MmEwZDM4OGE4OGIyMDExY2UzZmE4MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.j7FQFaRPn8GhYrMTmElV4dDQVxUY21AXY7oS-uhD42I",
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching popular categories");
  }
};
