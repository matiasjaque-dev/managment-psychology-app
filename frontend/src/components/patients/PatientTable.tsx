import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  TableContainer,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import HomeIcon from "@mui/icons-material/Home";
import BadgeIcon from "@mui/icons-material/Badge";
import WcIcon from "@mui/icons-material/Wc";
import type { Patient } from "../../types/Patient";

interface Props {
  data: Patient[];
  onEdit: (patient: Patient) => void;
  onDelete: (id: string) => void;
  reload: () => Promise<void>;
}

const PatientTable: React.FC<Props> = ({ data, onEdit, onDelete }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  /**
   * Renderiza la vista móvil con cards
   */
  const renderMobileView = () => (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, p: 2 }}>
      {data.map((patient) => (
        <Box
          key={patient._id}
          sx={{
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 2,
            p: 2,
            backgroundColor: theme.palette.background.paper,
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          {/* Header con paciente y acciones */}
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
            <Box sx={{ flex: 1, minWidth: 0, mr: 2 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "medium",
                  fontSize: "1.1rem",
                  lineHeight: 1.2,
                  mb: 0.5,
                  color: theme.palette.primary.main,
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <PersonIcon sx={{ mr: 0.5, fontSize: 18 }} />
                {patient.name}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  fontSize: "0.85rem",
                  wordBreak: "break-word",
                  lineHeight: 1.3,
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <EmailIcon sx={{ mr: 0.5, fontSize: 16 }} />
                {patient.email}
              </Typography>
            </Box>
            
            {/* Botones de acción compactos */}
            <Box sx={{ display: 'flex', gap: 0.5, flexShrink: 0 }}>
              <Tooltip title="Editar">
                <IconButton
                  onClick={() => onEdit(patient)}
                  size="small"
                  sx={{
                    color: theme.palette.primary.main,
                    backgroundColor: `${theme.palette.primary.main}10`,
                    '&:hover': {
                      backgroundColor: `${theme.palette.primary.main}20`,
                    },
                    width: 32,
                    height: 32
                  }}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Eliminar">
                <IconButton
                  onClick={() => onDelete(patient._id || "")}
                  size="small"
                  sx={{
                    color: theme.palette.error.main,
                    backgroundColor: `${theme.palette.error.main}10`,
                    '&:hover': {
                      backgroundColor: `${theme.palette.error.main}20`,
                    },
                    width: 32,
                    height: 32
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          {/* Información del paciente */}
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1.5, mb: 2 }}>
            {patient.phone && (
              <Box>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}
                >
                  <PhoneIcon sx={{ mr: 0.5, fontSize: 14 }} />
                  Teléfono
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: "medium" }}>
                  {patient.phone}
                </Typography>
              </Box>
            )}

            {patient.rut && (
              <Box>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}
                >
                  <BadgeIcon sx={{ mr: 0.5, fontSize: 14 }} />
                  RUT
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: "medium" }}>
                  {patient.rut}
                </Typography>
              </Box>
            )}

            {patient.gender && (
              <Box>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}
                >
                  <WcIcon sx={{ mr: 0.5, fontSize: 14 }} />
                  Género
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: "medium" }}>
                  {patient.gender}
                </Typography>
              </Box>
            )}
          </Box>

          {/* Dirección */}
          {patient.address && (
            <Box>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}
              >
                <HomeIcon sx={{ mr: 0.5, fontSize: 14 }} />
                Dirección
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  backgroundColor: theme.palette.grey[50],
                  p: 1,
                  borderRadius: 1,
                  fontSize: "0.9rem",
                  lineHeight: 1.4,
                }}
              >
                {patient.address}
              </Typography>
            </Box>
          )}
        </Box>
      ))}
      {data.length === 0 && (
        <Box sx={{ textAlign: "center", py: 6 }}>
          <PersonIcon sx={{ fontSize: 48, color: "text.secondary", mb: 2 }} />
          <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
            No hay pacientes registrados
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Agrega el primer paciente para comenzar
          </Typography>
        </Box>
      )}
    </Box>
  );

  /**
   * Renderiza la vista de escritorio con tabla
   */
  const renderDesktopView = () => (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold", color: "text.primary" }}>
              Paciente
            </TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "text.primary" }}>
              Contacto
            </TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "text.primary" }}>
              Información Personal
            </TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "text.primary" }}>
              Dirección
            </TableCell>
            <TableCell
              align="center"
              sx={{ fontWeight: "bold", color: "text.primary" }}
            >
              Acciones
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((patient) => (
            <TableRow
              key={patient._id}
              sx={{
                "&:hover": {
                  backgroundColor: theme.palette.action.hover,
                },
              }}
            >
              <TableCell>
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: "medium" }}>
                    {patient.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {patient.email}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell>
                <Box>
                  {patient.phone && (
                    <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                      <PhoneIcon sx={{ mr: 0.5, fontSize: 16 }} />
                      {patient.phone}
                    </Typography>
                  )}
                </Box>
              </TableCell>
              <TableCell>
                <Box>
                  {patient.rut && (
                    <Typography variant="body2" sx={{ mb: 0.5 }}>
                      <strong>RUT:</strong> {patient.rut}
                    </Typography>
                  )}
                  {patient.gender && (
                    <Typography variant="body2">
                      <strong>Género:</strong> {patient.gender}
                    </Typography>
                  )}
                </Box>
              </TableCell>
              <TableCell>
                <Typography
                  variant="body2"
                  sx={{
                    maxWidth: 200,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {patient.address || "Sin dirección"}
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
                  <Tooltip title="Editar paciente">
                    <IconButton
                      onClick={() => onEdit(patient)}
                      size="small"
                      sx={{
                        color: theme.palette.primary.main,
                        "&:hover": {
                          backgroundColor: `${theme.palette.primary.main}15`,
                        },
                      }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Eliminar paciente">
                    <IconButton
                      onClick={() => onDelete(patient._id || "")}
                      size="small"
                      sx={{
                        color: theme.palette.error.main,
                        "&:hover": {
                          backgroundColor: `${theme.palette.error.main}15`,
                        },
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
              </TableCell>
            </TableRow>
          ))}
          {data.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} align="center" sx={{ py: 6 }}>
                <PersonIcon sx={{ fontSize: 48, color: "text.secondary", mb: 2 }} />
                <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                  No hay pacientes registrados
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Agrega el primer paciente para comenzar
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return isMobile ? renderMobileView() : renderDesktopView();
};

export default PatientTable;
