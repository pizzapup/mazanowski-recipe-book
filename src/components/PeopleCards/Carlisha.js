import CarlishaW from "../../assets/profilepics/Placeholder2.png";
import { Card, CardTitle, CardText, CardSubtitle, CardBody } from "reactstrap";
import Github from "../../assets/icons/github.png";
import LinkedIn from "../../assets/icons/linkedin.png";

const Carlisha = () => {
  return (
    <div>
      <Card
        style={{
          width: "18rem",
          border: "1rem solid #70BA89",
        }}
      >
        <div
          style={{
            width: "256px",
            height: "256px",
            position: "relative",
            overflow: "hidden",
            borderRadius: "50%",
          }}
        >
          <img
            src={CarlishaW}
            alt="Profile Picture"
            style={{
              display: "inline",
              margin: "0 auto",
              height: "auto",
              width: "100%",
            }}
          />
        </div>
        <CardBody>
          <CardTitle
            tag="h3"
            style={{
              fontFamily: "Vibur, cursive",
            }}
          >
            Carlisha Wilson
          </CardTitle>
          <CardSubtitle
            className="mb-2 text-muted"
            tag="h5"
            style={{
              fontFamily: "Vibur, cursive",
            }}
          >
            UX/UI, Design
          </CardSubtitle>
          <details className="description" open>
            <summary
              className="details"
              data-open="read less"
              data-closed="read more"
            ></summary>
            <div className="content">
              <div className="content">
                <CardText className="mb-3">
                  Carlisha is a Digital Artist studying to be a UX Researcher.
                  When she is not studying, her time as a freelance photographer
                  is spent empathizing with her clientele and creating a safe
                  space for anyone who finds themselves in front of her camera.
                </CardText>
              </div>
            </div>
          </details>
          <a href="http://linkedin.com/">
            <img
              src={LinkedIn}
              alt="LinkedIn"
              style={{
                width: "3rem",
              }}
            />
          </a>
        </CardBody>
      </Card>
    </div>
  );
};

export default Carlisha;
