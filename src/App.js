import { UserAuthContextProvider } from "./firebase/Auth/UserAuthContex";

import "./App.css";

import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import RecipeListPage from "./pages/RecipeListPage";
import SavedRecipesPage from "./pages/SavedRecipesPage";
import AboutUsPage from "./pages/AboutUsPage";

import SavedRecipesDetail from "./components/SavedRecipesDetail";
import CollectionsDetail from "./components/CollectionsDetail";

import Error from "./components/Error";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginForm from "./components/Auth/LoginForm";
import RegisterForm from "./components/Auth/RegisterForm";
import DisplayRecipe from "./components/DisplayRecipe";
import { Container } from "reactstrap";
export const pages = [
  { to: "login", title: "Login" },
  { to: "about", title: "About Us" },
  { to: "collections", title: "Saved Recipes" },
  { to: "recipes", title: "Recipes" },
];
function App() {
  const [stateDataIntolerances, setStateDataIntolerances] = useState("");
  const [stateDataDiet, setStateDataDiet] = useState("");

  const pull_data = (data) => {
    setStateDataIntolerances(data); // LOGS DATA FROM CHILD (array)
  };

  const pull_data2 = (data2) => {
    setStateDataDiet(data2); // LOGS DATA FROM CHILD (array)
  };

  return (
    <UserAuthContextProvider>
      <main className="App">
        <Header />
        <Routes>
          <Route
            path="/"
            element={<LandingPage func={pull_data} func2={pull_data2} />}
          />
          <Route path="login" element={<LoginForm />} />
          <Route path="register" element={<RegisterForm />} />
          <Route path="about" element={<AboutUsPage />} />
          <Route path="collections" element={<SavedRecipesPage />} />
          <Route path="collections/:id" element={<SavedRecipesDetail />} />
          <Route path="collections/detail" element={<CollectionsDetail />} />

          <Route
            path="recipes"
            element={
              <RecipeListPage
                intolerances={stateDataIntolerances}
                diet={stateDataDiet}
              />
            }
          />
          <Route path="show/:id" element={<DisplayRecipe />} />

          {/* for testing only */}
          <Route path="detail" element={<SavedRecipesDetail />} />
          {/* for testing only */}

          <Route element={Error} />
          {/* Error component isn't rendering when I use an incorrect path */}
        </Routes>
        <Footer />
      </main>
    </UserAuthContextProvider>
  );
}

export default App;

// import "./styles.css";
// import { lazy, Suspense } from "react";
// import { Route, Routes } from "react-router-dom";
// import Layout from "./routes/Layout";
// import Product from "./components/Gallery/Product";
// const Signup = lazy(() => import("./components/Auth/Signup"));
// const Login = lazy(() => import("./components/Auth/Login"));
// const NewRecipe = lazy(() => import("./routes/NewRecipePage"));
// const Home = lazy(() => import("./routes/Home"));
// const Gallery = lazy(() => import("./components/Gallery/Gallery"));
// export const pages = [
//   { to: "/home", title: "Home" },
//   { to: "/newrecipe", title: "Create New Recipe" },
// ];
// function App() {
//   return (
//     <>
//       <UserAuthContextProvider>
//         <Routes>
//           <Route path="/" element={<Layout />}>
//             <Route
//               index
//               // path="home"
//               element={
//                 <Suspense fallback={<>...</>}>
//                   <Home />
//                 </Suspense>
//               }
//             />
//             <Route
//               index
//               path="home"
//               element={
//                 <Suspense fallback={<>...</>}>
//                   <Home />
//                 </Suspense>
//               }
//             />
//             <Route index path="recipe" element={<Gallery />} />
//             <Route index path="recipe/:id" element={<Product />} />
//             {/* <Route index path="recipe/detail" element={<Product />} /> */}
//             <Route
//               path="newrecipe"
//               element={
//                 <Suspense fallback={<>...</>}>
//                   <NewRecipe />
//                 </Suspense>
//               }
//             />
//             <Route
//               path="signup"
//               element={
//                 <Suspense fallback={<>...</>}>
//                   <Signup />
//                 </Suspense>
//               }
//             />
//             <Route
//               path="login"
//               element={
//                 <Suspense fallback={<>...</>}>
//                   <Login />
//                 </Suspense>
//               }
//             />
//             <Route
//               path="*"
//               element={
//                 <p> yikes - there's nothing at this url. try again ? </p>
//               }
//             />
//           </Route>
//         </Routes>
//       </UserAuthContextProvider>
//     </>
//   );
// }

// export default App;
