import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import {
  createPsychologist,
  updatePsychologist,
} from "../../services/psychologistService";
import React, { useEffect, useState } from "react";
import type { Psychologist } from "../../types/psychologist";

interface Props {
  open: boolean;
  onClose: () => void;
  psychologist: Psychologist | null;
  reload: () => Promise<void>;
}

const initForm: Psychologist = {
  name: "",
  email: "",
  specialty: "",
  password: "",
  rut: "",
  phone: "",
  gender: "",
  address: "",
};

const PsychologistFormDialog: React.FC<Props> = ({
  open,
  onClose,
  psychologist,
  reload,
}) => {
  const [form, setForm] = useState(initForm);

  useEffect(() => {
    if (psychologist) {
      setForm({
        name: psychologist.name,
        email: psychologist.email,
        specialty: psychologist.specialty ?? "",
        password: psychologist.password ?? "",
        rut: psychologist.rut ?? "",
        phone: psychologist.phone ?? "",
        gender: psychologist.gender ?? "",
        address: psychologist.address ?? "",
      });
    } else {
      setForm(initForm);
    }
  }, [psychologist]);

  const handleSubmit = async () => {
    if (psychologist) {
      await updatePsychologist(psychologist._id || "", form);
    } else {
      await createPsychologist(form);
    }
    setForm(initForm);
    reload();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>{psychologist ? "Editar" : "Crear"} Psicólogo</DialogTitle>
      <form
        onSubmit={(e) => {
          e.preventDefault(); // evita recargar
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
            label="Especialidad"
            fullWidth
            value={form.specialty}
            onChange={(e) => setForm({ ...form, specialty: e.target.value })}
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

export default PsychologistFormDialog;
