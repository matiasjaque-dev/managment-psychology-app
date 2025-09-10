// src/components/Layout/Footer.tsx
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "grey.100",
        py: 2,
        textAlign: "center",
        borderTop: 1,
        borderColor: "divider",
      }}
    >
      <Typography variant="body2" color="text.secondary">
        © {new Date().getFullYear()} Mi Proyecto — Todos los derechos reservados
      </Typography>
    </Box>
  );
};

export default Footer;
