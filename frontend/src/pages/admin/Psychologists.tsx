// librerias
import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
// logica
import { getAllPsychologists } from "../../services/psychologistService.ts";
import type { Psychologist } from "../../types/psychologist.ts";
// componentes
import PsychologistTable from "../../components/psychologists/PsychologistTable.tsx";
import PsychologistFormDialog from "../../components/psychologists/PsychologistFormDialog.tsx";
import { useAuth } from "../../context/AuthContext.tsx";

const Psychologists = () => {
  const [psychologists, setPsychologists] = useState<Psychologist[]>([]);
  const [openForm, setOpenForm] = useState(false);
  const [selectedPsych, setSelectedPsych] = useState<Psychologist | null>(null);

  const { user } = useAuth();

  console.log("User in Psychologists:", user);

  const loadPsychologists = async () => {
    const data = await getAllPsychologists(user?.token || "");
    setPsychologists(data);
  };

  useEffect(() => {
    if (!user || !user.token) return;
    loadPsychologists();
  }, [user]);

  const handleCreate = () => {
    setSelectedPsych(null);
    setOpenForm(true);
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Gestión de Psicólogos
      </Typography>
      <Button variant="contained" color="primary" onClick={handleCreate}>
        Agregar Psicólogo
      </Button>
      <PsychologistTable
        data={psychologists}
        onEdit={(psych: Psychologist) => {
          setSelectedPsych(psych);
          setOpenForm(true);
        }}
        reload={loadPsychologists}
      />

      <PsychologistFormDialog
        open={openForm}
        onClose={() => setOpenForm(false)}
        psychologist={selectedPsych}
        reload={loadPsychologists}
      />
    </Box>
  );
};

export default Psychologists;
