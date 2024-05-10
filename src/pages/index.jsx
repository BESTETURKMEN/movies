import React, { useState, useEffect, useRef } from "react";
import { Card } from "antd";
import { Button, Progress } from "antd";
import { useNavigate } from "react-router-dom";
import { Col, Row } from "antd";

import { getPopularCategories } from "../services/getPopularCategories";

import Search from "../components/search";
import Filter from "../components/filter";

import "./style.scss";

export default function Index() {
  const [library, setLibrary] = useState([]);
  const [libraryAllData, setLibraryAllData] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const navigate = useNavigate();

  const { Meta } = Card;

  /**popular */
  useEffect(() => {
    const fetchPopularCategories = async () => {
      try {
        const popularCategories = await getPopularCategories();
        setLibrary(
          popularCategories.results.slice(0, 10)
        ); /**ilk 10 gösterilsin */
      } catch (error) {
        console.error(error);
      }
    };
    fetchPopularCategories();
  }, []);

  /**All Movies */
  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        const allCategories = await getPopularCategories();
        console.log("all categories", allCategories);
        const allCategoriesMovies = allCategories.results;
        setLibraryAllData(allCategoriesMovies);
        setLibrary(allCategoriesMovies);
      } catch (error) {
        console.error(error);
      }
    };
    if (showAll) {
      fetchAllCategories();
    }
  }, [showAll]);

  /**filter */
  const handleGenreChange = (selectedGenres) => {
    setSelectedGenres(selectedGenres);
  };

  /**filter  */
  const filterLibraryByGenres = () => {
    if (selectedGenres.length === 0) return library;
    const moviesWithCategories = library.map((movie) => {
      const movieCategories = movie.genre_ids.filter((genreId) =>
        selectedGenres.includes(genreId)
      );
      return { ...movie, categories: movieCategories };
    });
    const filteredMovies = moviesWithCategories.filter((movie) => {
      if (selectedGenres.length === 0) return true;
      return movie.categories.length > 0;
    });

    return filteredMovies;
  };

  const displayAll = () => {
    setShowAll(true);
  };

  const handleCardClick = (movie) => {
    setSelectedMovie(movie);
    navigate(`/detail/${movie.id}`);
  };

  return (
    <Row className="content">
      {selectedMovie ? <DetailPage movie={selectedMovie} /> : null}
      <Col span={4}>
        <div className="main-title">Popüler Filmler </div>
        <Search />
        <Filter onGenreChange={handleGenreChange} />
      </Col>
      <Col span={20}>
        <Row>
          {filterLibraryByGenres().map((movie) => {
            return (
              <Col span={4} className="cards">
                <Card
                  hoverable
                  key={movie.id}
                  onClick={() => handleCardClick(movie)}
                  cover={
                    <div>
                      <img
                        className="card-img"
                        alt=""
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      />
                      <div className="card-progress">
                        <Progress
                          type="circle"
                          percent={Math.floor(movie.vote_average * 10)}
                          size={40}
                          strokeColor={"yellow"}
                          strokeWidth={"8"}
                          fontSize={"1.2em"}
                        />
                      </div>
                    </div>
                  }
                >
                  <Meta
                    title={<p>{movie.title}</p>}
                    description={<p>{movie.release_date}</p>}
                  />
                </Card>
              </Col>
            );
          })}
        </Row>
        <div className="button">
          <Button type="default" onClick={displayAll}>
            Daha Fazla Yükle
          </Button>
        </div>
      </Col>
    </Row>
  );
}
