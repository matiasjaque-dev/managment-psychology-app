// librerias
import {
  Box,
  Button,
  Typography,
  Container,
  Paper,
  useTheme,
  useMediaQuery,
  Alert,
} from "@mui/material";
import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";

// componentes
import { useAuth } from "../context/AuthContext.tsx";
import type { Session } from "../types/Session.ts";
import { deleteSession, getAllSessions } from "../services/sessionService.ts";
import SessionTable from "../components/psychologists/SessionTable.tsx";
import SessionFormDialog from "../components/psychologists/SessionForm.tsx";

const Psychologists = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [openForm, setOpenForm] = useState(false);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { user } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const loadSessions = async () => {
    try {
      setError(null);
      const data = await getAllSessions(user?.token ?? "");
      setSessions(
        data.filter((session: Session) => {
          const psychologistId =
            typeof session.psychologistId === "string"
              ? session.psychologistId
              : session.psychologistId?._id;
          return session.isActive && psychologistId === user?.id;
        })
      );
    } catch (err) {
      setError("Error al cargar las sesiones");
      console.error("Error loading sessions:", err);
    }
  };

  useEffect(() => {
    if (!user || !user.token) return;
    loadSessions();
  }, [user]);

  const handleCreate = () => {
    setSelectedSession(null);
    setOpenForm(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteSession(id, user?.token || "");
      await loadSessions();
    } catch (err) {
      setError("Error al eliminar la sesión");
      console.error("Error deleting session:", err);
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Paper
        elevation={0}
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[50]} 100%)`,
          borderRadius: 3,
          p: { xs: 2, md: 3 },
          minHeight: "80vh",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", sm: "center" },
            mb: 3,
            gap: 2,
          }}
        >
          <Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontSize: { xs: "1.8rem", md: "2.5rem" },
              }}
            >
              Gestión de Sesiones
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{ mt: 0.5 }}
            >
              Administra las sesiones con tus pacientes
            </Typography>
          </Box>

          <Button
            variant="contained"
            onClick={handleCreate}
            startIcon={<AddIcon />}
            sx={{
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              borderRadius: 2,
              textTransform: "none",
              fontWeight: "medium",
              px: { xs: 2, md: 3 },
              py: 1,
              width: { xs: "100%", sm: "auto" },
              "&:hover": {
                background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                transform: "translateY(-2px)",
                boxShadow: "0 6px 25px rgba(0,0,0,0.15)",
              },
              transition: "all 0.3s ease",
            }}
          >
            {isMobile ? "Nueva Sesión" : "Agregar Sesión"}
          </Button>
        </Box>

        {/* Error Alert */}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        {/* Tabla de sesiones */}
        <SessionTable
          data={sessions}
          onEdit={(session: Session) => {
            setSelectedSession(session);
            setOpenForm(true);
          }}
          onDelete={handleDelete}
          reload={loadSessions}
        />

        {/* Dialog de formulario */}
        <SessionFormDialog
          open={openForm}
          onClose={() => setOpenForm(false)}
          session={selectedSession}
          reload={loadSessions}
        />
      </Paper>
    </Container>
  );
};

export default Psychologists;
