import { BrowserRouter, Route, Routes } from "react-router-dom";
import { usePocket } from "./pocketconexion";
import { Auth } from "./components/auth";
import HomePage from "./pages/home";
import Point from "./pages/points";
import RegisterUser from "./pages/register";
import HomeUsers from "./pages/userhome";
import Beneficios from "./pages/beneficios";
import Premios from "./pages/premios";
import AdminPage from "./pages/administrador";
import AdminUsers from "./pages/adminusers";
import AdminBeneficios from "./pages/adminbeneficios";
import AdminPremios from "./pages/adminpremios";
import "./App.css";

function App() {
  const { user, pb, URL_BASE } = usePocket();
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/points" element={<Point />} />
        <Route path="/registro" element={<RegisterUser />} />
        <Route element={<Auth isAuth={!!user} />}>
          <Route path="/inicio" element={<HomeUsers />} />
          <Route path="/beneficios" element={<Beneficios />} />
          <Route path="/premios" element={<Premios />} />
        </Route>
        <Route
          element={
            <Auth isAuth={!!user && user?.rol == "admin"} redirect="/inicio" />
          }
        >
          <Route path="/admin" element={<AdminPage pb={pb} url={URL_BASE} />} />
          <Route
            path="/admin-usuarios"
            element={<AdminUsers data={user} pb={pb} />}
          />
          <Route path="/admin-beneficios" element={<AdminBeneficios pb={pb} url={URL_BASE}/>} />

          <Route path="/admin-premios" element={<AdminPremios pb={pb}/>} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
