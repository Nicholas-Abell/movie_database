import axios from "axios";
import Movie from "./Movie";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import MovieSkeleton from "./skeleton/MovieSkeleton";

const Row = ({ title, url, rowId }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios(url).then((res) => {
      setLoading(true);
      setMovies(res.data.results.filter((m) => m.backdrop_path));
      setLoading(false);
      console.log(res.data.results);
    });
  }, [url]);

  const slideLeft = () => {
    let slider = document.getElementById("slider" + rowId);
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const slideRight = () => {
    let slider = document.getElementById("slider" + rowId);
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  return (
    <>
      <h2 className="font-bold md:text-xl p-4">{title}</h2>
      <div className="relative flex items-center group">
        <FaChevronLeft
          onClick={slideLeft}
          size={40}
          className="rounded-full  text-black absolute opacity-50 hover:opacity-100 bg-white cursor-pointer z-10 hidden group-hover:block left-0"
        />
        <div
          id={"slider" + rowId}
          className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative"
        >
          {loading ? (
            <div className="flex space-x-4 px-4 py-2">
              <MovieSkeleton />
              <MovieSkeleton />
              <MovieSkeleton />
              <MovieSkeleton />
              <MovieSkeleton />
              <MovieSkeleton />
            </div>
          ) : (
            movies.map((movie, id) => <Movie key={id} movie={movie} />)
          )}
        </div>
        <FaChevronRight
          onClick={slideRight}
          size={40}
          className="rounded-full text-black absolute opacity-50 hover:opacity-100 bg-white cursor-pointer z-10 hidden group-hover:block right-0"
        />
      </div>
    </>
  );
};

export default Row;
