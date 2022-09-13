import "./App.css";
import MainPage from "./pages/MainPage";
import { Route, Routes } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import store from "./redux/store";
import Home from "./pages/Home";

function App() {
  const place = useSelector((state) => {
    return state.place.value;
  });
  console.log(place);
  return (
    <Routes>
      {/* <Route path="/" element={<MainPage />} /> */}
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
