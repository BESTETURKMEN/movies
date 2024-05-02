import React, { useState, useEffect } from "react";
import { Card, Button, Modal, Progress } from "antd";
import { Rate } from "antd";

import { getDetailsMovie } from "../../services/getDetailsMovie";

function DetailPage() {
  const [detailMovie, setDetailMovie] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const detailPageMovies = await getDetailsMovie();
        setDetailMovie(detailPageMovies);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovieDetails();
  }, []);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const rateMovies = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="detailsPage">
      <Card
        style={{ width: "300px", height: "373px", margin: "auto" }}
        hoverable
        cover={
          <img
            className="card-img"
            alt=""
            src={`https://image.tmdb.org/t/p/w500${detailMovie.poster_path}`}
          />
        }
        actions={[
          <h3>Puan </h3>,
          <Progress
            className="progress"
            type="circle"
            percent={detailMovie.vote_average * 10}
            size={30}
          />,
          <Button className="detailsButton" onClick={rateMovies}>
            Puanlamak için!
          </Button>,
        ]}
      >
        <Card.Meta
          title={<p>{detailMovie.original_title}</p>}
          description={<p>{detailMovie.overview}</p>}
        />
      </Card>

      <div className="rate">
        <Modal
          title="Puanlama"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Rate defaultValue={2.5} />
        </Modal>
      </div>
    </div>
  );
}

export default DetailPage;
