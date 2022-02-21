import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import About from "./pages/About";
import "./styles/style.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/react-photo-website-infinite-scroll/"
          exact
          element={<Homepage />}
        />
        <Route
          path="/react-photo-website-infinite-scroll/about"
          exact
          element={<About />}
        />
      </Routes>
    </div>
  );
}

export default App;
