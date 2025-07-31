import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminPsychsPage from "./pages/admin/Psychologists";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin/psychs" element={<AdminPsychsPage />} />
        {/* Agrega tus otras rutas aquí */}
      </Routes>
    </Router>
  );
}

export default App;
