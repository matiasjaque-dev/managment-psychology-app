// librerias
import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
// logica
import {
  getAllPsychologists,
  deletePsychologist,
} from "../services/psychologistService.ts";
import type { Psychologist } from "../types/psychologist.ts";
// componentes
import PsychologistTable from "../components/admin/PsychologistTable.tsx";
import PsychologistFormDialog from "../components/admin/PsychologistFormDialog.tsx";
import { useAuth } from "../context/AuthContext.tsx";

const Admin = () => {
  const [psychologists, setPsychologists] = useState<Psychologist[]>([]);
  const [openForm, setOpenForm] = useState(false);
  const [selectedPsych, setSelectedPsych] = useState<Psychologist | null>(null);

  const { user } = useAuth();

  console.log("User in Psychologists:", user);

  const loadPsychologists = async () => {
    const data = await getAllPsychologists();
    setPsychologists(data.filter((psych: Psychologist) => psych.isActive));
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
        onDelete={async (id: string) => {
          console.log("Delete psychologist with id:", id);
          const resp = await deletePsychologist(id, user?.token || "");
          await loadPsychologists();
          console.log(resp);
          // Aquí deberías implementar la lógica para eliminar un psicólogo
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

export default Admin;
