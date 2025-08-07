import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Sidebar = () => {
  const { user } = useAuth();

  return (
    <aside style={{ width: 200, background: "#f0f0f0", padding: 20 }}>
      <nav>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {user?.role === "admin" && (
            <li>
              <Link to="/admin/psychs">Gestionar Psicólogos</Link>
            </li>
          )}
          {user?.role === "psychologist" && (
            <li>
              <Link to="/psychologist">Vista Psicólogo</Link>
            </li>
          )}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
