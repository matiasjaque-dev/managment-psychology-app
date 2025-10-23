// librerias
import { 
  Box, 
  Button, 
  Typography, 
  Container, 
  Paper, 
  useTheme,
  useMediaQuery,
  Alert
} from "@mui/material";
import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";

// servicios y tipos
import { deletePatient, getAllPatients } from "../services/patientService.ts";
import type { Patient } from "../types/Patient.ts";

// componentes
import { useAuth } from "../context/AuthContext.tsx";
import PatientTable from "../components/patients/PatientTable.tsx";
import PatientFormDialog from "../components/patients/PatientFormDialog.tsx";

const Patients = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [openForm, setOpenForm] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { user } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const loadPatients = async () => {
    try {
      setError(null);
      const data = await getAllPatients(user?.token || "");
      setPatients(data.filter((patient: Patient) => patient.isActive));
    } catch (err) {
      setError("Error al cargar los pacientes");
      console.error("Error loading patients:", err);
    }
  };

  useEffect(() => {
    if (!user || !user.token) return;
    loadPatients();
  }, [user]);

  const handleCreate = () => {
    setSelectedPatient(null);
    setOpenForm(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deletePatient(id, user?.token || "");
      await loadPatients();
    } catch (err) {
      setError("Error al eliminar el paciente");
      console.error("Error deleting patient:", err);
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
              Gestión de Pacientes
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{ mt: 0.5 }}
            >
              Administra la información de los pacientes registrados
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
            {isMobile ? "Nuevo Paciente" : "Agregar Paciente"}
          </Button>
        </Box>

        {/* Error Alert */}
        {error && (
          <Alert 
            severity="error" 
            sx={{ mb: 3 }}
            onClose={() => setError(null)}
          >
            {error}
          </Alert>
        )}

        {/* Tabla de pacientes */}
        <PatientTable
          data={patients}
          onEdit={(patient: Patient) => {
            setSelectedPatient(patient);
            setOpenForm(true);
          }}
          onDelete={handleDelete}
          reload={loadPatients}
        />

        {/* Dialog de formulario */}
        <PatientFormDialog
          open={openForm}
          onClose={() => setOpenForm(false)}
          patient={selectedPatient}
          reload={loadPatients}
        />
      </Paper>
    </Container>
  );
};

export default Patients;
