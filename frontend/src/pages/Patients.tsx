// librerias
import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
// logica
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

  const { user } = useAuth();

  console.log("User in Patient:", user);

  const loadPatients = async () => {
    const data = await getAllPatients(user?.token || "");
    setPatients(data.filter((patient: Patient) => patient.isActive));
  };

  useEffect(() => {
    if (!user || !user.token) return;
    loadPatients();
  }, [user]);

  const handleCreate = () => {
    setSelectedPatient(null);
    setOpenForm(true);
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Gestión de Pacientes
      </Typography>
      <Button variant="contained" color="primary" onClick={handleCreate}>
        Agregar Paciente
      </Button>
      <PatientTable
        data={patients}
        onEdit={(patient: Patient) => {
          setSelectedPatient(patient);
          setOpenForm(true);
        }}
        onDelete={async (id: string) => {
          console.log("Delete patient with id:", id);
          const resp = await deletePatient(id, user?.token || "");
          await loadPatients();
          console.log(resp);
          // Aquí deberías implementar la lógica para eliminar un paciente
        }}
        reload={loadPatients}
      />

      <PatientFormDialog
        open={openForm}
        onClose={() => setOpenForm(false)}
        patient={selectedPatient}
        reload={loadPatients}
      />
    </Box>
  );
};

export default Patients;
