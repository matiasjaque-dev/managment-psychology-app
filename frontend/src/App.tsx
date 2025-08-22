import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminPsychsPage from "./pages/admin/Psychologists";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import Layout from "./components/layout/Layout";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin" element={<h1>Vista Admin</h1>} />
          <Route path="/psychologist" element={<h1>Vista Psicólogo</h1>} />
          <Route
            path="/test"
            element={
              <Layout>
                <h1>Vista Psicólogo</h1>
              </Layout>
            }
          />
          <Route
            path="/admin/psychs"
            element={
              <PrivateRoute requiredRole="admin">
                <Layout>
                  <AdminPsychsPage />
                </Layout>
              </PrivateRoute>
            }
          />
          {/* Agrega tus otras rutas aquí */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
