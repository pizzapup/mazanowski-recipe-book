import { Outlet } from "react-router-dom";
import { Nav } from "../components/Layout/Nav";

export default function Layout() {
  return (
    <>
      <Nav />
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </>
  );
}
