import "./App.css";
import SignIn from "./pages/SignIn";
import User from "./pages/User";
import Ngo from "./pages/Ngo";
import Verify from "./pages/Verify";
import About from "./pages/About";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/user" element={<User />} />
      <Route path="/ngo" element={<Ngo />} />
      <Route path="/verify" element={<Verify />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}

export default App;
