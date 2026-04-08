// MUI
import { Box, Button, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

// ICONOS
import {
  BugReport as BugReportIcon,
  Insights as InsightsIcon,
  Security as SecurityIcon,
  Speed as SpeedIcon,
} from "@mui/icons-material";

//  PALETA PROFESIONAL
const appColors = {
  background: "#0B1026",
  surface: "#121833",
  surfaceElevated: "#18204A",
  primary: "#8B5CF6",
  secondary: "#22D3EE",
  text: "#E6E9F5",
  muted: "rgba(230,233,245,0.65)",
  border: "rgba(139,92,246,0.18)",
};



// BOTÓN LIMPIO (SIN GLOW EXAGERADO)
const GlowButton = ({ children, fullWidth = false }) => (
  <Button
    fullWidth={fullWidth}
    variant="outlined"
    sx={{
      color: appColors.primary,
      border: `1px solid ${appColors.primary}`,
      borderRadius: "30px",
      px: 4,
      py: 1.2,
      textTransform: "none",
      fontWeight: 500,
      transition: "all 0.3s ease",

      "&:hover": {
        color: "#fff",
        background: "rgba(139,92,246,0.15)",
        borderColor: appColors.primary,
        boxShadow: "0 8px 25px rgba(139,92,246,0.25)",
      },
    }}
  >
    {children}
  </Button>
);

// 🧱 CARD MEJORADA
const CardBlock = ({ icon, title, children }) => (
  <Paper
    sx={{
      p: 4,
      borderRadius: 4,
      background: appColors.surface,
      border: `1px solid ${appColors.border}`,
      flex: "1 1 300px",
      transition: "all 0.35s ease",

      "&:hover": {
        background: appColors.surfaceElevated,
        transform: "translateY(-6px)",
        boxShadow: "0 12px 30px rgba(0,0,0,0.35)",
      },
    }}
  >
    <Box mb={2}>{icon}</Box>

    <Typography fontWeight="bold" color={appColors.text} mb={2}>
      {title}
    </Typography>

    <Typography color={appColors.muted} sx={{ fontSize: "0.95rem" }}>
      {children}
    </Typography>
  </Paper>
);

// LISTA
const ListItem = ({ children }) => (
  <Typography mb={1} color={appColors.muted}>
    • {children}
  </Typography>
);

export const Content = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        background: `
          radial-gradient(circle at 20% 20%, rgba(139,92,246,0.15), transparent 40%),
          radial-gradient(circle at 80% 0%, rgba(34,211,238,0.12), transparent 40%),
          ${appColors.background}
        `,
        minHeight: "100vh",
        pt: { xs: 8, md: 10 },
        px: { xs: 2, md: 6 },
        pb: { xs: 2, md: 6 },
        color: appColors.text,
      }}
    >
      {/* HERO SECTION */}
      <Box id="inicio" textAlign="center" mb={12}>
        <Typography variant="h3" fontWeight="bold" mb={3}>
          Registrar, clasificar y visualizar tus gastos diarios
        </Typography>

        <Typography color={appColors.muted} mb={6} sx={{ fontSize: "1.1rem" }}>
          Organiza tus finanzas de forma simple, clara y sin estrés
        </Typography>

        <Box display="flex" justifyContent="center" gap={2} flexWrap="wrap" mb={12}>
          <Button
            component="a"
            href="https://github.com/Vlacho-art/T4_React.git"
            target="_blank"
            rel="noopener noreferrer"
            variant="contained"
            sx={{
              background: appColors.primary,
              color: "#fff",
              borderRadius: "25px",
              px: 4,
              py: 1.2,
              textTransform: "none",
              fontWeight: 600,
              fontSize: "1rem",
              transition: "all 0.3s ease",
              "&:hover": {
                background: "rgba(139,92,246,0.8)",
                transform: "translateY(-2px)",
                boxShadow: "0 8px 25px rgba(139,92,246,0.4)",
              },
            }}
          >
            Ver repositorio GitHub
          </Button>
        </Box>

        {/* BENEFICIOS Y INFORMACIÓN SIDE BY SIDE */}
        <Box
          id="beneficios"
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 4,
            maxWidth: "1000px",
            mx: "auto",
            mb: 12,
          }}
        >
          {/* BENEFICIOS CARD - IZQUIERDA */}
          <Paper
            sx={{
              p: 4,
              borderRadius: 3,
              background: appColors.surface,
              border: `1px solid ${appColors.border}`,
              transition: "all 0.3s ease",
              "&:hover": {
                background: appColors.surfaceElevated,
                transform: "translateY(-4px)",
                boxShadow: "0 12px 30px rgba(139,92,246,0.2)",
              },
            }}
          >
            <Typography variant="h6" sx={{ color: appColors.text, fontWeight: 600, mb: 2 }}>
              Deja de perder el control de tu dinero
            </Typography>
            <Typography sx={{ color: appColors.muted, fontSize: "0.9rem", mb: 3 }}>
              Organiza tus finanzas de forma simple, clara y sin estrés
            </Typography>

            <Box sx={{ textAlign: "left" }}>
              <Typography sx={{ color: appColors.text, mb: 1.5 }}>
                ✓ Crea tu cuenta en segundos
              </Typography>
              <Typography sx={{ color: appColors.text, mb: 1.5 }}>
                ✓ Registra tus gastos sin complicaciones
              </Typography>
              <Typography sx={{ color: appColors.text, mb: 1.5 }}>
                ✓ Entiende en qué se va tu dinero y mejora
              </Typography>
            </Box>

            <Button
              fullWidth
              onClick={() => navigate('/login?view=register')}
              variant="contained"
              sx={{
                background: appColors.primary,
                color: "#fff",
                borderRadius: "8px",
                mt: 3,
                py: 1,
                textTransform: "none",
                fontWeight: 600,
                transition: "all 0.3s ease",
                "&:hover": {
                  background: "rgba(139,92,246,0.8)",
                  boxShadow: "0 6px 20px rgba(139,92,246,0.4)",
                  transform: "translateY(-2px)",
                },
              }}
            >
              Empieza gratis
            </Button>
          </Paper>

          {/* INFORMACIÓN CARD - DERECHA */}
          <Paper
            sx={{
              p: 4,
              borderRadius: 3,
              background: appColors.surface,
              border: `1px solid ${appColors.border}`,
              transition: "all 0.3s ease",
              "&:hover": {
                background: appColors.surfaceElevated,
                transform: "translateY(-4px)",
                boxShadow: "0 12px 30px rgba(139,92,246,0.2)",
              },
            }}
          >
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{ color: appColors.secondary, fontWeight: 600, mb: 2 }}>
                ¿Por qué elegir nuestra plataforma?
              </Typography>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Box sx={{ color: appColors.primary, fontSize: "1.5rem", minWidth: "30px", flexShrink: 0 }}>📊</Box>
                <Box>
                  <Typography sx={{ color: appColors.text, fontWeight: 600, mb: 0.5 }}>
                    Análisis en tiempo real
                  </Typography>
                  <Typography sx={{ color: appColors.muted, fontSize: "0.85rem" }}>
                    Visualiza tus finanzas al instante con dashboards interactivos y reportes automáticos.
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: "flex", gap: 2 }}>
                <Box sx={{ color: appColors.primary, fontSize: "1.5rem", minWidth: "30px", flexShrink: 0 }}>🔒</Box>
                <Box>
                  <Typography sx={{ color: appColors.text, fontWeight: 600, mb: 0.5 }}>
                    100% seguro y privado
                  </Typography>
                  <Typography sx={{ color: appColors.muted, fontSize: "0.85rem" }}>
                    Tus datos están protegidos con encriptación de nivel empresarial y certificaciones internacionales.
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: "flex", gap: 2 }}>
                <Box sx={{ color: appColors.secondary, fontSize: "1.5rem", minWidth: "30px", flexShrink: 0 }}>⚡</Box>
                <Box>
                  <Typography sx={{ color: appColors.text, fontWeight: 600, mb: 0.5 }}>
                    Ultra rápido y confiable
                  </Typography>
                  <Typography sx={{ color: appColors.muted, fontSize: "0.85rem" }}>
                    Procesamos miles de transacciones sin retrasos. Disponibilidad 99.9% garantizada.
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Box>

      {/* INTERFAZ SIMPLE Y CLARA SECTION */}
      <Box id="como-funciona" sx={{ mb: 12 }}>
        <Typography variant="h4" fontWeight="bold" textAlign="center" mb={1}>
          Interfaz simple y clara
        </Typography>
        <Typography color={appColors.muted} textAlign="center" mb={8} sx={{ fontSize: "1rem" }}>
          Disfruta la experiencia intuitiva que necesitas
        </Typography>

        {/* TARJETA ÚNICA CON INFORMACIÓN */}
        <Paper
          sx={{
            p: 4,
            borderRadius: 3,
            maxWidth: "900px",
            mx: "auto",
            mb: 8,
            background: appColors.surface,
            border: `1px solid ${appColors.border}`,
            transition: "all 0.3s ease",
            "&:hover": {
              background: appColors.surfaceElevated,
              transform: "translateY(-4px)",
              boxShadow: "0 12px 30px rgba(139,92,246,0.2)",
            },
          }}
        >
          <Typography variant="h6" sx={{ color: appColors.text, fontWeight: 600, mb: 3 }}>
            ¿Qué puedes hacer?
          </Typography>

          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 3, mb: 3 }}>
            <Box>
              <Typography sx={{ color: appColors.text, mb: 1.5, display: "flex", alignItems: "center", gap: 1 }}>
                <span style={{ color: appColors.secondary }}>✓</span> Registrar ingresos y gastos
              </Typography>
              <Typography sx={{ color: appColors.text, mb: 1.5, display: "flex", alignItems: "center", gap: 1 }}>
                <span style={{ color: appColors.secondary }}>✓</span> Presupuestos por categoría
              </Typography>
            </Box>
            <Box>
              <Typography sx={{ color: appColors.text, mb: 1.5, display: "flex", alignItems: "center", gap: 1 }}>
                <span style={{ color: appColors.secondary }}>✓</span> Reportes por mes y exportación
              </Typography>
              <Typography sx={{ color: appColors.text, mb: 1.5, display: "flex", alignItems: "center", gap: 1 }}>
                <span style={{ color: appColors.secondary }}>✓</span> Alertas cuando te acercas al límite
              </Typography>
            </Box>
          </Box>
        </Paper>

        {/* GRID DE CARACTERÍSTICAS */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" },
            gap: 3,
            maxWidth: "1100px",
            mx: "auto",
          }}
        >
          <Paper
            sx={{
              p: 3,
              borderRadius: 3,
              background: appColors.surface,
              border: `1px solid ${appColors.border}`,
              textAlign: "center",
              transition: "all 0.3s ease",
              "&:hover": {
                background: appColors.surfaceElevated,
                transform: "translateY(-4px)",
                boxShadow: "0 12px 30px rgba(139,92,246,0.2)",
              },
            }}
          >
            <InsightsIcon sx={{ fontSize: 40, color: appColors.primary, mb: 2 }} />
            <Typography sx={{ color: appColors.text, fontWeight: 600, mb: 1 }}>
              Reportes por mes
            </Typography>
            <Typography sx={{ color: appColors.muted, fontSize: "0.9rem" }}>
              Visualiza tus gastos por categoría y mes. Exporta a PDF / CSV en un clic.
            </Typography>
          </Paper>

          <Paper
            sx={{
              p: 3,
              borderRadius: 3,
              background: appColors.surface,
              border: `1px solid ${appColors.border}`,
              textAlign: "center",
              transition: "all 0.3s ease",
              "&:hover": {
                background: appColors.surfaceElevated,
                transform: "translateY(-4px)",
                boxShadow: "0 12px 30px rgba(139,92,246,0.2)",
              },
            }}
          >
            <SecurityIcon sx={{ fontSize: 40, color: appColors.secondary, mb: 2 }} />
            <Typography sx={{ color: appColors.text, fontWeight: 600, mb: 1 }}>
              Presupuestos y alertas
            </Typography>
            <Typography sx={{ color: appColors.muted, fontSize: "0.9rem" }}>
              Configura límites por categoría y recibe alertas cuando se acerca al límite.
            </Typography>
          </Paper>

          <Paper
            sx={{
              p: 3,
              borderRadius: 3,
              background: appColors.surface,
              border: `1px solid ${appColors.border}`,
              textAlign: "center",
              transition: "all 0.3s ease",
              "&:hover": {
                background: appColors.surfaceElevated,
                transform: "translateY(-4px)",
                boxShadow: "0 12px 30px rgba(139,92,246,0.2)",
              },
            }}
          >
            <BugReportIcon sx={{ fontSize: 40, color: appColors.primary, mb: 2 }} />
            <Typography sx={{ color: appColors.text, fontWeight: 600, mb: 1 }}>
              Categorías personalizadas
            </Typography>
            <Typography sx={{ color: appColors.muted, fontSize: "0.9rem" }}>
              Crea y edita tus categorías con tus propios colores para identificar rápido.
            </Typography>
          </Paper>

          <Paper
            sx={{
              p: 3,
              borderRadius: 3,
              background: appColors.surface,
              border: `1px solid ${appColors.border}`,
              textAlign: "center",
              transition: "all 0.3s ease",
              "&:hover": {
                background: appColors.surfaceElevated,
                transform: "translateY(-4px)",
                boxShadow: "0 12px 30px rgba(139,92,246,0.2)",
              },
            }}
          >
            <SpeedIcon sx={{ fontSize: 40, color: appColors.secondary, mb: 2 }} />
            <Typography sx={{ color: appColors.text, fontWeight: 600, mb: 1 }}>
              Sincronización y seguro
            </Typography>
            <Typography sx={{ color: appColors.muted, fontSize: "0.9rem" }}>
              Tus datos se guardan en la nube con autenticación y cifrado.
            </Typography>
          </Paper>

          <Paper
            sx={{
              p: 3,
              borderRadius: 3,
              background: appColors.surface,
              border: `1px solid ${appColors.border}`,
              textAlign: "center",
              transition: "all 0.3s ease",
              "&:hover": {
                background: appColors.surfaceElevated,
                transform: "translateY(-4px)",
                boxShadow: "0 12px 30px rgba(139,92,246,0.2)",
              },
            }}
          >
            <InsightsIcon sx={{ fontSize: 40, color: appColors.primary, mb: 2 }} />
            <Typography sx={{ color: appColors.text, fontWeight: 600, mb: 1 }}>
              Multiplataforma
            </Typography>
            <Typography sx={{ color: appColors.muted, fontSize: "0.9rem" }}>
              Funciona en Web y móvil. Sincroniza automáticamente entre dispositivos.
            </Typography>
          </Paper>

          <Paper
            sx={{
              p: 3,
              borderRadius: 3,
              background: appColors.surface,
              border: `1px solid ${appColors.border}`,
              textAlign: "center",
              transition: "all 0.3s ease",
              "&:hover": {
                background: appColors.surfaceElevated,
                transform: "translateY(-4px)",
                boxShadow: "0 12px 30px rgba(139,92,246,0.2)",
              },
            }}
          >
            <BugReportIcon sx={{ fontSize: 40, color: appColors.secondary, mb: 2 }} />
            <Typography sx={{ color: appColors.text, fontWeight: 600, mb: 1 }}>
              Análisis inteligente
            </Typography>
            <Typography sx={{ color: appColors.muted, fontSize: "0.9rem" }}>
              Tendencias, pronósticos y recomendaciones para mejorar tus finanzas.
            </Typography>
          </Paper>
        </Box>
      </Box>

      {/* PLANES */}
      <Box id="precios" textAlign="center" mt={14}>
        <Typography variant="h4" fontWeight="bold" mb={1}>
          Planes simples
        </Typography>

        <Typography color={appColors.muted} mb={6}>
          Elige el plan adecuado
        </Typography>

        <Box display="flex" flexWrap="wrap" justifyContent="center" gap={4}>
          {/* GRATIS */}
          <Paper
            sx={{
              p: 4,
              width: 280,
              borderRadius: 4,
              background: appColors.surface,
              border: `1px solid ${appColors.border}`,
              transition: "all 0.3s",

              "&:hover": {
                background: appColors.surfaceElevated,
                transform: "translateY(-6px)",
              },
            }}
          >
            <Typography fontWeight="bold">Gratis</Typography>
            <Typography variant="h4" my={2}>
              $0
            </Typography>

            <Typography color={appColors.muted}>200 registros</Typography>
            <Typography color={appColors.muted}>Funciones básicas</Typography>

            <Box mt={3}>
              <GlowButton fullWidth>Empezar</GlowButton>
            </Box>
          </Paper>

          {/* PRO DESTACADO */}
          <Paper
            sx={{
              p: 4,
              width: 300,
              borderRadius: 4,
              background: appColors.surfaceElevated,
              border: `2px solid ${appColors.primary}`,
              transform: "scale(1.05)",
              transition: "all 0.3s",

              "&:hover": {
                transform: "translateY(-8px) scale(1.06)",
                boxShadow: "0 20px 40px rgba(139,92,246,0.25)",
              },
            }}
          >
            <Typography fontWeight="bold">Pro</Typography>
            <Typography variant="h4" my={2}>
              $20K COP
            </Typography>

            <Typography color={appColors.muted}>Ilimitado</Typography>
            <Typography color={appColors.muted}>Reportes avanzados</Typography>

            <Box mt={3}>
              <GlowButton fullWidth>Elegir</GlowButton>
            </Box>
          </Paper>

          {/* EQUIPO */}
          <Paper
            sx={{
              p: 4,
              width: 280,
              borderRadius: 4,
              background: appColors.surface,
              border: `1px solid ${appColors.border}`,
              transition: "all 0.3s",

              "&:hover": {
                background: appColors.surfaceElevated,
                transform: "translateY(-6px)",
              },
            }}
          >
            <Typography fontWeight="bold">Equipo</Typography>
            <Typography variant="h4" my={2}>
              $50K COP
            </Typography>

            <Typography color={appColors.muted}>Hasta 10 usuarios</Typography>
            <Typography color={appColors.muted}>Soporte prioritario</Typography>

            <Box mt={3}>
              <GlowButton fullWidth>Contactar</GlowButton>
            </Box>
          </Paper>
        </Box>
      </Box>

    </Box>
  );
};