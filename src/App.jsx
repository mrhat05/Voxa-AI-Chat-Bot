import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Start from "./pages/Start";
import Login  from "./pages/Login"
import SignUp from "./pages/Signup";
import Protected from "./components/AuthLayout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/chat" replace />} />
        <Route path="/chat" element={<Start />} />
        <Route path="/chat/:chatId" element={<Start />} />
        <Route path="/login" element={<Protected authentication={false} ><Login /></Protected>} />
        <Route path="/signup" element={<Protected authentication={false}><SignUp /></Protected>} />
      </Routes>
    </Router>
  );
}

export default App;
