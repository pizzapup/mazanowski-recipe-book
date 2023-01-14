import {
  Container,
  Col,
  Row,
  Card,
  CardBody,
  CardTitle,
  Button,
  CardText,
  CardSubtitle,
} from "reactstrap";
import { Link } from "react-router-dom";
import SavedRecipesDetail from "./SavedRecipesDetail";
import { useNavigate } from "react-router-dom";

const SavedRecipesListCard = ({ data, idx, postKey }) => {
  const navigate = useNavigate();

  return (
    <>
      <Card className="card-grid-card">
        <img
          alt={`${data.title}-preview`}
          src={data.image}
          style={{ padding: "1rem", borderRadius: "20px" }}
        />
        <CardBody>
          <CardTitle>{data.name}</CardTitle>
          <CardSubtitle className="mb-2 text-muted">
            category: {data.category && data.category.title}
          </CardSubtitle>
          <Button onClick={() => navigate(`/collections/${data.id}`)}>
            View Recipe
          </Button>
        </CardBody>
      </Card>
    </>
  );
};
export default SavedRecipesListCard;
