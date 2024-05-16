import axios from "axios";

export const postFavorite = async () => {
  try {
    const response = await axios.post(
      "https://api.themoviedb.org/3/account/21234940/favorite?",
      { media_type: "movie", media_id: 550, favorite: true },
      {
        headers: {
          Accept: "application/json",
          Authorization:
            // eslint-disable-next-line max-len
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNDBhYzdlM2ZlNGIxYzExOTg1MjQ2ZDMzZTM5YjVjZCIsInN1YiI6IjY2MmEwZDM4OGE4OGIyMDExY2UzZmE4MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.k5Ys8_63Kn49H_OL2qVuUpz4PPqr-fzCi3z-bm2jvX4",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Error posting favorite movies");
  }
};
