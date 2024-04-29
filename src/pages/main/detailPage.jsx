import React, { useState } from "react";
import { Card, Button, Modal, Progress } from "antd";
import "../main/style.scss";
import { Rate } from "antd";

function DetailPage({ movie }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const rateMovies = () => {
    console.log("rate");
    setIsModalOpen(true);
  };

  return (
    <div className="detailsPage">
      <h3 className="detailbaslik">{movie.original_title}</h3>
      <Card
        style={{ width: "300px", height: "373px", margin: "auto" }}
        hoverable
        cover={
          <img
            className="card-img"
            alt=""
            src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
          />
        }
        actions={[
          <h3>Puan </h3>,
          <Progress
            className="progress"
            type="circle"
            percent={movie.vote_average * 10}
            size={30}
          />,
          <Button className="detailsButton" onClick={rateMovies}>
            Puanlamak için!
          </Button>,
        ]}
      >
        <Card.Meta
          title={<p>{movie.original_title}</p>}
          description={<p>{movie.overview}</p>}
        />
      </Card>

      <div className="rate">
        <Modal
          title="Puanlama"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Rate allowHalf defaultValue={2.5} />
        </Modal>
      </div>
    </div>
  );
}

export default DetailPage;
