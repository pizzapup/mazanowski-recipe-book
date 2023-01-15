import Bowl from "../assets/imgs/bowl.jpg";
import Pie from "../assets/imgs/toast.jpg";
import { useNavigate } from "react-router-dom";

import { useState } from "react";
import { PeopleCards } from "../components/PeopleCards/PeopleCards";
import "../components/styles/About.css";
import { AboutTheProject, ProjectDetails } from "../components/About/About";
const AboutUsPage = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState("");
  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };
  return (
    <div className="about-page">
      <section className="about-the-project">
        <h3>About the Project</h3>
        <AboutTheProject />
        <img src={Bowl} alt="Bowl" />
      </section>

      <section className="who-made-this">
        <h3>Who made this?</h3>
        <PeopleCards />
      </section>

      <div className="abt-page-img">
        <img src={Pie} alt="Pie" />
      </div>
      <section className="brief">
        <p>
          I hope this application continues to honor the memories and traditions
          of food in our family. There is not a family event without it! I am
          very pleased to present to you "The Mazanowski Recipe Book"!
        </p>
      </section>
      <section>
        <h3>Details</h3>
        <div className="about-section-details">
          {ProjectDetails.map((item, idx) => {
            return (
              <details key={`details-${idx}`}>
                <summary>{item.title}</summary>
                {item.body}
              </details>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;
