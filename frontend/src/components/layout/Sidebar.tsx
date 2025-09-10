// src/components/Layout/Sidebar.tsx
import { Box, List, ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Sidebar = () => {
  const { user } = useAuth();

  return (
    <Box
      component="aside"
      sx={{
        width: 120,
        bgcolor: "grey.100",
        p: 2,
        borderRight: 1,
        borderColor: "divider",
      }}
    >
      <nav>
        <List>
          {user?.role === "admin" && (
            <ListItem button component={Link} to="/admin/psychs">
              <ListItemText primary="Gestionar Psicólogos" />
            </ListItem>
          )}
          {user?.role === "psychologist" && (
            <ListItem button component={Link} to="/psychologist">
              <ListItemText primary="Vista Psicólogo" />
            </ListItem>
          )}
        </List>
      </nav>
    </Box>
  );
};

export default Sidebar;
