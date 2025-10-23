import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  Divider,
  MenuItem,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import PhoneIcon from "@mui/icons-material/Phone";
import BadgeIcon from "@mui/icons-material/Badge";
import WcIcon from "@mui/icons-material/Wc";
import HomeIcon from "@mui/icons-material/Home";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";

import { initPatientForm } from "../../constants/forms";
import type { Patient } from "../../types/Patient";
import { createPatient, updatePatient } from "../../services/patientService";
import { useAuth } from "../../context/AuthContext";

interface Props {
  open: boolean;
  onClose: () => void;
  patient: Patient | null;
  reload: () => Promise<void>;
}

const PatientFormDialog: React.FC<Props> = ({
  open,
  onClose,
  patient,
  reload,
}) => {
  const [form, setForm] = useState(initPatientForm);
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    if (patient) {
      setForm({
        name: patient.name,
        email: patient.email,
        password: patient.password ?? "",
        rut: patient.rut ?? "",
        phone: patient.phone ?? "",
        gender: patient.gender ?? "",
        address: patient.address ?? "",
      });
    } else {
      setForm(initPatientForm);
    }
  }, [patient]);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (patient) {
        await updatePatient(patient._id || "", form, user?.token || "");
      } else {
        await createPatient(form, user?.token || "");
      }
      setForm(initPatientForm);
      reload();
      onClose();
    } catch (error) {
      console.error("Error saving patient:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setForm(initPatientForm);
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
        '& .MuiDialog-paper': {
          borderRadius: isMobile ? 0 : 3,
          backgroundImage: 'none',
        }
      }}
    >
      <DialogTitle
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          color: 'white',
          py: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <PersonIcon />
        <Typography variant="h6" component="span">
          {patient ? "Editar" : "Nuevo"} Paciente
        </Typography>
      </DialogTitle>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <DialogContent sx={{ p: { xs: 2, md: 3 } }}>
          {/* Sección: Información Básica */}
          <Box sx={{ mb: 3 }}>
            <Typography
              variant="h6"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                mb: 2,
                color: theme.palette.primary.main,
                fontWeight: 'medium',
              }}
            >
              <PersonIcon />
              Información Básica
            </Typography>

            <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, 
              gap: 2 
            }}>
              <TextField
                label="Nombre Completo"
                fullWidth
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                InputProps={{
                  startAdornment: <PersonIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: theme.palette.primary.main,
                    },
                  },
                }}
              />
              <TextField
                label="Correo Electrónico"
                type="email"
                fullWidth
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                InputProps={{
                  startAdornment: <EmailIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: theme.palette.primary.main,
                    },
                  },
                }}
              />
            </Box>

            <Box sx={{ mt: 2 }}>
              <TextField
                label="Contraseña"
                type="password"
                fullWidth
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder={patient ? "Dejar vacío para mantener la actual" : "Ingresa una contraseña"}
                InputProps={{
                  startAdornment: <LockIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: theme.palette.primary.main,
                    },
                  },
                }}
              />
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Sección: Información Personal */}
          <Box sx={{ mb: 3 }}>
            <Typography
              variant="h6"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                mb: 2,
                color: theme.palette.primary.main,
                fontWeight: 'medium',
              }}
            >
              <BadgeIcon />
              Información Personal
            </Typography>

            <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, 
              gap: 2 
            }}>
              <TextField
                label="RUT"
                fullWidth
                value={form.rut}
                onChange={(e) => setForm({ ...form, rut: e.target.value })}
                placeholder="12.345.678-9"
                InputProps={{
                  startAdornment: <BadgeIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: theme.palette.primary.main,
                    },
                  },
                }}
              />

              <TextField
                select
                label="Género"
                fullWidth
                value={form.gender}
                onChange={(e) => setForm({ ...form, gender: e.target.value })}
                InputProps={{
                  startAdornment: <WcIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: theme.palette.primary.main,
                    },
                  },
                }}
              >
                <MenuItem value="">Sin especificar</MenuItem>
                <MenuItem value="Masculino">Masculino</MenuItem>
                <MenuItem value="Femenino">Femenino</MenuItem>
                <MenuItem value="Otro">Otro</MenuItem>
                <MenuItem value="Prefiero no decir">Prefiero no decir</MenuItem>
              </TextField>
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Sección: Información de Contacto */}
          <Box sx={{ mb: 3 }}>
            <Typography
              variant="h6"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                mb: 2,
                color: theme.palette.primary.main,
                fontWeight: 'medium',
              }}
            >
              <PhoneIcon />
              Información de Contacto
            </Typography>

            <Box sx={{ mb: 2 }}>
              <TextField
                label="Teléfono"
                fullWidth
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="+56 9 1234 5678"
                InputProps={{
                  startAdornment: <PhoneIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: theme.palette.primary.main,
                    },
                  },
                }}
              />
            </Box>

            <TextField
              label="Dirección"
              multiline
              rows={3}
              fullWidth
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              placeholder="Ingresa la dirección completa del paciente..."
              InputProps={{
                startAdornment: <HomeIcon sx={{ mr: 1, color: 'text.secondary', alignSelf: 'flex-start', mt: 1 }} />,
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
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
            gap: 1
          }}
        >
          <Button 
            onClick={handleClose}
            startIcon={<CloseIcon />}
            sx={{ 
              color: 'text.secondary',
              '&:hover': {
                backgroundColor: 'rgba(0,0,0,0.04)'
              }
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
              '&:hover': {
                background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
              },
              '&:disabled': {
                background: theme.palette.grey[300],
              }
            }}
          >
            {loading ? 'Guardando...' : 'Guardar Paciente'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default PatientFormDialog;
