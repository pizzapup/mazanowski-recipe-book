import { useState } from "react";
import { writeData } from "../../firebase/dbHelpers";
import axios from "axios";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase/firebase-config";
import Input, { TextArea } from "../Input/Input";
import CategoryInput from "./CategoryInput";
import DragAndDrop from "./DragAndDrop";
import { auth } from "../../firebase/firebase-config";
const user = auth.currentUser;
console.log(auth.currentUser);
const uids = user !== null ? user.displayName : "default";
const defaultImgUrl =
  "https://firebasestorage.googleapis.com/v0/b/recipe-book-d5784.appspot.com/o/recipe-imgs%2Fplaceholders?alt=media&token=683d1a06-95af-446e-9b53-dfd863b255fb";

export default function NewRecipeForm() {
  const initialValues = {
    name: "",
    category: { title: "appetizers and dips" },
    image: defaultImgUrl,
    ingredients: [],
    instructions: "",
    preheat: "",
    notes: "",
    username: user !== null ? user.displayName : "default",
  };

  const [imgUrl, setImgUrl] = useState(defaultImgUrl);
  const [values, setValues] = useState(initialValues);
  const [zestyIngredients, setZestyIngredients] = useState();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const getCategory = (cat) => {
    setValues({ ...values, category: cat });
  };

  const handleUpload = (e) => {
    console.log(`/recipe-imgs/${e.target.files[0].name}`);
    const storageRef = ref(storage, `/recipe-imgs/${e.target.files[0].name}`);
    const uploadTask = uploadBytesResumable(storageRef, e.target.files[0]);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgUrl(downloadURL);
          setValues({ ...values, image: imgUrl });
        });
      }
    );
  };
  const sendToDb = (zest) => {
    try {
      writeData({ ...values, ingredients: zest }, [
        "posts",
        // `user-posts/${uids}`,
      ]);

      setValues(initialValues);
    } catch (e) {}
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const newIngs = parseUserInput(values.ingredients);
    const options = {
      method: "POST",
      url: "https://zestful.p.rapidapi.com/parseIngredients",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "d34fbad9damsh82dd8ff206f6231p1a950djsn8c6b8c7ab9c9",
        "X-RapidAPI-Host": "zestful.p.rapidapi.com",
      },
      data: { ingredients: newIngs },
    };
    axios
      .request(options)
      .then(function (response) {
        console.log("without", response.data.results);
        setZestyIngredients(response.data.results);
        sendToDb(response.data.results);
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="img" style={{ backgroundImage: `url(${imgUrl})` }}>
          <DragAndDrop handleUpload={handleUpload} />
        </div>
        <fieldset>
          <legend>recipe details:</legend>
          <Input
            value={values.name}
            name="name"
            label="name"
            type="text"
            onChange={handleInputChange}
          />
          <CategoryInput getData={getCategory} />
          <TextArea
            onChange={handleInputChange}
            value={values.ingredients}
            name="ingredients"
            label="ingredients"
            placeholder="3/4 cup diced tomato"
            helperText="example: 2 cups white flour, 1tsp salt, 2 cloves garlic minced, 1/2 cup chicken broth"
            multiline
          />
          <TextArea
            value={values.instructions}
            name="instructions"
            label="instructions:"
            onChange={handleInputChange}
          />
        </fieldset>
        <Input
          value={values.preheat}
          name="preheat"
          type="text"
          label="preheat"
          onChange={handleInputChange}
        />
        <TextArea
          value={values.notes}
          name="notes"
          label="additional info/notes:"
          onChange={handleInputChange}
          className="additional-notes"
        />
        <div>
          recipe submitted by:
          {user !== null ? user.displayName : "default"}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
export function parseUserInput(input) {
  const userIngredients = [];

  input !== ""
    ? input
        .replaceAll(/[,.]/, " ")
        .split(/[\r?\n]+/)
        .filter(Boolean)
        .forEach(function (item) {
          console.log(item);
          userIngredients.push(item.trim());
        })
    : userIngredients.push(input);

  console.log(userIngredients);

  return userIngredients;
}
