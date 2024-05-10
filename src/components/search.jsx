import React, { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, List, Typography, Input } from "antd";

import { getSearchMovies } from "../services/getSearchMovies";

import "../pages/style.scss";

export default function Search() {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showList, setShowList] = useState(false);

  const handleInputChange = async (event) => {
    const inputSearch = event.target.value;
    if (inputSearch === "") {
      setSearchResults([]);
      setSearchInput("");
      setShowList(true);
    } else {
      const searchMovies = await getSearchMovies();
      setSearchResults(searchMovies.results);
      setSearchInput(inputSearch);
      setShowList(true);
    }
  };

  const searchHandler = async () => {
    if (!showList) {
      setShowList(true);
    } else {
      setShowList(false);
    }
  };

  return (
    <div className="search-button">
      <div className="search-button-area">
        <Button
          onClick={searchHandler}
          shape="circle"
          icon={<SearchOutlined />}
        />
      </div>
      {showList && (
        <div className="search">
          <Input
            style={{
              backgroundColor: "white",
              zIndex: "1",
              width: "250px",
              marginLeft: "30px",
              marginTop: "10px",
            }}
            value={searchInput}
            onChange={handleInputChange}
            onPressEnter={searchHandler}
            placeholder="Film, dizi veya kişi arayın..."
          />
          <List
            style={{
              backgroundColor: "white",
              zIndex: "1",
              width: "250px",
              marginLeft: "30px",
              marginTop: "10px",
            }}
            bordered
            dataSource={searchResults}
            renderItem={(item) => {
              if (
                item.title.toLowerCase().includes(searchInput.toLowerCase())
              ) {
                return (
                  <List.Item>
                    <Typography.Text>{item.title}</Typography.Text>
                  </List.Item>
                );
              } else {
                return null;
              }
            }}
          />
        </div>
      )}
    </div>
  );
}
