import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import {
  Button,
  Container,
  TextField,
  Typography,
  Box,
  Paper,
  useTheme,
  useMediaQuery,
} from "@mui/material";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await loginUser(email, password);
      login({ ...response.user, token: response.token });
      navigate(
        response.user.role === "admin"
          ? "/admin/psychs"
          : response.user.role === "psychologist"
          ? "/psychologist/sessions"
          : "/admin/patients"
      );
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: theme.spacing(2),
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          width: "100%",
          maxWidth: isMobile ? "100%" : "450px",
        }}
      >
        <Paper
          elevation={8}
          sx={{
            padding: theme.spacing(isMobile ? 3 : 4),
            borderRadius: theme.spacing(2),
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
          }}
        >
          <Box sx={{ textAlign: "center", mb: 3 }}>
            <Typography
              variant={isMobile ? "h5" : "h4"}
              component="h1"
              gutterBottom
              sx={{
                fontWeight: "bold",
                color: theme.palette.primary.main,
                mb: 1,
              }}
            >
              Acceso al Sistema
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Ingresa tus credenciales para continuar
            </Typography>
          </Box>

          <form onSubmit={handleSubmit}>
            <TextField
              label="Correo Electrónico"
              type="email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: theme.spacing(1),
                },
              }}
            />
            <TextField
              label="Contraseña"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              sx={{
                mb: 3,
                "& .MuiOutlinedInput-root": {
                  borderRadius: theme.spacing(1),
                },
              }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size={isMobile ? "medium" : "large"}
              sx={{
                mb: 2,
                py: isMobile ? 1.5 : 2,
                borderRadius: theme.spacing(1),
                fontSize: isMobile ? "1rem" : "1.1rem",
                fontWeight: "medium",
                textTransform: "none",
                background: "linear-gradient(45deg, #667eea 30%, #764ba2 90%)",
                "&:hover": {
                  background:
                    "linear-gradient(45deg, #5a6fd8 30%, #6a4190 90%)",
                },
              }}
            >
              Iniciar Sesión
            </Button>

            <Button
              variant="outlined"
              fullWidth
              size={isMobile ? "medium" : "large"}
              sx={{
                py: isMobile ? 1.5 : 2,
                borderRadius: theme.spacing(1),
                fontSize: isMobile ? "0.95rem" : "1rem",
                fontWeight: "medium",
                textTransform: "none",
                borderColor: theme.palette.primary.main,
                color: theme.palette.primary.main,
                "&:hover": {
                  backgroundColor: theme.palette.primary.main,
                  color: "white",
                },
              }}
              onClick={() => navigate("/patient-entry")}
            >
              Agendar Cita como Paciente
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
