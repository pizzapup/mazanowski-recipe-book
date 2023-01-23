import { UserAuthContextProvider } from "./firebase/Auth/UserAuthContex";
import "./styles.css";
import React, { lazy, Suspense, useState } from "react";
import { Routes, Route } from "react-router-dom";

import SavedRecipesPage from "./pages/SavedRecipesPage";
import SavedRecipesDetail from "./components/SavedRecipesDetail";
import CollectionsDetail from "./components/CollectionsDetail";
import Header from "./components/Header";
import Footer from "./components/Footer";
import RegisterForm from "./components/Auth/RegisterForm";
import DisplayRecipe from "./components/DisplayRecipe";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import "./components/styles/styles.scss";
const AboutUsPage = lazy(() => import("./pages/AboutUsPage"));
const NewRecipeForm = lazy(() =>
  import("./components/CreateRecipe/NewRecipeForm")
);
const LoginForm = lazy(() => import("./components/Auth/LoginForm"));

export const pages = [
  // { to: "login", title: "Login" },
  { to: "about", title: "About Us" },
  { to: "collections", title: "Recipes" },

  { to: "newrecipe", title: "Create New Recipe" },
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
          <Route path="/" element={<Layout />} />
          <Route
            index
            element={
              <Suspense fallback={<>...</>}>
                <Home />
              </Suspense>
            }
          />
          <Route
            path="home"
            element={
              <Suspense fallback={<>...</>}>
                <Home />
              </Suspense>
            }
          />
          {/* <Route
            path="/"
            element={<LandingPage func={pull_data} func2={pull_data2} />}
          /> */}
          <Route
            path="collections"
            element={
              <Suspense fallback={<>...</>}>
                <SavedRecipesPage />
              </Suspense>
            }
          />
          <Route
            path="collections/:id"
            element={
              <Suspense fallback={<>...</>}>
                <SavedRecipesDetail />
              </Suspense>
            }
          />
          <Route
            path="collections/detail"
            element={
              <Suspense fallback={<>...</>}>
                <CollectionsDetail />
              </Suspense>
            }
          />
          <Route
            path="about"
            element={
              <Suspense fallback={<>...</>}>
                <AboutUsPage />
              </Suspense>
            }
          />
          <Route
            path="login"
            element={
              <Suspense fallback={<>...</>}>
                <LoginForm />
              </Suspense>
            }
          />
          <Route
            path="register"
            element={
              <Suspense fallback={<>...</>}>
                <RegisterForm />
              </Suspense>
            }
          />
          <Route
            path="newrecipe"
            element={
              <Suspense fallback={<>...</>}>
                <NewRecipeForm />
              </Suspense>
            }
          />

          <Route path="show/:id" element={<DisplayRecipe />} />
          {/* for testing only */}
          <Route path="detail" element={<SavedRecipesDetail />} />
          {/* for testing only */}
          <Route
            path="*"
            element={<p> yikes - there's nothing at this url. try again ? </p>}
          />
        </Routes>
        {/* <Footer /> */}
      </main>
    </UserAuthContextProvider>
  );
}

export default App;
