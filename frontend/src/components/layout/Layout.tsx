// src/components/Layout/Layout.tsx
import { Box } from "@mui/material";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      minHeight="100vh"
      sx={{
        overflowX: "hidden", // evita scroll horizontal accidental
      }}
    >
      {/* Barra superior */}
      <Topbar />

      {/* Contenido principal */}
      <Box display="flex" flex={1}>
        <Sidebar />
        <Box
          component="main"
          flexGrow={1}
          p={2}
          sx={{
            overflowY: "auto",
          }}
        >
          {children}
        </Box>
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default Layout;
