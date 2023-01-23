import Bowl from "../assets/imgs/bowl.jpg";
import Pie from "../assets/imgs/toast.jpg";
import { PeopleCards } from "../components/PeopleCards/PeopleCards";

import Logos from "../assets/imgs/logos";
import {
  FindReplaceRounded,
  SavedSearchRounded,
  ScaleOutlined,
  ScaleRounded,
  ShoppingCartCheckoutRounded,
  StyleRounded,
  TuneOutlined,
  TuneRounded,
} from "@mui/icons-material";
const designTools = [
  {
    title: "React.js",
    description: "Open-source front-end JavaScript library",
    href: "https://reactjs.org/",
    link: "ReactJs.org",
    img: Logos.ReactLogo,
  },
  {
    title: "Firebase",
    description:
      "App development platform for building and growing apps and games. Services used: Cloud Firestore, Realtime Database, Cloud Storage, Hosting, and Authentication.",
    href: "https://firebase.google.com/",
    link: "Firebase.google.com",
    img: Logos.FirebaseLogo,
  },
  {
    title: "Apple Vision OCR",
    description: "Detect and recognize multilanguage text in images.",
    href: "https://developer.apple.com/documentation/vision/recognizing_text_in_images",
    link: "Developer.Apple.com",
    img: Logos.AppleLogo,
  },
  {
    title: "React Router",
    description: "Enables client-side routing",
    href: "https://reactrouter.com/",
    link: "ReactRouter.com",
    img: Logos.ReactRouterLogo,
  },
  {
    title: "Zestful API",
    description:
      "Transforms ingredients from opaque strings to meaningful data in easy-to-consume JSON format",
    href: "https://zestfuldata.com/",
    link: "ZestfulData.com",
    img: Logos.ZestfulLogo,
  },
];
const AboutUsPage = () => {
  return (
    <div className="about-page">
      <section>
        <h3>About the Project</h3>
        <div>
          <p>
            The Mazanowski Recipe Book website is based on the 1999 family
            recipe book compiled by Natalie Mazanowski.
          </p>
          <p>
            Since the original copy was created, the family has grown and many
            family members have learned about their intolerance and allergies.
            My hope it that this application will help not only share these
            recipes to those without the physical copies, but to help those of
            us with dietary restrictions to enjoy the recipes.
          </p>
          <p>
            This application is a one-man undertaking and both the front-end and
            back-end has been implemented by yours truly. (So please be
            understanding if things are not perfect!)
          </p>
        </div>
      </section>
      <div
        className="img"
        style={{
          backgroundImage: `url(${Bowl})`,
        }}
      ></div>

      <section>
        <h3>Who made this?</h3>
        <PeopleCards />
      </section>

      <div
        className="img"
        style={{
          backgroundImage: `url(${Pie})`,
        }}
      ></div>

      <section>
        <p>
          I hope this application continues to honor the memories and traditions
          of food in our family. There is not a family event without it! I am
          very pleased to present to you "The Mazanowski Recipe Book"!
        </p>
      </section>
      <section>
        <h3>Details</h3>
        <ul className="about-technologies">
          {designTools.map((tool, idx) => {
            return (
              <li key={`design-tool-${idx}`}>
                <div>
                  <h4>{tool.title}</h4>
                  <div className="about-tools-logo">
                    <img src={tool.img} alt={tool.title} />
                  </div>
                  <p>{tool.description}</p>
                </div>
                <a href={tool.href}>{tool.link}</a>
              </li>
            );
          })}
          <li>
            <div>
              <h4>MUI Autocomplete & Icons</h4>
              <div className="about-tools-logo">
                <img src={Logos.MUILogo} alt="mui" />
              </div>
              <p>MUI Autocomplete component and material design icons.</p>
            </div>
            <div className="about-mui">
              <a href="https://mui.com/material-ui/material-icons/">
                autocomplete
              </a>
              <a href="https://mui.com/material-ui/react-autocomplete/">
                icons
              </a>
            </div>
          </li>
        </ul>
      </section>

      <section className="about-coming-soon">
        <h3>Coming Soon</h3>
        <div>
          <h4>Database</h4>

          <p>
            After all base recipes have been entered, we will have a better idea
            of what we are working with. This will allow room for more features
            such as:
            <ul>
              <li>
                <FindReplaceRounded />
                Ingredient substitutions
              </li>
              <li>
                <ShoppingCartCheckoutRounded /> Create shopping list
              </li>
              <li>
                <ScaleRounded /> Measurement unit conversions
              </li>
              <li>
                <TuneRounded /> Filtering
              </li>
              <li>
                <SavedSearchRounded /> Searching
              </li>
            </ul>
          </p>
        </div>

        <div>
          <h4>UI/UX Design</h4>
          <p className="about-coming-soon-style">
            <StyleRounded />
            Refresh and update styles
          </p>
          <p>
            The front-end is far from finished, but does what it needs to do
            (allow for data entry, display the data, modify the data, and use
            authentication). Working without a wireframe, mockup, or any design
            reference has made it challenging to implement quick styles.
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;
