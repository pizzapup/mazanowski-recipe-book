// import { useState } from "react";

// import { writeData } from "../../firebase/dbHelpers";
// import "./NewRecipeForm.css";
// import axios from "axios";
// import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
// import { storage } from "../../firebase/firebase-config";
// import Input, { TextArea } from "../Input/Input";
// import CategoryInput from "./CategoryInput";

// const uids = "default";
// const defaultImgUrl =
//   "https://firebasestorage.googleapis.com/v0/b/recipe-book-d5784.appspot.com/o/recipe-imgs%2Fplaceholders?alt=media&token=683d1a06-95af-446e-9b53-dfd863b255fb";

// export default function NewRecipeForm() {
//   const initialValues = {
//     name: "default",
//     category: "uncategorized",
//     image: defaultImgUrl,
//     ingredients: [],
//     instructions: "",
//     notes: "",
//   };
//   const [rawUserIngredients, setRawUserIngredients] = useState("");
//   const [imgUrl, setImgUrl] = useState(defaultImgUrl);
//   const [values, setValues] = useState(initialValues);
//   const [zestyIngredients, setZestyIngredients] = useState([]);
//   const [parsedIngredients, setParsedIngredients] = useState([]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setValues({ ...values, [name]: value });
//   };
//   const getCategory = (cat) => {
//     setValues({ ...values, category: cat });
//   };

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
const parsedData = () => {
  parseUserInput(rawUserIngredients);
  setParsedIngredients(parsedData);
  console.log(parsedData);
};
const getAxios = () => {
  const options = {
    method: "POST",
    url: "https://zestful.p.rapidapi.com/parseIngredients",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": "d34fbad9damsh82dd8ff206f6231p1a950djsn8c6b8c7ab9c9",
      "X-RapidAPI-Host": "zestful.p.rapidapi.com",
    },
    data: { ingredients: parsedIngredients },
  };
  axios
    .request(options)
    .then(function (response) {
      console.log("without", response.data.results);
      setZestyIngredients(response.data.results);
    })
    .catch(function (error) {
      console.error(error);
    });
};
const handleSubmit = (e) => {
  e.preventDefault();
  parsedData();
  // getAxios();
  console.log("submitted");
  writeData(values, ["posts", `user-posts/${uids}`]);
};

//   return (
//     <div className="form-container">
//       <form onSubmit={handleSubmit}>
//         <img src={imgUrl} alt="image of recipe" />
//         <Input
//           value={values.name}
//           name="name"
//           label="name"
//           onChange={handleInputChange}
//         />
//         <CategoryInput getData={getCategory} />
//         <TextArea
//           onChange={handleInputChange}
//           value={values.ingredients}
//           name="ingredients"
//           label="ingredients"
//           placeholder="3/4 cup diced tomato"
//           helperText="example: 2 cups white flour, 1tsp salt, 2 cloves garlic minced, 1/2 cup chicken broth"
//           multiline
//         />
//         <TextArea
//           value={values.notes}
//           name="notes"
//           label="additional info/notes:"
//           onChange={handleInputChange}
//         />
//         <TextArea
//           value={values.instructions}
//           name="instructions"
//           label="instructions:"
//           onChange={handleInputChange}
//         />
//         <Input
//           type="file"
//           accept="/image/*"
//           label="Upload image (optional)"
//           onChange={handleUpload}
//         />
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// }
// export function parseUserInput(input) {
//   const userIngredients = [];
//   if (input.includes(",") == true) {
//     input.split(",").forEach(function (item) {
//       userIngredients.push(item.trim());
//     });
//   } else {
//     userIngredients.push(input);
//   }
//   return userIngredients;
// }
