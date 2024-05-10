import React, { useState, useEffect } from "react";
import { Collapse, Checkbox } from "antd";

import "../pages/style.scss";
import { getAllCategories } from "../services/getAllCategories";

export default function Filter({ onGenreChange }) {
  const [filteredData, setFilteredData] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  /**categori api fetch */
  useEffect(() => {
    const fetchAllFilterCategories = async () => {
      try {
        const filterCategories = await getAllCategories();

        const filteredInfo = filterCategories.genres;

        setFilteredData(filteredInfo);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAllFilterCategories();
  }, []);

  /**checkbox  */
  const handleCheckboxChange = (isChecked, categoryId) => {
    if (isChecked) {
      setSelectedGenres((prevGenres) => [...prevGenres, categoryId]);
    } else {
      setSelectedGenres((prevGenres) =>
        prevGenres.filter((genreId) => genreId !== categoryId)
      );
    }
  };

  useEffect(() => {
    onGenreChange(selectedGenres);
  }, [selectedGenres, onGenreChange]);

  return (
    <div>
      <div className="collapse">
        <Collapse
          items={[
            {
              key: "1",
              label: "Filtrele",
              children: (
                <>
                  {filteredData.map((category) => (
                    <Checkbox
                      key={category.id}
                      style={{ width: "200px" }}
                      value={category.id}
                      onChange={(e) =>
                        handleCheckboxChange(e.target.checked, category.id)
                      }
                    >
                      {category.name}
                    </Checkbox>
                  ))}
                </>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
}
