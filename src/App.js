import { UserAuthContextProvider } from "./firebase/Auth/UserAuthContex";
import "./styles.css";
import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import SavedRecipesPage from "./pages/SavedRecipesPage";
import SavedRecipesDetail from "./components/SavedRecipesDetail";
import CollectionsDetail from "./components/CollectionsDetail";
import Header from "./components/Header";

import RegisterForm from "./components/Auth/RegisterForm";

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

          <Route
            path="*"
            element={<p> yikes - there's nothing at this url. try again ? </p>}
          />
        </Routes>
      </main>
    </UserAuthContextProvider>
  );
}

export default App;
