import "./styles.css";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./routes/Layout";
import { UserAuthContextProvider } from "./firebase/Auth/UserAuthContex";
import Product from "./components/Gallery/Product";
const Signup = lazy(() => import("./components/Auth/Signup"));
const Login = lazy(() => import("./components/Auth/Login"));
const NewRecipe = lazy(() => import("./routes/NewRecipePage"));
const Home = lazy(() => import("./routes/Home"));
const Gallery = lazy(() => import("./components/Gallery/Gallery"));
export const pages = [
  { to: "/home", title: "Home" },
  { to: "/newrecipe", title: "Create New Recipe" },
];

function App() {
  return (
    <>
      <UserAuthContextProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              index
              // path="home"
              element={
                <Suspense fallback={<>...</>}>
                  <Home />
                </Suspense>
              }
            />
            <Route
              index
              path="home"
              element={
                <Suspense fallback={<>...</>}>
                  <Home />
                </Suspense>
              }
            />
            <Route index path="recipe" element={<Gallery />} />
            <Route index path="recipe/:id" element={<Product />} />
            {/* <Route index path="recipe/detail" element={<Product />} /> */}
            <Route
              path="newrecipe"
              element={
                <Suspense fallback={<>...</>}>
                  <NewRecipe />
                </Suspense>
              }
            />
            <Route
              path="signup"
              element={
                <Suspense fallback={<>...</>}>
                  <Signup />
                </Suspense>
              }
            />
            <Route
              path="login"
              element={
                <Suspense fallback={<>...</>}>
                  <Login />
                </Suspense>
              }
            />
            <Route
              path="*"
              element={
                <p> yikes - there's nothing at this url. try again ? </p>
              }
            />
          </Route>
        </Routes>
      </UserAuthContextProvider>
    </>
  );
}

export default App;
