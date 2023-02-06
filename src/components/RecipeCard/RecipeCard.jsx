import { Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CardSubtitle, CardTitle } from "reactstrap";
import Card from "../Card/Card";

const RecipeCard = ({ data }) => {
  const navigate = useNavigate();

  return (
    <Card style={{ background: "pink" }}>
      <Card.Image image={data.image} />

      <div className="card-text-section">
        <div className="card-title">{data.name}</div>
        <div className="card-subtitle">
          <Chip
            label={
              data.category && data.category !== {}
                ? data.category.title
                : "uncategorized"
            }
            variant="outlined"
            sx={{ margin: "0.5rem" }}
          />
        </div>
        <button
          className="card-btn"
          onClick={() => navigate(`/collections/${data.id}`)}
        >
          View Recipe
        </button>
      </div>
    </Card>
  );
};
export default RecipeCard;
