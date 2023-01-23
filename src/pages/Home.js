import { Link } from "react-router-dom";
import CookbookDoc from "../assets/cookbook.docx";
import DoubleArrowRoundedIcon from "@mui/icons-material/DoubleArrowRounded";
import FoodBanner from "../assets/imgs/stock-fruit-banner.jpeg";
export const Home = () => {
  return (
    <>
      <div className="home-page">
        <div
          className="img"
          style={{ backgroundImage: `url(${FoodBanner})` }}
        ></div>
        <h1>Welcome!</h1>
        <p>
          Please head to the sign in page to view/add recipes. You can choose
          "sign in anonymously" if you dont want to create an account.
        </p>
        <div>
          <Link to="/newrecipe" className="home-link">
            <h2>Upload recipes</h2>{" "}
            <span className="home-link-span">Add recipe to the database</span>
            <DoubleArrowRoundedIcon />
          </Link>

          <Link to="/collections" className="home-link">
            <h2>View recipes</h2>{" "}
            <span className="home-link-span">
              View recipes already uploaded
            </span>
            <DoubleArrowRoundedIcon />
          </Link>

          <a href={CookbookDoc} download className="home-link">
            <h2>Download the word document</h2>
            <span className="home-link-span">Download the word document!</span>
            <DoubleArrowRoundedIcon />
          </a>
        </div>
      </div>
    </>
  );
};
