const Card = (props) => {
  return (
    <div className={`card ${props.className && props.className}`}>
      {props.children}
    </div>
  );
};
export default Card;

Card.Button = (props) => (
  <button
    className={`card-btn ${props.className && props.className}`}
    {...props}
  >
    {props.children}
  </button>
);
Card.Image = (props) => (
  <div
    className="card-img"
    style={{
      backgroundImage: `url(${props.image})`,
      width: props.w ? props.w : props.size ? props.size : "unset",
      height: props.h ? props.h : props.size ? props.size : "unset",
    }}
  ></div>
);
Card.Title = (props) => (
  <div className={`card-title ${props.className && props.className}`}></div>
);
Card.Subtitle = (props) => <div className={`card-subtitle`}></div>;
Card.TextSection = (props) => (
  <div
    className={`card-text-section ${props.className && props.className}`}
  ></div>
);
