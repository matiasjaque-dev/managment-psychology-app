import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminPsychsPage from "./pages/admin/Psychologists";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin" element={<h1>Vista Admin</h1>} />
          <Route path="/psychologist" element={<h1>Vista Psicólogo</h1>} />
          <Route path="/admin/psychs" element={<AdminPsychsPage />} />
          {/* Agrega tus otras rutas aquí */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
