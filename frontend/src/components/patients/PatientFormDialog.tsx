import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
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

  const { user } = useAuth();

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
    if (patient) {
      await updatePatient(patient._id || "", form, user?.token || "");
    } else {
      await createPatient(form, user?.token || "");
    }
    setForm(initPatientForm);
    reload();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>{patient ? "Editar" : "Crear"} Paciente</DialogTitle>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <DialogContent>
          <TextField
            margin="dense"
            label="Nombre"
            fullWidth
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            focused
          />
          <TextField
            margin="dense"
            label="Email"
            fullWidth
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            focused
          />
          <TextField
            margin="dense"
            label="contraseña"
            type="password"
            fullWidth
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <TextField
            margin="dense"
            label="RUT"
            fullWidth
            value={form.rut}
            onChange={(e) => setForm({ ...form, rut: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Celular"
            fullWidth
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Género"
            fullWidth
            value={form.gender}
            onChange={(e) => setForm({ ...form, gender: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Dirección"
            fullWidth
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button type="submit" variant="contained">
            Guardar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default PatientFormDialog;
