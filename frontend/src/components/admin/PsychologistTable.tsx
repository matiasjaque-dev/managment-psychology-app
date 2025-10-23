import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Chip,
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
import SchoolIcon from "@mui/icons-material/School";
import type { Psychologist } from "../../types/psychologist";

interface Props {
  data: Psychologist[];
  onEdit: (psychologist: Psychologist) => void;
  onDelete: (id: string) => void;
  reload: () => Promise<void>;
}

const PsychologistTable: React.FC<Props> = ({ data, onEdit, onDelete }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  /**
   * Renderiza la vista móvil con cards
   */
  const renderMobileView = () => (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, p: 2 }}>
      {data.map((psych) => (
        <Box
          key={psych._id}
          sx={{
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 2,
            p: 2,
            backgroundColor: theme.palette.background.paper,
            "&:hover": {
              boxShadow: theme.shadows[2],
            },
            minHeight: "fit-content",
            width: "100%",
            overflow: "hidden",
          }}
        >
          {/* Header con nombre y acciones */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              mb: 2,
            }}
          >
            <Box sx={{ flex: 1, minWidth: 0, mr: 2 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "medium",
                  fontSize: "1.1rem",
                  lineHeight: 1.2,
                  mb: 0.5,
                  color: theme.palette.primary.main,
                }}
              >
                {psych.name}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  fontSize: "0.85rem",
                  wordBreak: "break-word",
                  lineHeight: 1.3,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <EmailIcon sx={{ mr: 0.5, fontSize: 16 }} />
                {psych.email}
              </Typography>
            </Box>

            {/* Botones de acción compactos */}
            <Box sx={{ display: "flex", gap: 0.5, flexShrink: 0 }}>
              <Tooltip title="Editar">
                <IconButton
                  onClick={() => onEdit(psych)}
                  size="small"
                  sx={{
                    color: theme.palette.primary.main,
                    backgroundColor: `${theme.palette.primary.main}10`,
                    "&:hover": {
                      backgroundColor: `${theme.palette.primary.main}20`,
                    },
                    width: 32,
                    height: 32,
                  }}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Eliminar">
                <IconButton
                  onClick={() => onDelete(psych._id || "")}
                  size="small"
                  sx={{
                    color: theme.palette.error.main,
                    backgroundColor: `${theme.palette.error.main}10`,
                    "&:hover": {
                      backgroundColor: `${theme.palette.error.main}20`,
                    },
                    width: 32,
                    height: 32,
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          {/* Especialidad */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <SchoolIcon
              sx={{
                mr: 1,
                color: "text.secondary",
                fontSize: 20,
                flexShrink: 0,
              }}
            />
            <Typography
              variant="body2"
              sx={{
                flex: 1,
                fontSize: "0.9rem",
                lineHeight: 1.4,
              }}
            >
              {psych.specialty || "Especialidad no especificada"}
            </Typography>
          </Box>
        </Box>
      ))}
      {data.length === 0 && (
        <Box sx={{ textAlign: "center", py: 6 }}>
          <PersonIcon sx={{ fontSize: 48, color: "text.secondary", mb: 2 }} />
          <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
            No hay psicólogos registrados
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Agrega el primer psicólogo para comenzar
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
              Profesional
            </TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "text.primary" }}>
              Especialidad
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
          {data.map((psych) => (
            <TableRow
              key={psych._id}
              sx={{
                "&:hover": {
                  backgroundColor: theme.palette.action.hover,
                },
              }}
            >
              <TableCell>
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: "medium" }}>
                    {psych.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {psych.email}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell>
                <Chip
                  label={psych.specialty || "No especificada"}
                  size="small"
                  sx={{
                    backgroundColor: psych.specialty
                      ? `${theme.palette.primary.main}20`
                      : `${theme.palette.grey[400]}20`,
                    color: psych.specialty
                      ? theme.palette.primary.main
                      : theme.palette.grey[600],
                  }}
                />
              </TableCell>
              <TableCell align="center">
                <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
                  <Tooltip title="Editar psicólogo">
                    <IconButton
                      onClick={() => onEdit(psych)}
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
                  <Tooltip title="Eliminar psicólogo">
                    <IconButton
                      onClick={() => onDelete(psych._id || "")}
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
              <TableCell colSpan={4} sx={{ textAlign: "center", py: 4 }}>
                <PersonIcon
                  sx={{ fontSize: 48, color: "text.secondary", mb: 2 }}
                />
                <Typography variant="h6" color="text.secondary">
                  No hay psicólogos registrados
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Agrega el primer psicólogo para comenzar
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

export default PsychologistTable;
