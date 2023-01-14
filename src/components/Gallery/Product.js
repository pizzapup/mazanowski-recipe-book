import { db } from "../../firebase/firebase-config";
import { ref, update, remove } from "firebase/database";
import { useParams } from "react-router-dom";

export default function Product({ data, postKey, backToGallery }) {
  const { postKey } = useParams();
  const postRef = ref(db, `/posts/${postKey}`);
  const deletePost = () => {
    return remove(postRef);
  };

  const updatePost = (data) => {
    const updates = {};
    updates["/posts/" + postKey] = data;
    return update(ref(db), updates);
  };

  function checkInt(number) {
    const qty = { 0.25: "1/4", 0.5: "1/2", 0.75: "3/4" };
    return number === Math.floor(number) ? number : qty[number];
  }
  function parseIngredient(ing) {
    const infoList = [];
    for (let info in ing) {
      console.log(info);
      info === "ingredientParsed" && infoList.push({ ...ing.ingredientParsed });
    }
    console.log(infoList);
    return (
      <ul>
        {infoList.map((info, idx) => (
          <li key={idx}>
            {checkInt(info.quantity)} {info.unit} {info.product}
          </li>
        ))}
      </ul>
    );
  }
  return (
    <>
      <div id={data.id} className="card">
        <div>
          <h3>{data.name}</h3>
          <ul>
            <li className="ingredients">
              <ul>
                {data.ingredients.map((ingredient, idx) => (
                  <li key={idx}>{parseIngredient(ingredient)}</li>
                ))}
              </ul>
            </li>
            <li>instructions: {data.instructions}</li>
            <li>preheat: {data.preheat}</li>
            <li>category: {data.category.title}</li>

            <li title={`recipe id: ${data.id}`}>
              recipe uploaded by: {data.username}
            </li>
          </ul>
        </div>
        <button onClick={backToGallery}>back</button>
      </div>
    </>
  );
}
