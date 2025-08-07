import { useAuth } from "../../context/AuthContext";

const Topbar = () => {
  const { user, logout } = useAuth();

  console.log("User in Topbar:", user);

  return (
    <header style={{ background: "#1976d2", padding: 10, color: "#fff" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>Bienvenido, {user?.name}</span>
        <button
          onClick={() => {
            console.log("Logging out...");

            logout();
          }}
          style={{
            background: "#fff",
            color: "#1976d2",
            border: "none",
            padding: "5px 10px",
          }}
        >
          Cerrar sesión
        </button>
      </div>
    </header>
  );
};

export default Topbar;
