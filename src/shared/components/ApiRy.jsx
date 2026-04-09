import {
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    Tab,
    Tabs,
    TextField,
    Typography
} from "@mui/material";
import { useEffect, useState } from "react";
import api from "../../features/auth/api/axios";

export const ApiRyc = () => {
  const [characters, setCharacters] = useState([]);
  const [pages, setPages] = useState(1);
  const [info, setInfo] = useState({});
  const [activeTab, setActiveTab] = useState("apiryc");
  const [searchTerm, setSearchTerm] = useState("");
  const [nombre, setNombre] = useState("");
  const [imagen, setImagen] = useState("");
  const [imagenFile, setImagenFile] = useState(null);
  const [estado, setEstado] = useState("");
  const [especie, setEspecie] = useState("");
  const [personajesCreados, setPersonajesCreados] = useState([]);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({
    nombre: "",
    imagen: "",
    estado: "",
    especie: ""
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character?page=${pages}`)
      .then((res) => res.json())
      .then((data) => {
        setCharacters(data.results || []);
        setInfo(data.info || {});
      })
      .catch((err) => console.error(err));
  }, [pages]);

  useEffect(() => {
    const loadLocalCharacters = async () => {
      try {
        const res = await api.get('/');
        setPersonajesCreados(res.data);
      } catch (err) {
        console.error('Error loading local characters:', err);
      }
    };
    loadLocalCharacters();
  }, []);

  const filteredCharacters = characters.filter((char) =>
    char.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const validarImagen = (data) => {
    if (!data) {
      setErrors((prev) => ({ ...prev, imagen: "La imagen es obligatoria." }));
      return false;
    }
    setErrors((prev) => ({ ...prev, imagen: "" }));
    return true;
  };

  const handleImageUpload = (file) => {
    if (!file) {
      setImagen("");
      setImagenFile(null);
      setErrors((prev) => ({ ...prev, imagen: "La imagen es obligatoria." }));
      return;
    }

    // Validar por extensión y MIME type
    const validExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp'];
    const fileName = file.name.toLowerCase();
    const extension = fileName.split('.').pop();
    const isValidExtension = validExtensions.includes(extension);
    const isValidMimetype = file.type.startsWith("image/");

    if (!isValidExtension && !isValidMimetype) {
      setErrors((prev) => ({ ...prev, imagen: "Selecciona un archivo de imagen válido (PNG, JPG, GIF, WEBP, BMP)." }));
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, imagen: "La imagen no puede pesar más de 5 MB." }));
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImagen(reader.result);
      setImagenFile(file);
      setErrors((prev) => ({ ...prev, imagen: "" }));
    };
    reader.onerror = () => {
      setErrors((prev) => ({ ...prev, imagen: "No se pudo leer la imagen. Intenta otro archivo." }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <Box
      sx={{
        mt: "50px", // evita que el header tape
        backgroundColor: "#0B1026",
        minHeight: "100vh",
        p: 3,
        color: "#E6E9F5"
      }}
    >
      {/* BARRA SUPERIOR */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
          mb: 3
        }}
      >
        {/* TABS */}
        <Tabs
          value={activeTab}
          onChange={(e, v) => setActiveTab(v)}
          textColor="inherit"
          indicatorColor="secondary"
        >
          <Tab value="apiryc" label="ApiRyc" sx={{ color: "#ffffff" }} />
          <Tab value="crear" label="Crear Apis" sx={{ color: "#ffffff" }} />
        </Tabs>

        {/* 🔍 BUSCADOR */}
        {activeTab === "apiryc" && (
          <TextField
            id="busqueda-personaje"
            name="buscarPersonaje"
            label="Buscar personaje"
            placeholder="Buscar personaje..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              width: { xs: "100%", sm: "280px" },
              input: { color: "#ffffff" },
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#6800d6",
                borderRadius: "10px"
              }
            }}
          />
        )}
      </Box>

      {/* ================= API ================= */}
      <Box hidden={activeTab !== "apiryc"}>
        {/* PAGINACIÓN */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 2,
            mb: 4
          }}
        >
          <Button
            variant="contained"
            color="warning"
            disabled={!info.prev}
            onClick={() => setPages((p) => p - 1)}
          >
            Anterior
          </Button>

          <Typography sx={{ fontWeight: "bold" }}>
            Página {pages} de {info.pages || 0}
          </Typography>

          <Button
            variant="contained"
            color="warning"
            disabled={!info.next}
            onClick={() => setPages((p) => p + 1)}
          >
            Siguiente
          </Button>
        </Box>

        {/* CARDS */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 3,
            justifyContent: "center"
          }}
        >
          {filteredCharacters.map((char) => (
            <Card
              key={char.id}
              sx={{
                width: {
                  xs: "100%",
                  sm: "45%",
                  md: "30%",
                  lg: "22%"
                },
                backgroundColor: "#121833",
                borderRadius: "15px",
                boxShadow: "0 10px 20px rgba(0,0,0,0.35)",
                border: "1px solid rgba(139,92,246,0.25)",
                transition: "0.3s",
                "&:hover": {
                  transform: "translateY(-5px)"
                }
              }}
            >
              <CardMedia
                component="img"
                image={char.image}
                alt={char.name}
                sx={{ height: 250 }}
              />

              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  {char.name}
                </Typography>

                <Typography sx={{ color: "#a5adcc" }}>
                  {char.status} - {char.species}
                </Typography>

                <Typography sx={{ color: "#22D3EE", mt: 1 }}>
                  Location:
                </Typography>

                <Typography>{char.location.name}</Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>

      {/* ================= CREAR API ================= */}
      <Box hidden={activeTab !== "crear"}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Crear Personaje
        </Typography>

        <TextField
          id="nombre-personaje"
          name="nombre"
          fullWidth
          variant="filled"
          label="Nombre del Personaje"
          value={nombre}
          onChange={(e) => {
            setNombre(e.target.value);
            setErrors((prev) => ({ ...prev, nombre: e.target.value ? "" : "El nombre es obligatorio." }));
          }}
          error={Boolean(errors.nombre)}
          helperText={errors.nombre}
          sx={{
            mb: 2,
            backgroundColor: '#101838',
            borderRadius: '10px',
            '& .MuiFilledInput-root': { color: '#E6E9F5' },
            '& .MuiInputLabel-root': { color: '#AAB6E2' }
          }}
        />

        <Box sx={{ mb: 2 }}>
          <input
            id="imagen-personaje"
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={(e) => {
              const file = e.target.files?.[0];
              handleImageUpload(file);
            }}
          />
          <label htmlFor="imagen-personaje">
            <Button component="span" variant="contained" sx={{ mb: 1 }}>
              Seleccionar imagen
            </Button>
          </label>
          <Typography sx={{ color: '#AAB6E2', fontSize: '0.95rem', mt: 0.5 }}>
            {imagenFile ? imagenFile.name : 'Sube una imagen del personaje (PNG, JPG, WebP - máximo 5 MB)'}
          </Typography>
          {errors.imagen && (
            <Typography sx={{ color: '#F87171', mt: 1, fontWeight: 'bold' }}>
              {errors.imagen}
            </Typography>
          )}
        </Box>

        {imagen && (
          <Box
            sx={{
              mb: 2,
              borderRadius: '10px',
              overflow: 'hidden',
              border: '2px solid rgba(139,92,246,0.35)',
              height: 220,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#0B1026'
            }}
          >
            <img
              src={imagen}
              alt="Vista previa"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </Box>
        )}

        {error && (
          <Typography sx={{ color: '#F87171', mb: 2, fontWeight: 'bold' }}>
            {error}
          </Typography>
        )}

        {errors.imagen && !error && (
          <Typography sx={{ color: '#F87171', mb: 2, fontWeight: 'bold' }}>
            {errors.imagen}
          </Typography>
        )}

        <FormControl fullWidth sx={{ mb: 2 }} variant="filled" error={Boolean(errors.estado)}>
          <InputLabel sx={{ color: '#AAB6E2' }} id="estado-label">Estado</InputLabel>
          <Select
            id="estado-select"
            name="estado"
            labelId="estado-label"
            label="Estado"
            value={estado}
            onChange={(e) => {
              setEstado(e.target.value);
              setErrors((prev) => ({ ...prev, estado: e.target.value ? "" : "Selecciona un estado." }));
            }}
            error={Boolean(errors.estado)}
            aria-labelledby="estado-label"
            sx={{
              backgroundColor: '#101838',
              color: '#E6E9F5',
              borderRadius: '10px'
            }}
          >
            <MenuItem value="" disabled>Selecciona el estado</MenuItem>
            <MenuItem value="Alive">Alive</MenuItem>
            <MenuItem value="Dead">Dead</MenuItem>
            <MenuItem value="Unknown">Unknown</MenuItem>
          </Select>
          {errors.estado && (
            <FormHelperText sx={{ color: '#F87171', ml: 0 }}>{errors.estado}</FormHelperText>
          )}
        </FormControl>

        <FormControl fullWidth sx={{ mb: 2 }} variant="filled" error={Boolean(errors.especie)}>
          <InputLabel sx={{ color: '#AAB6E2' }} id="especie-label">Especie</InputLabel>
          <Select
            id="especie-select"
            name="especie"
            labelId="especie-label"
            label="Especie"
            value={especie}
            onChange={(e) => {
              setEspecie(e.target.value);
              setErrors((prev) => ({ ...prev, especie: e.target.value ? "" : "Selecciona una especie." }));
            }}
            aria-labelledby="especie-label"
            sx={{
              backgroundColor: '#101838',
              color: '#E6E9F5',
              borderRadius: '10px'
            }}
          >
            <MenuItem value="" disabled>Selecciona la especie</MenuItem>
            <MenuItem value="Human">Human</MenuItem>
            <MenuItem value="Alien">Alien</MenuItem>
            <MenuItem value="Robot">Robot</MenuItem>
            <MenuItem value="Mythological Creature">Mythological Creature</MenuItem>
            <MenuItem value="Animal">Animal</MenuItem>
            <MenuItem value="Disease">Disease</MenuItem>
            <MenuItem value="Unknown">Unknown</MenuItem>
          </Select>
          {errors.especie && (
            <FormHelperText sx={{ color: '#F87171', ml: 0 }}>{errors.especie}</FormHelperText>
          )}
        </FormControl>

        <Button
          variant="contained"
          onClick={async () => {
            const newErrors = {
              nombre: nombre.trim() ? "" : "El nombre es obligatorio.",
              imagen: validarImagen(imagen) ? "" : "La imagen es obligatoria.",
              estado: estado ? "" : "Selecciona un estado.",
              especie: especie ? "" : "Selecciona una especie."
            };

            if (Object.values(newErrors).some((err) => err)) {
              setErrors(newErrors);
              setError("Completa correctamente los campos antes de continuar.");
              return;
            }

            setError("");

            const nuevoPersonaje = {
              name: nombre,
              image: imagen,
              status: estado,
              species: especie
            };

            try {
              if (editingId) {
                // Update
                await api.put(`/${editingId}`, nuevoPersonaje);
              } else {
                // Create
                await api.post('/', nuevoPersonaje);
              }
              // Reload
              const res = await api.get('/');
              setPersonajesCreados(res.data);
              setEditingId(null);
            } catch (err) {
              console.error('Error saving character:', err);
              setError('Error al guardar el personaje.');
            }

            setNombre("");
            setImagen("");
            setImagenFile(null);
            setEstado("");
            setEspecie("");
            setErrors({ nombre: "", imagen: "", estado: "", especie: "" });
          }}
        >
          {editingId ? 'Actualizar Personaje' : 'Agregar Personaje'}
        </Button>

        {/* LISTA */}
        <Box
          mt={3}
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, minmax(0, 1fr))',
              md: 'repeat(3, minmax(0, 1fr))'
            },
            gap: 2
          }}
        >
          {personajesCreados.map((personaje, i) => (
            <Card
              key={i}
              sx={{
                backgroundColor: '#0E132B',
                border: '1px solid rgba(139,92,246,0.35)',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 12px 24px rgba(0,0,0,0.35)',
                transition: 'transform 0.2s ease',
                '&:hover': { transform: 'translateY(-4px)' },
                width: '100%',
                maxWidth: 320
              }}
            >
              <CardMedia
                component='img'
                image={personaje.image}
                alt={personaje.name}
                sx={{ height: 180, objectFit: 'cover' }}
              />
              <CardContent sx={{ p: 2 }}>
                <Typography variant='h6' fontWeight='bold' sx={{ mb: 0.5 }}>
                  {personaje.name}
                </Typography>
                <Typography sx={{ color: '#A5ADCC', mb: 1 }}>
                  {personaje.status} - {personaje.species}
                </Typography>
                <Typography sx={{ color: '#22D3EE' }}>
                  Location:
                </Typography>
                <Typography sx={{ color: '#E6E9F5', mb: 2 }}>
                  Personalizado
                </Typography>

                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    size='small'
                    variant='outlined'
                    color='info'
                    onClick={() => {
                      setNombre(personaje.name);
                      setImagen(personaje.image);                      setImagenFile(null);                      setEstado(personaje.status);
                      setEspecie(personaje.species);
                      setEditingId(personaje._id);
                      setError('');
                    }}
                  >
                    Editar
                  </Button>
                  <Button
                    size='small'
                    variant='outlined'
                    color='error'
                    onClick={async () => {
                      try {
                        await api.delete(`/${personaje._id}`);
                        const res = await api.get('/');
                        setPersonajesCreados(res.data);
                      } catch (err) {
                        console.error('Error deleting character:', err);
                      }
                    }}
                  >
                    Eliminar
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
};