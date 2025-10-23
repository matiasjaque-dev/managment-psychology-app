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
import AddIcon from '@mui/icons-material/Add';
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
  const [error, setError] = useState<string | null>(null);

  const { user } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  /**
   * Carga la lista de psicólogos activos desde el servidor
   */
  const loadPsychologists = async () => {
    try {
      setError(null);
      const data = await getAllPsychologists();
      // Filtrar solo psicólogos activos
      setPsychologists(data.filter((psych: Psychologist) => psych.isActive));
    } catch (err) {
      setError('Error al cargar los psicólogos. Por favor, intenta nuevamente.');
    }
  };

  // Cargar psicólogos al montar el componente y cuando el usuario cambie
  useEffect(() => {
    if (!user || !user.token) return;
    loadPsychologists();
  }, [user]);

  /**
   * Abre el formulario para crear un nuevo psicólogo
   */
  const handleCreate = () => {
    setSelectedPsych(null);
    setOpenForm(true);
  };

  /**
   * Maneja la eliminación (soft delete) de un psicólogo
   */
  const handleDelete = async (id: string) => {
    try {
      await deletePsychologist(id, user?.token || "");
      await loadPsychologists();
    } catch (err) {
      setError('Error al eliminar el psicólogo. Por favor, intenta nuevamente.');
    }
  };

  return (
    <Container 
      maxWidth="lg" 
      sx={{ 
        py: isMobile ? 2 : 3,
        px: isMobile ? 1 : 3
      }}
    >
      <Paper
        elevation={2}
        sx={{
          p: isMobile ? 1.5 : 4,
          borderRadius: 2,
          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)',
          overflow: 'hidden'
        }}
      >
        {/* Header Section */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'space-between',
            alignItems: isMobile ? 'stretch' : 'center',
            mb: 3,
            gap: 2,
            px: isMobile ? 1 : 0
          }}
        >
          <Box>
            <Typography 
              variant={isMobile ? "h5" : "h4"} 
              component="h1"
              sx={{ 
                fontWeight: 'bold',
                color: theme.palette.primary.main,
                mb: 0.5,
                fontSize: isMobile ? '1.4rem' : '2.125rem'
              }}
            >
              Gestión de Psicólogos
            </Typography>
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{ fontSize: isMobile ? '0.85rem' : '0.875rem' }}
            >
              Administra el equipo de profesionales de la plataforma
            </Typography>
          </Box>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleCreate}
            size={isMobile ? "medium" : "large"}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 'medium',
              background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
              fontSize: isMobile ? '0.9rem' : '1rem',
              py: isMobile ? 1.2 : 1.5,
              px: isMobile ? 2 : 3,
              '&:hover': {
                background: 'linear-gradient(45deg, #5a6fd8 30%, #6a4190 90%)',
              }
            }}
          >
            Agregar Psicólogo
          </Button>
        </Box>

        {/* Error Alert */}
        {error && (
          <Alert 
            severity="error" 
            sx={{ 
              mb: 3,
              mx: isMobile ? 1 : 0
            }}
            onClose={() => setError(null)}
          >
            {error}
          </Alert>
        )}

        {/* Table Section */}
        <Paper
          variant="outlined"
          sx={{
            borderRadius: 2,
            overflow: 'hidden',
            mx: isMobile ? 0 : 0,
            '& .MuiTable-root': {
              minWidth: isMobile ? 300 : 650,
            }
          }}
        >
          <PsychologistTable
            data={psychologists}
            onEdit={(psych: Psychologist) => {
              setSelectedPsych(psych);
              setOpenForm(true);
            }}
            onDelete={handleDelete}
            reload={loadPsychologists}
          />
        </Paper>
      </Paper>

      {/* Form Dialog */}
      <PsychologistFormDialog
        open={openForm}
        onClose={() => setOpenForm(false)}
        psychologist={selectedPsych}
        reload={loadPsychologists}
      />
    </Container>
  );
};

export default Admin;
