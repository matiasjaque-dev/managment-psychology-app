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
import type { Patient } from "../../types/Patient";

interface Props {
  data: Patient[];
  onEdit: (patient: Patient) => void;
  onDelete: (id: string) => void;
  reload: () => Promise<void>;
}

const PatientTable: React.FC<Props> = ({ data, onEdit, onDelete }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Nombre</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Acciones</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((patient) => (
          <TableRow key={patient._id}>
            <TableCell>{patient.name}</TableCell>
            <TableCell>{patient.email}</TableCell>
            <TableCell>
              <IconButton onClick={() => onEdit(patient)}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => onDelete(patient._id || "")}>
                <DeleteIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default PatientTable;
