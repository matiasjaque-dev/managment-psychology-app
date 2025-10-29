// src/components/Layout/Topbar.tsx
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ExitToApp, Person } from "@mui/icons-material";
import { useAuth } from "../../context/AuthContext";

const Topbar = () => {
  const { user, logout } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <AppBar
      position="static"
      sx={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        backdropFilter: "blur(10px)",
        boxShadow: "0 8px 32px rgba(102, 126, 234, 0.2)",
      }}
    >
      <Toolbar sx={{ minHeight: { xs: 56, sm: 64 } }}>
        {/* Logo/Título */}
        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          <Person
            sx={{
              mr: 1,
              fontSize: { xs: "1.2rem", sm: "1.5rem" },
              color: "white",
            }}
          />
          <Typography
            variant={isMobile ? "subtitle1" : "h6"}
            sx={{
              fontWeight: 600,
              color: "white",
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { xs: "flex-start", sm: "center" },
              gap: { xs: 0, sm: 1 },
            }}
          >
            {isMobile ? (
              <>
                <span style={{ fontSize: "0.9rem", opacity: 0.9 }}>Hola,</span>
                <span style={{ fontSize: "1rem", fontWeight: 700 }}>
                  {user?.name}
                </span>
              </>
            ) : (
              `Bienvenido, ${user?.name}`
            )}
          </Typography>
        </Box>

        {/* Botón de logout */}
        {isMobile ? (
          <IconButton
            color="inherit"
            onClick={() => {
              logout();
            }}
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.2)",
              },
            }}
          >
            <ExitToApp />
          </IconButton>
        ) : (
          <Button
            color="inherit"
            onClick={() => {
              logout();
            }}
            startIcon={<ExitToApp />}
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              borderRadius: 2,
              px: 3,
              fontWeight: 600,
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                transform: "translateY(-1px)",
              },
              transition: "all 0.2s ease-in-out",
            }}
          >
            Cerrar sesión
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
