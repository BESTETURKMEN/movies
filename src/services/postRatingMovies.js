import axios from "axios";

export const postRatingMovies = async () => {
  try {
    const response = await axios.post(
      "https://api.themoviedb.org/3/movie/823464/rating",
      { value: 2.5 },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=utf-8",
          Authorization:
            // eslint-disable-next-line max-len
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NTgzYWVlNjFlMWZjNTdhZDUzMTIxYzdhNTIyNjAxYSIsInN1YiI6IjY2MmEwZDM4OGE4OGIyMDExY2UzZmE4MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2CUTn2iD0PWDdGqMz7eazEiharn5NQZnYR8EXA6Ibgo",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Error posting movie rating");
  }
};
