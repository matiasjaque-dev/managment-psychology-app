import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";

import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import type { Session, SessionFormData } from "../../types/Session";
import { createSession, updateSession } from "../../services/sessionService";
import { initSessionForm } from "../../constants/forms";

interface Props {
  open: boolean;
  onClose: () => void;
  session: Session | null;
  reload: () => Promise<void>;
}

const SessionFormDialog: React.FC<Props> = ({
  open,
  onClose,
  session,
  reload,
}) => {
  const [form, setForm] = useState<SessionFormData>(initSessionForm);

  const { user } = useAuth();

  useEffect(() => {
    if (session) {
      const psychologistId = typeof session.psychologistId === 'string' 
        ? session.psychologistId 
        : session.psychologistId._id;
      
      setForm({
        patientName: session.patientName,
        patientEmail: session.patientEmail,
        psychologistId: psychologistId,
        scheduledStart: session.scheduledStart,
        durationMin: session.durationMin ?? 50,
        price: session.price ?? 40000,
        status: session.status ?? "pendiente",
        notes: session.notes ?? "",
      });
    } else {
      setForm(initSessionForm);
    }
  }, [session]);

  const handleSubmit = async () => {
    const sessionData: Session = {
      patientName: form.patientName,
      patientEmail: form.patientEmail,
      psychologistId: form.psychologistId,
      scheduledStart: form.scheduledStart,
      durationMin: form.durationMin,
      price: form.price,
      status: form.status,
      notes: form.notes,
    };

    if (session) {
      await updateSession(session._id || "", sessionData, user?.token || "");
    } else {
      await createSession(sessionData, user?.token || "");
    }
    setForm(initSessionForm);
    reload();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>{session ? "Editar" : "Crear"} Sesión</DialogTitle>
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
            value={form.patientName}
            onChange={(e) => setForm({ ...form, patientName: e.target.value })}
            required
            focused
          />
          <TextField
            margin="dense"
            label="Email"
            fullWidth
            value={form.patientEmail}
            onChange={(e) => setForm({ ...form, patientEmail: e.target.value })}
            required
            focused
          />
          <TextField
            margin="dense"
            label="duración (min)"
            fullWidth
            value={form.durationMin}
            onChange={(e) =>
              setForm({ ...form, durationMin: Number(e.target.value) })
            }
          />
          <TextField
            margin="dense"
            label="Precio"
            fullWidth
            value={form.price}
            onChange={(e) =>
              setForm({ ...form, price: Number(e.target.value) })
            }
          />
          <TextField
            select
            margin="dense"
            label="Estado"
            fullWidth
            value={form.status}
            onChange={(e) =>
              setForm({
                ...form,
                status: e.target.value as
                  | "pendiente"
                  | "cancelada"
                  | "reagendada"
                  | "realizada",
              })
            }
          >
            <MenuItem value="pendiente">Pendiente</MenuItem>
            <MenuItem value="cancelada">Cancelada</MenuItem>
            <MenuItem value="reagendada">Reagendada</MenuItem>
            <MenuItem value="realizada">Realizada</MenuItem>
          </TextField>
          <TextField
            margin="dense"
            label="Motivo"
            fullWidth
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
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

export default SessionFormDialog;
