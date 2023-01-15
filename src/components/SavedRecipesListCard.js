import { useNavigate } from "react-router-dom";
import "../components/styles/Card.css";
const SavedRecipesListCard = ({ data, idx, postKey }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="recipe-card card-grid-card">
        <img
          alt={`${data.title}-preview`}
          src={data.image}
          style={{ padding: "1rem", borderRadius: "20px" }}
        />
        <div className="recipe-card-heading">{data.name}</div>
        <div className="recipe-card-cat-tag">
          category: {data.category && data.category.title}
        </div>
        <button onClick={() => navigate(`/collections/${data.id}`)}>
          View Recipe
        </button>
      </div>
    </>
  );
};
export default SavedRecipesListCard;
