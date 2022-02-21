import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import About from "./pages/About";
import "./styles/style.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" exact element={<Homepage />} />
        <Route path="/About" exact element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
