import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// MUI
import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";

// ICONOS
import MenuIcon from "@mui/icons-material/Menu";

export const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem('token'));
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = ["Inicio", "Beneficios", "Cómo funciona", "Precios", "Apis"];

  //  MAPEO A SECCIONES
  const sectionMap = {
    Inicio: "inicio",
    Beneficios: "beneficios",
    "Cómo funciona": "como-funciona",
    Precios: "precios",
    Apis: "apis",
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    navigate('/');
  };

  useEffect(() => {
    const handleStorage = () => {
      setIsLoggedIn(!!localStorage.getItem('token'));
    };

    const handleTokenUpdated = () => {
      setIsLoggedIn(!!localStorage.getItem('token'));
    };

    window.addEventListener("storage", handleStorage);
    window.addEventListener("tokenUpdated", handleTokenUpdated);
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("tokenUpdated", handleTokenUpdated);
    };
  }, []);

  // SCROLL A SECCIÓN
  const handleScrollTo = (item) => {
    if (item === "Apis") {
      setOpen(false);
      navigate("/Api");
      return;
    }

    const scrollToSection = (section) => {
      const id = sectionMap[section];
      if (!id) return;
      const el = document.getElementById(id);
      if (!el) return;
      const offset = 80;
      const top = el.offsetTop - offset;
      window.scrollTo({ top, behavior: "smooth" });
    };

    if (item === "Inicio") {
      setOpen(false);
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => scrollToSection("Inicio"), 100);
      } else {
        scrollToSection("Inicio");
      }
      return;
    }

    if (location.pathname !== "/") {
      setOpen(false);
      navigate("/");
      setTimeout(() => {
        scrollToSection(item);
      }, 100);
      return;
    }

    const id = sectionMap[item];
    if (!id) return;

    const el = document.getElementById(id);
    if (!el) return;

    const offset = 80;
    const top = el.offsetTop - offset;

    window.scrollTo({
      top,
      behavior: "smooth",
    });

    setOpen(false);
  };

  // 🔥 SCROLL HEADER
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled((prev) => {
            const shouldBeScrolled = window.scrollY > 50;
            return prev !== shouldBeScrolled ? shouldBeScrolled : prev;
          });
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          px: 2,
          transition: "all 0.3s ease",
          background: scrolled
            ? "rgba(20, 20, 40, 0.7)"
            : "linear-gradient(90deg, #6800d6, #4b8bfa)",
          backdropFilter: scrolled ? "blur(10px)" : "none",
          boxShadow: scrolled ? "0 4px 20px rgba(0,0,0,0.3)" : "none",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* LOGO */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              cursor: "pointer",
              transition: "0.3s",
              "&:hover": { opacity: 0.8 },
            }}
            onClick={() => handleScrollTo("Inicio")}
          >
            Spendora
          </Typography>

          {/* MENÚ DESKTOP */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 3,
              alignItems: "center",
            }}
          >
            {menuItems.map((item) => (
              <Button
                key={item}
                disableRipple
                onClick={() => handleScrollTo(item)}
                sx={{
                  color: "#fff",
                  textTransform: "none",
                  position: "relative",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    width: 0,
                    height: "2px",
                    bottom: 0,
                    left: 0,
                    backgroundColor: "#fff",
                    transition: "0.3s",
                  },
                  "&:hover::after": {
                    width: "100%",
                  },
                }}
              >
                {item}
              </Button>
            ))}

            {isLoggedIn && (
              <Button
                disableRipple
                onClick={() => navigate('/errors')}
                sx={{
                  color: "#fff",
                  textTransform: "none",
                  position: "relative",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    width: 0,
                    height: "2px",
                    bottom: 0,
                    left: 0,
                    backgroundColor: "#fff",
                    transition: "0.3s",
                  },
                  "&:hover::after": {
                    width: "100%",
                  },
                }}
              >
                Errores
              </Button>
            )}

            <Button
              variant="contained"
              disableRipple
              onClick={isLoggedIn ? handleLogout : () => navigate('/login')}
              sx={{
                backgroundColor: "#9c6bff",
                borderRadius: "20px",
                textTransform: "none",
                px: 3,
                boxShadow: "0 4px 15px rgba(156,107,255,0.4)",
                "&:hover": {
                  backgroundColor: "#8a5cf6",
                },
              }}
            >
              {isLoggedIn ? 'Cerrar sesión' : 'Iniciar sesión'}
            </Button>
          </Box>

          {/* HAMBURGUESA */}
          <IconButton
            disableRipple
            sx={{ display: { xs: "block", md: "none" }, color: "#fff" }}
            onClick={() => setOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* DRAWER MOBILE */}
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            width: 250,
            height: "100%",
            background: "#0B1026",
            color: "#E6E9F5",
          }}
        >
          <List>
            {menuItems.map((item) => (
              <ListItem key={item} disablePadding>
                <ListItemButton
                  disableRipple
                  onClick={() => handleScrollTo(item)}
                >
                  <ListItemText
                    primary={item}
                    primaryTypographyProps={{
                      color: "#E6E9F5",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}

            {isLoggedIn && (
              <ListItem disablePadding>
                <ListItemButton
                  disableRipple
                  onClick={() => {
                    navigate('/errors');
                    setOpen(false);
                  }}
                >
                  <ListItemText
                    primary="Errores"
                    primaryTypographyProps={{
                      color: "#E6E9F5",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            )}

            <ListItem>
              <Button
                fullWidth
                variant="contained"
                disableRipple
                onClick={isLoggedIn ? handleLogout : () => navigate('/login')}
                sx={{
                  backgroundColor: "#9c6bff",
                  borderRadius: "20px",
                  textTransform: "none",
                }}
              >
                {isLoggedIn ? 'Cerrar sesión' : 'Iniciar sesión'}
              </Button>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};