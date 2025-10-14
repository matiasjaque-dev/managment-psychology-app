// librerias
import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
// logica

// componentes
import { useAuth } from "../context/AuthContext.tsx";
import type { Session } from "../types/Session.ts";
import { deleteSession, getAllSessions } from "../services/sessionService.ts";
import SessionTable from "../components/psychologists/SessionTable.tsx";
import SessionFormDialog from "../components/psychologists/SessionForm.tsx";

const Psychologists = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [openForm, setOpenForm] = useState(false);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);

  const { user } = useAuth();

  console.log("User in Psychologists:", user);

  const loadSessions = async () => {
    const data = await getAllSessions(user?.token ?? "");
    console.log("All sessions fetched:", data);
    setSessions(
      data.filter((session: Session) => {
        console.log("Session psychologistId:", session.psychologistId);
        const psychologistId =
          typeof session.psychologistId === "string"
            ? session.psychologistId
            : session.psychologistId?._id;
        console.log("Derived psychologistId:", psychologistId);
        console.log("User ID:", user?.id);
        return session.isActive && psychologistId === user?.id;
      })
    );
  };

  console.log("Sessions loaded:", sessions);

  useEffect(() => {
    if (!user || !user.token) return;
    loadSessions();
  }, [user]);

  const handleCreate = () => {
    setSelectedSession(null);
    setOpenForm(true);
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Gestión de Sesiones de Pacientes
      </Typography>
      <Button variant="contained" color="primary" onClick={handleCreate}>
        Agregar Sesión
      </Button>
      <SessionTable
        data={sessions}
        onEdit={(session: Session) => {
          setSelectedSession(session);
          setOpenForm(true);
        }}
        onDelete={async (id: string) => {
          console.log("Delete session with id:", id);
          const resp = await deleteSession(id, user?.token || "");
          await loadSessions();
          console.log(resp);
          // Aquí deberías implementar la lógica para eliminar un psicólogo
        }}
        reload={loadSessions}
      />

      <SessionFormDialog
        open={openForm}
        onClose={() => setOpenForm(false)}
        session={selectedSession}
        reload={loadSessions}
      />
    </Box>
  );
};

export default Psychologists;
