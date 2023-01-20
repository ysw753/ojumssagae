import "./App.css";

import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";

function App() {
  return (
    <>
      <Routes>
        {/* <Route path="/" element={<MainPage />} /> */}
        <Route path="/" element={<Home />} />
        <h1>23.01.20</h1>
      </Routes>
    </>
  );
}

export default App;
