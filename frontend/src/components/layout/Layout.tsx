// src/components/Layout/Layout.tsx
import { Box } from "@mui/material";
import Footer from "./Footer";
import Topbar from "./Topbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      minHeight="100vh"
      sx={{
        overflowX: "hidden",
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Barra superior */}
      <Topbar />

      {/* Contenido principal */}
      <Box 
        display="flex" 
        flex={1}
        sx={{
          minHeight: 0, // Permite que el contenido se encoja si es necesario
        }}
      >
        <Box
          component="main"
          flexGrow={1}
          sx={{
            p: { xs: 1, sm: 2, md: 3 },
            overflowY: "auto",
            overflowX: "hidden",
            // Mejora la experiencia de scroll en mobile
            WebkitOverflowScrolling: 'touch',
            // Asegura que el contenido no se salga en mobile
            maxWidth: '100vw',
            // Mejor espaciado para diferentes tamaños
            '& > *': {
              maxWidth: '100%',
              overflowX: 'auto',
            },
          }}
        >
          {/* Wrapper adicional para mejor control en mobile */}
          <Box
            sx={{
              maxWidth: { xs: '100%', lg: '1200px' },
              mx: 'auto',
              width: '100%',
            }}
          >
            {children}
          </Box>
        </Box>
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default Layout;
