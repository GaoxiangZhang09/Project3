import "./App.css";

import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import Home from "./pages/Home";
import Communication from "./pages/Communication";
import Rubric from "./pages/Rubric";
import Layout from "./components/Layout/Layout";
import ErrorPage from './pages/ErrorPage'


function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Communication" element={<Communication />} />
        <Route path="/Rubric" element={<Rubric />} />
        <Route path="/ErrorPage" element={<ErrorPage />} />
      </Routes>
    </Layout>
  );
}

export default App;