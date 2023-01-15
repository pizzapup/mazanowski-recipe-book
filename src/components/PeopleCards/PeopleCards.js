import Github from "../../assets/icons/github.png";
import LinkedIn from "../../assets/icons/linkedin.png";
import { peopleData } from "./peopleData";
import "./PeopleCards.css";
export const PeopleCard = ({ person }) => {
  return (
    <div className="people-card">
      <div className="people-card-inner">
        <div className="people-card-top">
          <img src={person.img} alt="Profile Picture" className="profile-img" />
          <h4 className="people-card-title">
            <span>{person.name}</span>
            <span>{person.title}</span>
          </h4>
        </div>
        <p className="people-card-body">
          {person.description}{" "}
          {person.name === "ariella hardwick" && (
            <div className="ppl-social-links">
              <a href={person.link}>
                <img src={LinkedIn} alt="LinkedIn" />
              </a>
              <a href={person.link}>
                <img src={Github} alt="Github" />
              </a>
            </div>
          )}
        </p>
      </div>
    </div>
  );
};
export const PeopleCards = () => {
  return (
    <div className="people-cards">
      {peopleData.map((person, idx) => (
        <PeopleCard person={person} key={`people-${idx}`} />
      ))}
    </div>
  );
};
