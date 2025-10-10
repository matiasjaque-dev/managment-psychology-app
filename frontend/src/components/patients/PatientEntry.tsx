import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  TextField,
  Typography,
  MenuItem,
  Stack,
} from "@mui/material";
import Swal from "sweetalert2";
import { getAllPsychologists } from "../../services/psychologistService";
import type { Psychologist } from "../../types/psychologist";
import { createSession } from "../../services/sessionService";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";

const PatientEntry = () => {
  const navigate = useNavigate();

  const [patientName, setPatientName] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [psychologistId, setPsychologistId] = useState("");
  const [scheduledStart, setScheduledStart] = useState("");
  const [durationMin] = useState(50);
  const [price] = useState(40000);
  const [notes, setNotes] = useState("");
  const [psychologists, setPsychologists] = useState([]);

  useEffect(() => {
    const fetchPsychologists = async () => {
      try {
        const data = await getAllPsychologists();
        setPsychologists(data.filter((psych: Psychologist) => psych.isActive));
      } catch (error) {
        console.error("Error cargando psicólogos", error);
      }
    };
    fetchPsychologists();
  }, []);

  const handleSubmit = async (e: any) => {
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
      console.error(error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" mt={3} gutterBottom>
        Agendar sesión como paciente
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nombre del paciente *"
          fullWidth
          margin="normal"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
        />
        <TextField
          label="Email del paciente *"
          fullWidth
          margin="normal"
          value={patientEmail}
          onChange={(e) => setPatientEmail(e.target.value)}
        />
        <TextField
          select
          label="Seleccionar Psicólogo *"
          fullWidth
          margin="normal"
          value={psychologistId}
          onChange={(e) => setPsychologistId(e.target.value)}
        >
          {psychologists.map((p: any) => (
            <MenuItem key={p._id} value={p._id}>
              {p.name}
            </MenuItem>
          ))}
        </TextField>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            label="Fecha y hora de la sesión *"
            value={scheduledStart ? dayjs(scheduledStart) : null}
            onChange={(newValue) => {
              setScheduledStart(newValue ? newValue.toISOString() : "");
            }}
            sx={{ width: "100%", mt: 2 }}
          />
        </LocalizationProvider>
        <Stack direction="row" spacing={2}>
          <TextField
            label="Duración (min)"
            type="number"
            fullWidth
            margin="normal"
            value={durationMin}
            disabled
          />
          <TextField
            label="Precio"
            type="text"
            fullWidth
            margin="normal"
            value={`$${price.toLocaleString("es-CL")} CLP`}
            disabled
          />
        </Stack>

        <TextField
          label="Notas adicionales (opcional)"
          fullWidth
          margin="normal"
          multiline
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Agendar sesión
        </Button>
      </form>
    </Container>
  );
};

export default PatientEntry;
