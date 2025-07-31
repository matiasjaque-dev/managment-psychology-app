import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import type { Psychologist } from "../../types/psychologist";

interface Props {
  data: Psychologist[];
  onEdit: (psychologist: Psychologist) => void;
  reload: () => Promise<void>;
}

const PsychologistTable: React.FC<Props> = ({ data, onEdit }) => {
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
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default PsychologistTable;
