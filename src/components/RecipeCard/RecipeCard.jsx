import { useNavigate } from "react-router-dom";

const RecipeCard = ({ data }) => {
  const navigate = useNavigate();

  return (
    <div className="card">
      <div
        className="card-img"
        style={{ backgroundImage: `url(${data.image})` }}
      ></div>

      <div className="card-text-section">
        <div className="card-title">{data.name}</div>
        <div className="card-subtitle">
          category: {data.category && data.category.title}
        </div>
        <button
          className="card-btn"
          onClick={() => navigate(`/collections/${data.id}`)}
        >
          View Recipe
        </button>
      </div>
    </div>
  );
};
export default RecipeCard;
