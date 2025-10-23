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
  alpha,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import EventIcon from "@mui/icons-material/Event";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import NotesIcon from "@mui/icons-material/Notes";
import type { Session } from "../../types/Session";

interface Props {
  data: Session[];
  onEdit: (session: Session) => void;
  onDelete: (id: string) => void;
  reload: () => Promise<void>;
}

const SessionTable: React.FC<Props> = ({ data, onEdit, onDelete }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  /**
   * Obtiene el color del chip según el estado
   */
  const getStatusColor = (status: string | undefined) => {
    switch (status) {
      case "realizada":
        return {
          backgroundColor: alpha(theme.palette.success.main, 0.1),
          color: theme.palette.success.main,
        };
      case "pendiente":
        return {
          backgroundColor: alpha(theme.palette.warning.main, 0.1),
          color: theme.palette.warning.main,
        };
      case "cancelada":
        return {
          backgroundColor: alpha(theme.palette.error.main, 0.1),
          color: theme.palette.error.main,
        };
      case "reagendada":
        return {
          backgroundColor: alpha(theme.palette.info.main, 0.1),
          color: theme.palette.info.main,
        };
      default:
        return {
          backgroundColor: alpha(theme.palette.grey[500], 0.1),
          color: theme.palette.grey[700],
        };
    }
  };

  /**
   * Formatea el precio en pesos chilenos
   */
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0,
    }).format(price);
  };

  /**
   * Formatea la fecha y hora
   */
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString("es-CL"),
      time: date.toLocaleTimeString("es-CL", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  };

  /**
   * Renderiza la vista móvil con cards
   */
  const renderMobileView = () => (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, p: 2 }}>
      {data.map((session) => {
        const dateTime = formatDateTime(session.scheduledStart);
        return (
          <Box
            key={session._id}
            sx={{
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 2,
              p: 2,
              backgroundColor: theme.palette.background.paper,
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            {/* Header con paciente y acciones */}
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
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <PersonIcon sx={{ mr: 0.5, fontSize: 18 }} />
                  {session.patientName}
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
                  {session.patientEmail}
                </Typography>
              </Box>

              {/* Botones de acción compactos */}
              <Box sx={{ display: "flex", gap: 0.5, flexShrink: 0 }}>
                <Tooltip title="Editar">
                  <IconButton
                    onClick={() => onEdit(session)}
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
                    onClick={() => onDelete(session._id || "")}
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

            {/* Información de la sesión */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 1.5,
                mb: 2,
              }}
            >
              <Box>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ display: "flex", alignItems: "center", mb: 0.5 }}
                >
                  <EventIcon sx={{ mr: 0.5, fontSize: 14 }} />
                  Fecha
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: "medium" }}>
                  {dateTime.date}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {dateTime.time}
                </Typography>
              </Box>

              <Box>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ display: "flex", alignItems: "center", mb: 0.5 }}
                >
                  <AccessTimeIcon sx={{ mr: 0.5, fontSize: 14 }} />
                  Duración
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: "medium" }}>
                  {session.durationMin} min
                </Typography>
              </Box>

              <Box>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ display: "flex", alignItems: "center", mb: 0.5 }}
                >
                  <AttachMoneyIcon sx={{ mr: 0.5, fontSize: 14 }} />
                  Precio
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: "medium" }}>
                  {formatPrice(session.price)}
                </Typography>
              </Box>

              <Box>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ mb: 0.5, display: "block" }}
                >
                  Estado
                </Typography>
                <Chip
                  label={session.status}
                  size="small"
                  sx={{
                    ...getStatusColor(session.status),
                    fontWeight: "medium",
                    textTransform: "capitalize",
                  }}
                />
              </Box>
            </Box>

            {/* Notas */}
            {session.notes && (
              <Box>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ display: "flex", alignItems: "center", mb: 0.5 }}
                >
                  <NotesIcon sx={{ mr: 0.5, fontSize: 14 }} />
                  Notas
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
                  {session.notes}
                </Typography>
              </Box>
            )}
          </Box>
        );
      })}
      {data.length === 0 && (
        <Box sx={{ textAlign: "center", py: 6 }}>
          <EventIcon sx={{ fontSize: 48, color: "text.secondary", mb: 2 }} />
          <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
            No hay sesiones programadas
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Agrega la primera sesión para comenzar
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
              Fecha y Hora
            </TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "text.primary" }}>
              Duración
            </TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "text.primary" }}>
              Precio
            </TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "text.primary" }}>
              Estado
            </TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "text.primary" }}>
              Notas
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
          {data.map((session) => {
            const dateTime = formatDateTime(session.scheduledStart);
            return (
              <TableRow
                key={session._id}
                sx={{
                  "&:hover": {
                    backgroundColor: theme.palette.action.hover,
                  },
                }}
              >
                <TableCell>
                  <Box>
                    <Typography variant="body1" sx={{ fontWeight: "medium" }}>
                      {session.patientName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {session.patientEmail}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: "medium" }}>
                      {dateTime.date}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {dateTime.time}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {session.durationMin} min
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: "medium" }}>
                    {formatPrice(session.price)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={session.status}
                    size="small"
                    sx={{
                      ...getStatusColor(session.status),
                      fontWeight: "medium",
                      textTransform: "capitalize",
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Typography
                    variant="body2"
                    sx={{
                      maxWidth: 150,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {session.notes || "Sin notas"}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Box
                    sx={{ display: "flex", justifyContent: "center", gap: 1 }}
                  >
                    <Tooltip title="Editar sesión">
                      <IconButton
                        onClick={() => onEdit(session)}
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
                    <Tooltip title="Eliminar sesión">
                      <IconButton
                        onClick={() => onDelete(session._id || "")}
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
            );
          })}
          {data.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} align="center" sx={{ py: 6 }}>
                <EventIcon
                  sx={{ fontSize: 48, color: "text.secondary", mb: 2 }}
                />
                <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                  No hay sesiones programadas
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Agrega la primera sesión para comenzar
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

export default SessionTable;
