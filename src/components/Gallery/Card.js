import { db } from "../../firebase/firebase-config";
import { ref, child, push, update, remove } from "firebase/database";
import { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import Product from "./Product";
import Pasta from "../../assets/defaultImgs/pasta.png";
export default function Card({ data, postKey, getData }) {
  const handleClick = (data) => {
    console.log(data);
    getData(true, data, postKey);
  };

  return (
    <>
      <div id={data.id} className="card">
        <div
          className="preview-img"
          style={{ backgroundImage: `url(${Pasta})` }}
        ></div>

        <h3>{data.name}</h3>
        <div>
          <div>category: {data.category.title}</div>
          <div title={`recipe id: ${data.id}`}>
            recipe uploaded by: {data.username}
          </div>
        </div>

        <Link to={`recipe/${data.id}`}>View recipe</Link>
        {/* <button type="button" onClick={() => handleClick(data)}>
          view recipe
        </button> */}
      </div>
    </>
  );
}
