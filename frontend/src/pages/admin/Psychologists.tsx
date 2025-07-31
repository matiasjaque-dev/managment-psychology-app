import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getAllPsychologists } from "../../services/psychologistService.ts";
import PsychologistTable from "../../components/psychologists/PsychologistTable.tsx";
import type { Psychologist } from "../../types/psychologist.ts";
import PsychologistFormDialog from "../../components/psychologists/PsychologistFormDialog.tsx";

const Psychologists = () => {
  const [psychologists, setPsychologists] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [selectedPsych, setSelectedPsych] = useState<Psychologist | null>(null);

  const loadPsychologists = async () => {
    const data = await getAllPsychologists();
    setPsychologists(data);
  };

  useEffect(() => {
    loadPsychologists();
  }, []);

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
