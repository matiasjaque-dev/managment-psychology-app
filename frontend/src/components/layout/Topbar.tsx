// src/components/Layout/Topbar.tsx
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useAuth } from "../../context/AuthContext";

const Topbar = () => {
  const { user, logout } = useAuth();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Bienvenido, {user?.name}
        </Typography>
        <Box>
          <Button
            color="inherit"
            onClick={() => {
              console.log("Logging out...");
              logout();
            }}
          >
            Cerrar sesión
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
