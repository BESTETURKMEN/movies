import React, { useEffect, useState } from "react";
import { Card, Button, Modal, Progress } from "antd";
import { Rate } from "antd";
import { useParams } from "react-router";
import "./style.scss";

import { getDetailsMovie } from "../services/getDetailsMovie";
import { postRatingMovies } from "../services/postRatingMovies";

export default function DetailMovie() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [detailMovie, setDetailMovie] = useState(null);
  let { movieId } = useParams();

  useEffect(() => {
    getDetailsMovie(movieId).then((res) => {
      setDetailMovie(res);
    });
  }, [movieId]);

  const handleOk = () => {
    setIsModalOpen(false);
    postRatingMovies(userRating);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const rateMovies = () => {
    setIsModalOpen(true);
  };

  const postUserRating = (value) => {
    setUserRating(value);
  };

  return (
    <div>
      {detailMovie && (
        <div className="detail-page-all">
          <div
            className="detail-Page"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${detailMovie.backdrop_path})`,
            }}
          />
          <div className="detail-poster" />
          <div className="slider_content">
            <div className="detail-card">
              <Card
                hoverable
                cover={
                  <img
                    className="card-img"
                    alt=""
                    src={`https://image.tmdb.org/t/p/w500${detailMovie.poster_path}`}
                  />
                }
              ></Card>
            </div>
            <div className="detail_text">
              <h3 className="detail-title">
                {detailMovie.title} (
                {detailMovie.release_date &&
                  detailMovie.release_date.slice(0, 4)}
                )
              </h3>
              <div className="detail-rate-area">
                <div className="detail-progress">
                  <Progress
                    className="progress"
                    type="circle"
                    percent={detailMovie.vote_average * 10}
                    size={70}
                  />
                </div>
                <p className="title">Üye Puanları</p>
                <Button onClick={rateMovies}>Senin Hissiyat'ın nasıl?</Button>
                <div className="detail-modal">
                  <Modal
                    title="Puanlama"
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                  >
                    <Rate value={userRating} onChange={postUserRating} />
                  </Modal>
                </div>
              </div>
              <p className="detail-tagline">{detailMovie.tagline}</p>
              <h2 style={{ color: "white", marginTop: "15px" }}>Özet</h2>
              <p className="detail-overview">{detailMovie.overview}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
