import React, { useState, useEffect } from "react";
import { Card } from "antd";
import { Button, Progress } from "antd";

import Header from "../../layout/header";
import { getPopularCategories } from "../../services/getPopularCategories";
import { getDetailsMovie } from "../../services/getDetailsMovie";
import { getAllMovies } from "../../services/getAllMovies";

import "../main/style.scss";
import DetailPage from "./detailPage";

export default function Index() {
  const [library, setLibrary] = useState([]);
  const [libraryAllData, setLibraryAllData] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const { Meta } = Card;

  useEffect(() => {
    const fetchPopularCategories = async () => {
      try {
        const popularCategories = await getPopularCategories();
        setLibrary(popularCategories.results.slice(0, 10)); // İlk olarak sadece ilk 10 kartı göster
      } catch (error) {
        console.error(error);
      }
    };
    fetchPopularCategories();
  }, []);

  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        const allCategories = await getAllMovies();
        setLibraryAllData(allCategories.results);
        setLibrary(allCategories.results);
      } catch (error) {
        console.error(error);
      }
    };
    if (showAll) {
      fetchAllCategories();
    }
  }, [showAll]);

  const displayAll = () => {
    setShowAll(true);
  };

  const redirectToDetailPage = async (movieId) => {
    try {
      const detailPageMovies = await getDetailsMovie(movieId);
      setSelectedMovie(detailPageMovies);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Header />
      {selectedMovie && <DetailPage movie={selectedMovie} />}
      <div className="content">
        <div className="cards">
          {library.map((movie) => {
            return (
              <Card
                style={{ width: "180px", height: "373px" }}
                hoverable
                key={movie.id}
                actions={[
                  <h3>Puan </h3>,
                  <Progress
                    className="progress"
                    type="circle"
                    percent={movie.vote_average * 10}
                    size={30}
                  />,
                ]}
                cover={
                  <img
                    className="card-img"
                    alt=""
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  />
                }
                onClick={() => redirectToDetailPage(movie.id)}
              >
                <Meta
                  title={<p>{movie.title}</p>}
                  description={<p>{movie.release_date}</p>}
                />
              </Card>
            );
          })}
        </div>

        <div className="button">
          <Button type="default" onClick={displayAll}>
            Daha Fazla Yükle
          </Button>
        </div>
      </div>
    </div>
  );
}
