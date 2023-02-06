import { Link } from "react-router-dom";
import CookbookDoc from "../assets/cookbook.docx";

import BrowseGallery from "../assets/dummyData/elliot.jpg";

import DownloadBook from "../assets/dummyData/downloadbook.jpg";
import RecipePage from "../assets/dummyData/gallery.jpg";
import { Hero } from "../components/Hero/Hero";

export const Home = () => {
  const options = [
    {
      route: true,
      link: "/newrecipe",
      title: "Upload recipe",
      description: "add new recipe to the database",
      image: RecipePage,
    },
    {
      route: true,
      link: "/collections",
      title: "View Gallery",
      description: "view recipes already in the database",
      image: BrowseGallery,
    },
    {
      route: false,
      link: CookbookDoc,
      title: "Download Document",
      description: "download the cookbook word document",
      image: DownloadBook,
    },
  ];

  return (
    <>
      <div className="home-page">
        <Hero page="home" />
        <div className="home-options">
          {options.map((option, idx) => {
            return (
              <>
                {option.route ? (
                  <Link
                    to={option.link}
                    className="home-option"
                    key={`optionkey-${idx}`}
                  >
                    <div
                      className="img"
                      style={{ backgroundImage: `url(${option.image})` }}
                    ></div>
                    <div className="options-text">
                      <h2>{option.title}</h2>
                      <p>{option.description}</p>
                    </div>
                  </Link>
                ) : (
                  <a
                    href={option.link}
                    key={`optionkey-${idx}`}
                    className="home-option"
                    download
                  >
                    <div
                      className="img "
                      style={{ backgroundImage: `url(${option.image})` }}
                    ></div>
                    <div className="options-text">
                      <h2>{option.title}</h2>
                      <p>{option.description}</p>
                    </div>
                  </a>
                )}
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};
