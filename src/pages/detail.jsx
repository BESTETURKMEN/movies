import React, { useEffect, useState } from "react";
import {
  Card,
  Button,
  Modal,
  Progress,
  List,
  Rate,
  Image,
  Row,
  Col,
} from "antd";
import { Divider } from "antd";
import { Avatar } from "antd";
import { useParams } from "react-router";
import "./style.scss";
import { Segmented, Space } from "antd";
import {
  TwitterOutlined,
  InstagramOutlined,
  FacebookOutlined,
  HeartOutlined,
} from "@ant-design/icons";

import { getDetailsMovie } from "../services/getDetailsMovie";
import { postRatingMovies } from "../services/postRatingMovies";
import { getTrendingPeopleList } from "../services/getTrendingPeopleList";
import { getReviews } from "../services/getReviews";
import { postFavorite } from "../services/postFavorite";
import Heart from "../components/heart";

const { Meta } = Card;

export default function DetailMovie() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [detailMovie, setDetailMovie] = useState(null);
  const [reviewsMovie, setReviewsMovie] = useState([]);
  const [trendingPeople, setTrendingPeople] = useState([]);
  const [video, setVideo] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  let { movieId } = useParams();

  /**details */
  useEffect(() => {
    getDetailsMovie(movieId).then((res) => {
      setDetailMovie(res);
    });
  }, [movieId]);

  /**reviews  */
  useEffect(() => {
    getReviews(movieId).then((res) => {
      const reviewsMoviesData = res.results;
      reviewsMoviesData.map((item) => {
        item.author_details;
        setReviewsMovie(reviewsMoviesData.slice(0, 4));
      });
    });
  }, [movieId]);

  /**trending people */
  useEffect(() => {
    const fetchTrendingPeople = async () => {
      try {
        const trendingPeopleList = await getTrendingPeopleList();
        const trendList = trendingPeopleList.results.slice(0, 6);
        trendList.map((item) => {
          const known_for = item.known_for;
          setVideo(known_for);
          setTrendingPeople(trendList);
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchTrendingPeople();
  }, []);

  /**Postin Favorite Movies */
  const handleFav = () => {
    postFavorite().then((res) => {
      console.log("res", res);
      setFavoriteMovies(res);
    });
  };

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
        <Row className="detail-page-all">
          <Col
            className="detail-Page"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${detailMovie.backdrop_path})`,
            }}
          />
          <Col className="detail-poster" />
          <Col className="slider_content">
            <Col className="detail-card">
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
            </Col>
            <Col className="detail_text">
              <h3 className="detail-title">
                {detailMovie.title} (
                {detailMovie.release_date &&
                  detailMovie.release_date.slice(0, 4)}
                )
              </h3>
              <Col className="detail-rate-area">
                <Col className="detail-progress">
                  <Progress
                    className="progress"
                    type="circle"
                    percent={detailMovie.vote_average.toFixed(
                      1
                    )} /**virgül sonrası tek basamak için toFixed*/
                    size={70}
                  />
                </Col>
                <p className="title">Üye Puanları</p>
                <Button onClick={rateMovies}>Senin Hissiyat'ın nasıl?</Button>
                <Col className="detail-modal">
                  <Modal
                    title="Puanlama"
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                  >
                    <Rate value={userRating} onChange={postUserRating} />
                  </Modal>
                  <Col onClick={handleFav}>
                    <Heart />
                  </Col>
                </Col>
              </Col>
              <p className="detail-tagline">{detailMovie.tagline}</p>
              <h2 style={{ color: "white", marginTop: "15px" }}>Özet</h2>
              <p className="detail-overview">{detailMovie.overview}</p>
            </Col>
          </Col>
          <Col span={18} className="content">
            <Row className="content-segmented">
              <Col span={24} className="content-title">
                Öne Çıkan Oyuncular
              </Col>
              <Col className="content-cards">
                {trendingPeople.map((person) => {
                  return (
                    <Card
                      key={person.id}
                      hoverable
                      style={{
                        width: "130px",
                        height: "160px",
                      }}
                      cover={
                        <img
                          className="detail-img"
                          src={`https://image.tmdb.org/t/p/w500/${person.profile_path}`}
                          alt={person.name}
                        />
                      }
                    >
                      <Meta title={person.name} />
                    </Card>
                  );
                })}
              </Col>
            </Row>
            <Col className="divider">
              <Divider />
            </Col>
            <Row className="content-segmented-1">
              <Col>
                <Segmented
                  options={[
                    "Yorumlar",
                    {
                      label: "Topluluk",
                      value: "Topluluk",
                      disabled: true,
                    },
                    ,
                    {
                      label: "Tartışmalar",
                      value: "Tartışmalar",
                      disabled: true,
                    },
                    ,
                  ]}
                  block
                />
                <List
                  grid={{
                    gutter: 16,
                    column: 1,
                  }}
                  dataSource={reviewsMovie}
                  renderItem={(item) => (
                    <Space>
                      <List.Item>
                        <Card>
                          <Avatar
                            src={`https://image.tmdb.org/t/p/w500${item.author_details.avatar_path}`}
                          />

                          {item.content.slice(0, 150)}
                        </Card>
                      </List.Item>
                    </Space>
                  )}
                />
              </Col>
            </Row>
            <Col className="divider">
              <Divider />
            </Col>
            <Row className="content-segmented-2">
              <Col span={24}>
                <Segmented
                  options={[
                    {
                      label: "Medya",
                      value: "Medya",
                      disabled: true,
                    },
                    {
                      label: "En Popüler",
                      value: "En Popüler",
                      disabled: true,
                    },
                    ,
                    {
                      label: "Videolar",
                      value: "Videolar",
                      disabled: true,
                    },
                    ,
                    {
                      label: "Arka Planlar",
                      value: "Arka Planlar",
                      disabled: true,
                    },
                    ,
                    {
                      label: "Afişler",
                      value: "Afişler",
                      disabled: true,
                    },
                    ,
                  ]}
                  block
                />
              </Col>
              {detailMovie && (
                <Row className="content-segmented-2-img">
                  <Col>
                    <Image
                      width={350}
                      height={220}
                      src={`https://image.tmdb.org/t/p/w500${detailMovie.backdrop_path}`}
                    />
                  </Col>
                  <Col style={{ marginLeft: "50px" }}>
                    <Image
                      width={180}
                      height={220}
                      src={`https://image.tmdb.org/t/p/w500${detailMovie.poster_path}`}
                    />
                  </Col>
                </Row>
              )}
            </Row>
            <Col className="divider">
              <Divider />
            </Col>
            <Row className="content-segmented-3">
              <Col>
                <Col span={24} className="content-segmented-title-3">
                  Tavsiyeler
                </Col>
                <Col span={24} className="content-segmented-3-cards">
                  {video.map((video) => {
                    return (
                      <Card
                        key={video.id}
                        hoverable
                        style={{
                          width: "120px",
                          height: "150px",
                        }}
                        cover={
                          <img
                            className="detail-segmented-3-img"
                            src={`https://image.tmdb.org/t/p/w500/${video.poster_path}`}
                            alt={video.name}
                          />
                        }
                      >
                        <Meta />
                      </Card>
                    );
                  })}
                </Col>
              </Col>
            </Row>
          </Col>
          <Col className="slider">
            <Col className="slider-icon">
              <Col span={8}>
                <TwitterOutlined style={{ fontSize: "28px" }} />
              </Col>
              <Col span={8}>
                <InstagramOutlined style={{ fontSize: "28px" }} />
              </Col>
              <Col span={8}>
                <FacebookOutlined style={{ fontSize: "28px" }} />
              </Col>
            </Col>
            <Col className="slider-title">
              <Col className="slider-1">
                <div className="slider-1-1">Orjinal Başlık</div>
                <div className="slider-1-2">{detailMovie.original_title}</div>
              </Col>
              <Col className="slider-2">
                <div className="slider-2-1">Durum</div>
                <div className="slider-2-2">
                  {detailMovie.status === "Released"
                    ? "Yayınlandı"
                    : detailMovie.status}
                </div>
              </Col>
              <Col className="slider-3">
                <div className="slider-3-1">Bütçe</div>
                <div className="slider-3-2">
                  {detailMovie.budget.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                  })}
                </div>
              </Col>
              <Col className="slider-4">
                <div className="slider-4-1">Kazanç</div>
                <div className="slider-4-2">
                  {detailMovie.revenue.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                  })}
                </div>
              </Col>
            </Col>
          </Col>
        </Row>
      )}
    </div>
  );
}
