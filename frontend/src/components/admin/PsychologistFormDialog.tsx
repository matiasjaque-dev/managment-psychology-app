import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Box,
  IconButton,
  useTheme,
  useMediaQuery,
  Divider,
  Alert
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import PhoneIcon from "@mui/icons-material/Phone";
import HomeIcon from "@mui/icons-material/Home";
import SchoolIcon from "@mui/icons-material/School";
import BadgeIcon from "@mui/icons-material/Badge";
import WcIcon from "@mui/icons-material/Wc";
import {
  createPsychologist,
  updatePsychologist,
} from "../../services/psychologistService";
import React, { useEffect, useState } from "react";
import type { Psychologist } from "../../types/psychologist";
import { initPsychologistForm } from "../../constants/forms";
import { useAuth } from "../../context/AuthContext";

interface Props {
  open: boolean;
  onClose: () => void;
  psychologist: Psychologist | null;
  reload: () => Promise<void>;
}

const PsychologistFormDialog: React.FC<Props> = ({
  open,
  onClose,
  psychologist,
  reload,
}) => {
  const [form, setForm] = useState(initPsychologistForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { user } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Cargar datos del psicólogo al editar
  useEffect(() => {
    if (psychologist) {
      setForm({
        name: psychologist.name,
        email: psychologist.email,
        specialty: psychologist.specialty ?? "",
        password: "", // No mostrar password existente por seguridad
        rut: psychologist.rut ?? "",
        phone: psychologist.phone ?? "",
        gender: psychologist.gender ?? "",
        address: psychologist.address ?? "",
      });
    } else {
      setForm(initPsychologistForm);
    }
    setError(null);
  }, [psychologist]);

  /**
   * Maneja el envío del formulario (crear o actualizar)
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (psychologist) {
        // Actualizar psicólogo existente
        await updatePsychologist(psychologist._id || "", form, user?.token || "");
      } else {
        // Crear nuevo psicólogo
        await createPsychologist(form, user?.token || "");
      }
      
      setForm(initPsychologistForm);
      await reload();
      onClose();
    } catch (err: any) {
      setError(
        err?.response?.data?.message || 
        'Error al guardar los datos. Por favor, verifica la información e intenta nuevamente.'
      );
    } finally {
      setLoading(false);
    }
  };

  /**
   * Maneja el cierre del diálogo
   */
  const handleClose = () => {
    if (!loading) {
      setForm(initPsychologistForm);
      setError(null);
      onClose();
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      fullScreen={isMobile}
      PaperProps={{
        sx: {
          borderRadius: isMobile ? 0 : 2,
          maxHeight: isMobile ? '100vh' : '90vh',
        }
      }}
    >
      {/* Header */}
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <PersonIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
          <Typography variant={isMobile ? "h6" : "h5"} component="h2">
            {psychologist ? "Editar" : "Crear"} Psicólogo
          </Typography>
        </Box>
        <IconButton
          onClick={handleClose}
          disabled={loading}
          sx={{ color: 'text.secondary' }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ px: isMobile ? 2 : 3, py: 3 }}>
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

          {/* Información Personal */}
          <Typography 
            variant="h6" 
            sx={{ 
              display: 'flex', 
              alignItems: 'center',
              color: theme.palette.primary.main,
              mb: 2
            }}
          >
            <PersonIcon sx={{ mr: 1 }} />
            Información Personal
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 2, mb: 2 }}>
            <TextField
              label="Nombre Completo"
              fullWidth
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              disabled={loading}
              InputProps={{
                startAdornment: <BadgeIcon sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                }
              }}
            />

            <TextField
              label="Correo Electrónico"
              type="email"
              fullWidth
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              disabled={loading}
              InputProps={{
                startAdornment: <EmailIcon sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                }
              }}
            />
          </Box>

          <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 2, mb: 2 }}>
            <TextField
              label={psychologist ? "Nueva Contraseña (opcional)" : "Contraseña"}
              type="password"
              fullWidth
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required={!psychologist}
              disabled={loading}
              helperText={psychologist ? "Deja en blanco para mantener la contraseña actual" : ""}
              InputProps={{
                startAdornment: <LockIcon sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                }
              }}
            />

            <TextField
              label="RUT"
              fullWidth
              value={form.rut}
              onChange={(e) => setForm({ ...form, rut: e.target.value })}
              disabled={loading}
              placeholder="12.345.678-9"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                }
              }}
            />
          </Box>

          <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 2, mb: 3 }}>
            <TextField
              label="Teléfono"
              fullWidth
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              disabled={loading}
              placeholder="+56 9 1234 5678"
              InputProps={{
                startAdornment: <PhoneIcon sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                }
              }}
            />

            <TextField
              label="Género"
              fullWidth
              value={form.gender}
              onChange={(e) => setForm({ ...form, gender: e.target.value })}
              disabled={loading}
              InputProps={{
                startAdornment: <WcIcon sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                }
              }}
            />
          </Box>

          {/* Información Profesional */}
          <Typography 
            variant="h6" 
            sx={{ 
              display: 'flex', 
              alignItems: 'center',
              color: theme.palette.primary.main,
              mb: 2
            }}
          >
            <SchoolIcon sx={{ mr: 1 }} />
            Información Profesional
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <TextField
            label="Especialidad"
            fullWidth
            value={form.specialty}
            onChange={(e) => setForm({ ...form, specialty: e.target.value })}
            disabled={loading}
            placeholder="Ej: Psicología Clínica, Psicología Infantil, etc."
            InputProps={{
              startAdornment: <SchoolIcon sx={{ mr: 1, color: 'text.secondary' }} />,
            }}
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              }
            }}
          />

          <TextField
            label="Dirección"
            fullWidth
            multiline
            rows={2}
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            disabled={loading}
            InputProps={{
              startAdornment: <HomeIcon sx={{ mr: 1, color: 'text.secondary', alignSelf: 'flex-start', mt: 0.5 }} />,
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              }
            }}
          />
        </DialogContent>

        <DialogActions 
          sx={{ 
            px: isMobile ? 2 : 3, 
            py: 2,
            borderTop: `1px solid ${theme.palette.divider}`,
            gap: 1
          }}
        >
          <Button 
            onClick={handleClose}
            disabled={loading}
            sx={{ 
              borderRadius: 2,
              textTransform: 'none',
              minWidth: 100
            }}
          >
            Cancelar
          </Button>
          <Button 
            type="submit" 
            variant="contained"
            disabled={loading}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              minWidth: 120,
              background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
              '&:hover': {
                background: 'linear-gradient(45deg, #5a6fd8 30%, #6a4190 90%)',
              }
            }}
          >
            {loading ? 'Guardando...' : 'Guardar'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default PsychologistFormDialog;
