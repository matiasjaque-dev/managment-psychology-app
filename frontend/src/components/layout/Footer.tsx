// src/components/Layout/Footer.tsx
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Copyright } from "@mui/icons-material";

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      component="footer"
      sx={{
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        py: { xs: 1.5, sm: 2 },
        px: { xs: 2, sm: 3 },
        textAlign: 'center',
        borderTop: '1px solid rgba(102, 126, 234, 0.1)',
        backdropFilter: 'blur(10px)',
        mt: 'auto',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: { xs: 0.5, sm: 1 },
        }}
      >
        <Copyright 
          sx={{ 
            fontSize: { xs: '1rem', sm: '1.1rem' },
            color: 'text.secondary',
            opacity: 0.7
          }} 
        />
        <Typography 
          variant={isMobile ? "caption" : "body2"} 
          color="text.secondary"
          sx={{
            fontWeight: 500,
            opacity: 0.8,
            fontSize: { xs: '0.75rem', sm: '0.875rem' },
          }}
        >
          {isMobile ? (
            <>
              {new Date().getFullYear()} Gestión Psicológica
              <br />
              Todos los derechos reservados
            </>
          ) : (
            `© ${new Date().getFullYear()} Gestión Psicológica — Todos los derechos reservados`
          )}
        </Typography>
      </Box>
      
      {/* Indicador adicional para mobile */}
      {isMobile && (
        <Typography 
          variant="caption" 
          color="text.secondary"
          sx={{
            mt: 0.5,
            opacity: 0.6,
            fontSize: '0.7rem',
          }}
        >
          Desarrollado con ❤️
        </Typography>
      )}
    </Box>
  );
};

export default Footer;
