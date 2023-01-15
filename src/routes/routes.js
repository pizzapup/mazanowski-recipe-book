import { useRoutes } from "react-router-dom";
import { lazyLoadRoutes } from "./LazyLoadRoutes";

export function RouterElement() {
  const routes = [
    {
      path: "collections",
      name: "SavedRecipesPage",
      element: lazyLoadRoutes("SavedRecipesPage"),
    },
    {
      path: "collections/:id",
      name: "SavedRecipesDetail",
      element: lazyLoadRoutes("SavedRecipesDetail"),
    },
    {
      path: "collections/detail",
      name: "CollectionsDetail",
      element: lazyLoadRoutes("CollectionsDetail"),
    },
    {
      path: "about",
      name: "about",
      element: lazyLoadRoutes("AboutUsPage"),
    },
    {
      path: "newrecipe",
      name: "NewRecipeForm",
      element: lazyLoadRoutes("NewRecipeForm"),
    },
    {
      path: "show/:id",
      name: "DisplayRecipe",
      element: lazyLoadRoutes("DisplayRecipe"),
    },
    {
      path: "login",
      name: "login",
      element: lazyLoadRoutes("LoginForm"),
    },
    //
    //
    {
      path: "register",
      name: "RegisterForm",
      element: lazyLoadRoutes("RegisterForm"),
    },
  ];

  return useRoutes(routes);
}
