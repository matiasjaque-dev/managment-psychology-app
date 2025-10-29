import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  TextField,
  Typography,
  MenuItem,
  Paper,
  Box,
  useTheme,
  Divider,
  Alert,
  Chip,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PsychologyIcon from "@mui/icons-material/Psychology";
import EventIcon from "@mui/icons-material/Event";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import NotesIcon from "@mui/icons-material/Notes";
import SaveIcon from "@mui/icons-material/Save";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Swal from "sweetalert2";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";

import { getPublicPsychologists } from "../../services/psychologistService";
import type { Psychologist } from "../../types/psychologist";
import { createSession } from "../../services/sessionService";

const PatientEntry = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const [patientName, setPatientName] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [psychologistId, setPsychologistId] = useState("");
  const [scheduledStart, setScheduledStart] = useState("");
  const [durationMin] = useState(50);
  const [price] = useState(40000);
  const [notes, setNotes] = useState("");
  const [psychologists, setPsychologists] = useState<Psychologist[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPsychologists = async () => {
      try {
        setError(null);
        const data = await getPublicPsychologists();
        setPsychologists(data.filter((psych: Psychologist) => psych.isActive));
      } catch (error) {
        setError("Error al cargar los psicólogos disponibles");
        console.error("Error loading psychologists:", error);
      }
    };
    fetchPsychologists();
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !patientName ||
      !patientEmail ||
      !psychologistId ||
      !scheduledStart ||
      !price
    ) {
      Swal.fire({
        icon: "warning",
        title: "Campos obligatorios faltantes",
        text: "Por favor completa todos los campos requeridos.",
      });
      return;
    }

    try {
      setLoading(true);
      await createSession({
        patientName,
        patientEmail,
        psychologistId,
        scheduledStart,
        durationMin,
        price,
        notes,
      });

      Swal.fire({
        icon: "success",
        title: "Sesión creada ✅",
        text: "Tu sesión fue agendada correctamente.",
        timer: 2500,
        showConfirmButton: false,
      }).then(() => navigate("/"));
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al crear la sesión",
        text: "Intenta nuevamente más tarde.",
      });
      console.error("Error creating session:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 3 }}>
      <Paper
        elevation={0}
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[50]} 100%)`,
          borderRadius: 3,
          p: { xs: 2, md: 4 },
          minHeight: "80vh",
        }}
      >
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/")}
            sx={{
              mb: 2,
              color: "text.secondary",
              "&:hover": {
                backgroundColor: "rgba(0,0,0,0.04)",
              },
            }}
          >
            Volver al inicio
          </Button>

          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: { xs: "1.8rem", md: "2.5rem" },
              mb: 1,
            }}
          >
            Agendar Nueva Sesión
          </Typography>

          <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2 }}>
            Completa el formulario para programar tu cita con un psicólogo
          </Typography>

          <Chip
            label="Paciente"
            color="primary"
            variant="outlined"
            icon={<PersonIcon />}
            sx={{ fontWeight: "medium" }}
          />
        </Box>

        {/* Error Alert */}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          {/* Sección: Información Personal */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h6"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mb: 3,
                color: theme.palette.primary.main,
                fontWeight: "medium",
              }}
            >
              <PersonIcon />
              Información Personal
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                gap: 3,
              }}
            >
              <TextField
                label="Nombre Completo"
                fullWidth
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                required
                InputProps={{
                  startAdornment: (
                    <PersonIcon sx={{ mr: 1, color: "text.secondary" }} />
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": {
                      borderColor: theme.palette.primary.main,
                    },
                  },
                }}
              />

              <TextField
                label="Correo Electrónico"
                type="email"
                fullWidth
                value={patientEmail}
                onChange={(e) => setPatientEmail(e.target.value)}
                required
                InputProps={{
                  startAdornment: (
                    <EmailIcon sx={{ mr: 1, color: "text.secondary" }} />
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": {
                      borderColor: theme.palette.primary.main,
                    },
                  },
                }}
              />
            </Box>
          </Box>

          <Divider sx={{ my: 4 }} />

          {/* Sección: Selección de Profesional */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h6"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mb: 3,
                color: theme.palette.primary.main,
                fontWeight: "medium",
              }}
            >
              <PsychologyIcon />
              Selección de Profesional
            </Typography>

            <TextField
              select
              label="Seleccionar Psicólogo"
              fullWidth
              value={psychologistId}
              onChange={(e) => setPsychologistId(e.target.value)}
              required
              InputProps={{
                startAdornment: (
                  <PsychologyIcon sx={{ mr: 1, color: "text.secondary" }} />
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: theme.palette.primary.main,
                  },
                },
              }}
            >
              {psychologists.map((psychologist) => (
                <MenuItem key={psychologist._id} value={psychologist._id}>
                  <Box>
                    <Typography variant="body1" sx={{ fontWeight: "medium" }}>
                      {psychologist.name}
                    </Typography>
                    {psychologist.specialty && (
                      <Typography variant="caption" color="text.secondary">
                        {psychologist.specialty}
                      </Typography>
                    )}
                  </Box>
                </MenuItem>
              ))}
            </TextField>
          </Box>

          <Divider sx={{ my: 4 }} />

          {/* Sección: Programación de la Sesión */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h6"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mb: 3,
                color: theme.palette.primary.main,
                fontWeight: "medium",
              }}
            >
              <EventIcon />
              Programación de la Sesión
            </Typography>

            <Box sx={{ mb: 3 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  label="Fecha y Hora de la Sesión"
                  value={scheduledStart ? dayjs(scheduledStart) : null}
                  onChange={(newValue) => {
                    setScheduledStart(newValue ? newValue.toISOString() : "");
                  }}
                  sx={{
                    width: "100%",
                    "& .MuiOutlinedInput-root": {
                      "&:hover fieldset": {
                        borderColor: theme.palette.primary.main,
                      },
                    },
                  }}
                />
              </LocalizationProvider>
            </Box>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                gap: 3,
              }}
            >
              <TextField
                label="Duración"
                fullWidth
                value={`${durationMin} minutos`}
                disabled
                InputProps={{
                  startAdornment: (
                    <AccessTimeIcon sx={{ mr: 1, color: "text.secondary" }} />
                  ),
                }}
                helperText="Duración estándar de la sesión"
              />

              <TextField
                label="Precio de la Sesión"
                fullWidth
                value={formatPrice(price)}
                disabled
                InputProps={{
                  startAdornment: (
                    <AttachMoneyIcon sx={{ mr: 1, color: "text.secondary" }} />
                  ),
                }}
                helperText="Precio fijo por sesión"
              />
            </Box>
          </Box>

          <Divider sx={{ my: 4 }} />

          {/* Sección: Notas Adicionales */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h6"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mb: 3,
                color: theme.palette.primary.main,
                fontWeight: "medium",
              }}
            >
              <NotesIcon />
              Información Adicional
            </Typography>

            <TextField
              label="Notas o motivo de consulta (opcional)"
              multiline
              rows={4}
              fullWidth
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Describe brevemente el motivo de la consulta, síntomas o cualquier información relevante para el psicólogo..."
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: theme.palette.primary.main,
                  },
                },
              }}
            />
          </Box>

          {/* Botón de envío */}
          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "flex-end",
              pt: 3,
              borderTop: `1px solid ${theme.palette.divider}`,
            }}
          >
            <Button
              onClick={() => navigate("/")}
              startIcon={<ArrowBackIcon />}
              sx={{
                color: "text.secondary",
                order: { xs: 2, sm: 1 },
                "&:hover": {
                  backgroundColor: "rgba(0,0,0,0.04)",
                },
              }}
            >
              Cancelar
            </Button>

            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              startIcon={<SaveIcon />}
              sx={{
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                px: 4,
                py: 1.5,
                order: { xs: 1, sm: 2 },
                "&:hover": {
                  background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                  transform: "translateY(-2px)",
                  boxShadow: "0 6px 25px rgba(0,0,0,0.15)",
                },
                "&:disabled": {
                  background: theme.palette.grey[300],
                },
                transition: "all 0.3s ease",
              }}
            >
              {loading ? "Agendando..." : "Agendar Sesión"}
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default PatientEntry;
