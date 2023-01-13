import React, { useState, useEffect } from "react";
import { onValue, ref } from "firebase/database";
// import { database as db } from "../../firebase/firebaseConfig";
// import Result from "../Card/Result";
// const Card = Result;
import "./Gallery.css";
import { db } from "../../firebase/firebase-config";
import Card from "./Card";
import Product from "./Product";

export default function Gallery(props) {
  const [list, setList] = useState();
  const [viewRecipe, setViewRecipe] = useState(false);
  const [idData, setIdData] = useState({});
  const [postKey, setPostKey] = useState("");
  useEffect(() => {
    const dbRef = ref(db, `posts/`);
    onValue(dbRef, (snapshot) => {
      const posts = snapshot.val();
      const postList = [];
      for (let id in posts) {
        postList.push({ id, ...posts[id] });
      }
      setList(postList);
    });
  }, []);
  const getData = (x, data, postKey) => {
    setViewRecipe(x);
    setIdData(data);
    console.log("viewing", data);
  };
  return (
    <div className="gallery">
      {viewRecipe ? (
        <Product
          data={idData}
          postKey={postKey}
          backToGallery={() => setViewRecipe(false)}
        />
      ) : (
        <ul className="gallery-cards">
          {list
            ? list.map((postData, index) => (
                <li key={postData.id}>
                  <Card
                    data={postData}
                    postKey={postData.id}
                    getData={getData}
                  />
                </li>
              ))
            : "no saved posts"}
        </ul>
      )}
    </div>
  );
}
