import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminPsychsPage from "./pages/Psychologists";
import AdminPatientsPage from "./pages/Patients";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import Layout from "./components/layout/Layout";
import PatientEntry from "./components/patients/PatientEntry";
import Admin from "./pages/Admin";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/admin/psychs"
            element={
              <PrivateRoute requiredRole="admin">
                <Layout>
                  <Admin />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/patients"
            element={
              <PrivateRoute requiredRole="patient">
                <Layout>
                  <AdminPatientsPage />
                </Layout>
              </PrivateRoute>
            }
          />
          // Psychologist panel view
          <Route
            path="/psychologist/sessions"
            element={
              <PrivateRoute requiredRole="psychologist">
                <Layout>
                  <AdminPsychsPage />
                </Layout>
              </PrivateRoute>
            }
          />
          // route patient entry
          <Route path="/patient-entry" element={<PatientEntry />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
