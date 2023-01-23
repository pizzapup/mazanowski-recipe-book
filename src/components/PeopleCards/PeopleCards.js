import { peopleData } from "./peopleData";

export const PeopleCard = ({ person }) => {
  return (
    <div className="people-card">
      <img src={person.img} alt="Profile Picture" />
      <div className="people-card-text">
        <h4>
          <span>{person.name}</span>
          <span>{person.title}</span>
        </h4>
        <p>{person.description}</p>
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
