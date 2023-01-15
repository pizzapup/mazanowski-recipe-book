import { PeopleCards } from "../PeopleCards/PeopleCards";

export const AboutTheProject = () => {
  return (
    <div className="about-the-project-content">
      <p>
        The Mazanowski Recipe Book website is based on the 1999 family recipe
        book compiled by Natalie Mazanowski.
      </p>
      <p>
        Since the original copy was created, the family has grown and many
        family members have learned about their intolerance and allergies. My
        hope it that this application will help not only share these recipes to
        those without the physical copies, but to help those of us with dietary
        restrictions to enjoy the recipes.
      </p>
      <p>
        This application is a one-man undertaking and both the front-end and
        back-end has been implemented by yours truly. (So please be
        understanding if things are not perfect!)
      </p>
    </div>
  );
};
export const ProjectDetails = [
  {
    title: "Analog to Electronic",
    body: (
      <ul>
        <li>
          <h5>Image Text Recognition Software </h5>
          <p>
            Text recognition was used to grab text from images of the recipes
            and transfer them to electronic format
          </p>
          <a href="https://developer.apple.com/documentation/vision/recognizing_text_in_images">
            developer.apple.com
          </a>
        </li>
      </ul>
    ),
  },
  {
    title: "Backend Development",
    body: (
      <ul>
        <li>
          <h5>Firebase</h5>
          <p>
            I used Google's Firebase development platform to build the backend
            of the application, including the form and database for ingredient
            data.
          </p>
          <a href="https://firebase.google.com/">Firebase.google.com</a>
        </li>
        <li>
          <h5>Zestful API</h5>
          <p>
            All ingredients are sent through the Zestful API which returns data
            for each ingredient including quantity, measurment unit, name, and
            USDA information. This helps ensure data integrity and provides a
            solid foundation to build upon when adding additional features
            (conversions, subsitutions, nutrition info, etc.)
          </p>
          <a href="https://zestfuldata.com/">ZestfulData.com</a>
        </li>
      </ul>
    ),
  },
  {
    title: "Frontend Development",
    body: (
      <ul>
        <li>
          <h5>React.js</h5>
          <p>
            React is an open-source front-end JavaScript library. I prefer
            working with react over vanilla javascript and jquery.
          </p>
          <a href="https://reactjs.org/">ReactJs.org</a>
        </li>
        <li>
          <h5>React-Router</h5>
          <p>Client-side routing enables a faster user experience</p>
          <a href="https://reactrouter.com/">ReactRouter.com</a>
        </li>
      </ul>
    ),
  },
  {
    title: "Coming Soon",
    body: (
      <>
        This application is still very much under construction. I went into this
        project with one goal: Upload and display the recipes. Nothing was
        planned out or designed - so we are winging it !
        <ul>
          <li>
            <h5>Database</h5>
            <p>
              The base database has been built and will contain all data from
              the recipe book itself, as well as some additional ingredient
              information.
            </p>
            <p>
              After all base recipes have been entered, we will have a better
              idea of what we are working with. This will allow me to build in
              features such as searching, measurement unit conversions,
              ingredient substitution suggestions, and "create shopping list"
              functions.
            </p>
          </li>
          <li>
            <h5>UI/UX Design</h5>
            <p>
              The front-end is far from finished, but does what it needs to do
              (allow for data entry, display the data, modify the data, and use
              authentication). Working without a wireframe, mockup, or any
              design reference has made it challenging to implement quick
              styles.
            </p>
          </li>
        </ul>
      </>
    ),
  },
];
