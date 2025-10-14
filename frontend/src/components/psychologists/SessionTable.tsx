import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import type { Session } from "../../types/Session";

interface Props {
  data: Session[];
  onEdit: (session: Session) => void;
  onDelete: (id: string) => void;
  reload: () => Promise<void>;
}

const SessionTable: React.FC<Props> = ({ data, onEdit, onDelete }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Nombre</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Fecha</TableCell>
          <TableCell>Duración</TableCell>
          <TableCell>Precio</TableCell>
          <TableCell>Estado</TableCell>
          <TableCell>Motivo</TableCell>
          <TableCell>Acciones</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((session) => (
          <TableRow key={session._id}>
            <TableCell>{session.patientName}</TableCell>
            <TableCell>{session.patientEmail}</TableCell>
            <TableCell>
              {new Date(session.scheduledStart).toLocaleString()}
            </TableCell>
            <TableCell>{session.durationMin}</TableCell>
            <TableCell>{session.price}</TableCell>
            <TableCell>{session.status}</TableCell>
            <TableCell>{session.notes}</TableCell>
            <TableCell>
              <IconButton onClick={() => onEdit(session)}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => onDelete(session._id || "")}>
                <DeleteIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default SessionTable;
