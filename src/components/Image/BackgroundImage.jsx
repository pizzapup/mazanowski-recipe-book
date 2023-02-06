export const BackgroundImage = (props) => (
  <div
    className={`img ${props.className && props.className}`}
    style={{
      backgroundImage: `url(${props.image})`,
    }}
    {...props}
  ></div>
);
