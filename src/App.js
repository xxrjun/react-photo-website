import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" exact element={<Homepage />} />
      </Routes>
    </div>
  );
}

export default App;
