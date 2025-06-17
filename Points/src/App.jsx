import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PocketProvider } from "./pocketconexion";
import HomePage from "./pages/home";
import Point from "./pages/points";
import RegisterUser from "./pages/register";
import "./App.css";

function App() {
  return (
    <PocketProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/points" element={<Point />} />
          <Route path="/registro" element={<RegisterUser/>} />
        </Routes>
      </BrowserRouter>
    </PocketProvider>
  );
}

export default App;
