import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  Divider,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import EventIcon from "@mui/icons-material/Event";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import NotesIcon from "@mui/icons-material/Notes";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

import { useAuth } from "../../context/AuthContext";
import type { Session, SessionFormData } from "../../types/Session";
import { createSession, updateSession } from "../../services/sessionService";
import { initSessionForm } from "../../constants/forms";

interface Props {
  open: boolean;
  onClose: () => void;
  session: Session | null;
  reload: () => Promise<void>;
}

const SessionFormDialog: React.FC<Props> = ({
  open,
  onClose,
  session,
  reload,
}) => {
  const [form, setForm] = useState<SessionFormData>(initSessionForm);
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    if (session) {
      setForm({
        patientName: session.patientName,
        patientEmail: session.patientEmail,
        psychologistId: session.psychologistId,
        scheduledStart: session.scheduledStart,
        durationMin: session.durationMin ?? 50,
        price: session.price ?? 40000,
        status: session.status ?? "pendiente",
        notes: session.notes ?? "",
      });
    } else {
      setForm(initSessionForm);
    }
  }, [session]);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const sessionData: Session = {
        patientName: form.patientName,
        patientEmail: form.patientEmail,
        psychologistId: user?.id || "",
        scheduledStart: form.scheduledStart,
        durationMin: form.durationMin,
        price: form.price,
        status: form.status,
        notes: form.notes,
      };

      if (session) {
        await updateSession(session._id || "", sessionData, user?.token || "");
      } else {
        await createSession(sessionData, user?.token || "");
      }

      setForm(initSessionForm);
      reload();
      onClose();
    } catch (error) {
      console.error("Error saving session:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setForm(initSessionForm);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="md"
      fullScreen={isMobile}
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: isMobile ? 0 : 3,
          backgroundImage: "none",
        },
      }}
    >
      <DialogTitle
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          color: "white",
          py: 2,
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <EventIcon />
        <Typography variant="h6" component="span">
          {session ? "Editar" : "Nueva"} Sesión
        </Typography>
      </DialogTitle>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <DialogContent sx={{ p: { xs: 2, md: 3 } }}>
          {/* Sección: Información del Paciente */}
          <Box sx={{ mb: 3 }}>
            <Typography
              variant="h6"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mb: 2,
                color: theme.palette.primary.main,
                fontWeight: "medium",
              }}
            >
              <PersonIcon />
              Información del Paciente
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                gap: 2,
              }}
            >
              <TextField
                label="Nombre del Paciente"
                fullWidth
                value={form.patientName}
                onChange={(e) =>
                  setForm({ ...form, patientName: e.target.value })
                }
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
                label="Email del Paciente"
                type="email"
                fullWidth
                value={form.patientEmail}
                onChange={(e) =>
                  setForm({ ...form, patientEmail: e.target.value })
                }
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

          <Divider sx={{ my: 3 }} />

          {/* Sección: Programación */}
          <Box sx={{ mb: 3 }}>
            <Typography
              variant="h6"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mb: 2,
                color: theme.palette.primary.main,
                fontWeight: "medium",
              }}
            >
              <EventIcon />
              Programación
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "2fr 1fr" },
                gap: 2,
              }}
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  label="Fecha y hora de la sesión"
                  value={
                    form.scheduledStart ? dayjs(form.scheduledStart) : null
                  }
                  onChange={(newValue) => {
                    setForm({
                      ...form,
                      scheduledStart: newValue ? newValue.toISOString() : "",
                    });
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

              <TextField
                label="Duración (minutos)"
                type="number"
                fullWidth
                value={form.durationMin}
                onChange={(e) =>
                  setForm({ ...form, durationMin: Number(e.target.value) })
                }
                InputProps={{
                  startAdornment: (
                    <AccessTimeIcon sx={{ mr: 1, color: "text.secondary" }} />
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

          <Divider sx={{ my: 3 }} />

          {/* Sección: Detalles Financieros y Estado */}
          <Box sx={{ mb: 3 }}>
            <Typography
              variant="h6"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mb: 2,
                color: theme.palette.primary.main,
                fontWeight: "medium",
              }}
            >
              <AttachMoneyIcon />
              Detalles de la Sesión
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                gap: 2,
              }}
            >
              <TextField
                label="Precio (CLP)"
                type="number"
                fullWidth
                value={form.price}
                onChange={(e) =>
                  setForm({ ...form, price: Number(e.target.value) })
                }
                InputProps={{
                  startAdornment: (
                    <AttachMoneyIcon sx={{ mr: 1, color: "text.secondary" }} />
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
                select
                label="Estado de la Sesión"
                fullWidth
                value={form.status}
                onChange={(e) =>
                  setForm({
                    ...form,
                    status: e.target.value as
                      | "pendiente"
                      | "cancelada"
                      | "reagendada"
                      | "realizada",
                  })
                }
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": {
                      borderColor: theme.palette.primary.main,
                    },
                  },
                }}
              >
                <MenuItem value="pendiente">Pendiente</MenuItem>
                <MenuItem value="realizada">Realizada</MenuItem>
                <MenuItem value="reagendada">Reagendada</MenuItem>
                <MenuItem value="cancelada">Cancelada</MenuItem>
              </TextField>
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Sección: Notas */}
          <Box>
            <Typography
              variant="h6"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mb: 2,
                color: theme.palette.primary.main,
                fontWeight: "medium",
              }}
            >
              <NotesIcon />
              Notas y Observaciones
            </Typography>

            <TextField
              label="Notas de la sesión"
              multiline
              rows={4}
              fullWidth
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              placeholder="Ingresa observaciones, motivo de consulta, o notas importantes..."
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: theme.palette.primary.main,
                  },
                },
              }}
            />
          </Box>
        </DialogContent>

        <DialogActions
          sx={{
            p: { xs: 2, md: 3 },
            pt: 2,
            background: theme.palette.grey[50],
            gap: 1,
          }}
        >
          <Button
            onClick={handleClose}
            startIcon={<CloseIcon />}
            sx={{
              color: "text.secondary",
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
              "&:hover": {
                background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
              },
              "&:disabled": {
                background: theme.palette.grey[300],
              },
            }}
          >
            {loading ? "Guardando..." : "Guardar Sesión"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default SessionFormDialog;
