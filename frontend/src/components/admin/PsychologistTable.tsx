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
import type { Psychologist } from "../../types/psychologist";

interface Props {
  data: Psychologist[];
  onEdit: (psychologist: Psychologist) => void;
  onDelete: (id: string) => void;
  reload: () => Promise<void>;
}

const PsychologistTable: React.FC<Props> = ({ data, onEdit, onDelete }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Nombre</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Especialidad</TableCell>
          <TableCell>Acciones</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((psych) => (
          <TableRow key={psych._id}>
            <TableCell>{psych.name}</TableCell>
            <TableCell>{psych.email}</TableCell>
            <TableCell>{psych.specialty}</TableCell>
            <TableCell>
              <IconButton onClick={() => onEdit(psych)}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => onDelete(psych._id || "")}>
                <DeleteIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default PsychologistTable;
