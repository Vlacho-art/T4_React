import { Delete, Edit } from "@mui/icons-material";
import {
    Alert,
    Box,
    Button,
    Divider,
    IconButton,
    Paper,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import { useEffect, useState } from "react";
import api from "../../api/axios";

export const ErrorGuard = () => {
  const STORAGE_KEY = "error-guard-logs";
  const [form, setForm] = useState({
    codigo: "",
    mensaje: "",
    modulo: "",
    stack_trace: "",
    metadata: {
      ip: "",
      user_agent: ""
    }
  });

  const [logs, setLogs] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [requestError, setRequestError] = useState("");
  const [formErrors, setFormErrors] = useState({
    codigo: "",
    mensaje: "",
    modulo: "",
    stack_trace: "",
    ip: "",
    user_agent: ""
  });

  const API = "/errors";

  const extractLogs = (payload) => {
    if (Array.isArray(payload)) return payload;
    if (Array.isArray(payload?.logs)) return payload.logs;
    if (Array.isArray(payload?.data)) return payload.data;
    if (Array.isArray(payload?.errors)) return payload.errors;
    return [];
  };

  const extractLog = (payload) => {
    if (!payload || Array.isArray(payload)) return null;
    if (payload.log && typeof payload.log === "object") return payload.log;
    if (payload.data && !Array.isArray(payload.data) && typeof payload.data === "object") return payload.data;
    if (payload.error && typeof payload.error === "object") return payload.error;
    if (payload._id || payload.id) return payload;
    return null;
  };

  // CARGAR DATOS
  const getLogs = async ({ preserveExisting = false } = {}) => {
    try {
      const res = await api.get(API);
      const nextLogs = extractLogs(res.data);
      setLogs((prev) => {
        const resolvedLogs = preserveExisting && nextLogs.length === 0 ? prev : nextLogs;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(resolvedLogs));
        return resolvedLogs;
      });
      setRequestError("");
    } catch (error) {
      console.log(error);
      if (!preserveExisting) {
        const cachedLogs = localStorage.getItem(STORAGE_KEY);
        setLogs(cachedLogs ? JSON.parse(cachedLogs) : []);
      }
      setRequestError(error.response?.data?.message || error.message || "No se pudieron cargar los logs");
    }
  };

  useEffect(() => {
    const cachedLogs = localStorage.getItem(STORAGE_KEY);
    if (cachedLogs) {
      setLogs(JSON.parse(cachedLogs));
    }

    const fetchLogs = async () => {
      await getLogs();
    };

    fetchLogs();
  }, []);


  // INPUTS
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "ip" || name === "user_agent") {
      setForm({
        ...form,
        metadata: {
          ...form.metadata,
          [name]: value
        }
      });
      setFormErrors((prev) => ({ ...prev, [name]: value ? "" : `El ${name} es obligatorio` }));
      return;
    }

    setForm({
      ...form,
      [name]: value
    });
    setFormErrors((prev) => ({ ...prev, [name]: value ? "" : `El ${name} es obligatorio` }));
  };

  const validateForm = () => {
    const errors = {
      codigo: form.codigo.trim() ? "" : "El código es obligatorio",
      mensaje: form.mensaje.trim() ? "" : "El mensaje es obligatorio",
      modulo: form.modulo.trim() ? "" : "El módulo es obligatorio",
      stack_trace: form.stack_trace.trim() ? "" : "El stack trace es obligatorio",
      ip: form.metadata.ip.trim() ? "" : "La IP es obligatoria",
      user_agent: form.metadata.user_agent.trim() ? "" : "El user agent es obligatorio"
    };

    setFormErrors(errors);
    return Object.values(errors).every((value) => !value);
  };

  // 🔹 CREAR / EDITAR
  const handleSubmit = async () => {
    if (!validateForm()) return;
    try {
      if (editingId) {
        const res = await api.put(`${API}/${editingId}`, form);
        const updatedLog = extractLog(res.data);

        if (updatedLog) {
          setLogs((prev) => {
            const nextLogs = prev.map((log) => (log._id === editingId || log.id === editingId ? updatedLog : log));
            localStorage.setItem(STORAGE_KEY, JSON.stringify(nextLogs));
            return nextLogs;
          });
        }
      } else {
        const res = await api.post(API, form);
        const createdLog = extractLog(res.data);

        if (createdLog) {
          setLogs((prev) => {
            const nextLogs = [createdLog, ...prev];
            localStorage.setItem(STORAGE_KEY, JSON.stringify(nextLogs));
            return nextLogs;
          });
        }
      }

      await getLogs({ preserveExisting: true });
      resetForm();
      setRequestError("");
    } catch (error) {
      console.log(error);
      setRequestError(error.response?.data?.message || error.message || "No se pudo guardar el log");
    }
  };

  // EDITAR
  const handleEdit = (log) => {
    setForm({
      codigo: log.codigo,
      mensaje: log.mensaje,
      modulo: log.modulo,
      stack_trace: log.stack_trace,
      metadata: {
        ip: log.metadata?.ip || "",
        user_agent: log.metadata?.user_agent || ""
      }
    });

    setFormErrors({
      codigo: "",
      mensaje: "",
      modulo: "",
      stack_trace: "",
      ip: "",
      user_agent: ""
    });
    setEditingId(log._id);
  };

  // ELIMINAR
  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar este log?")) return;

    try {
      await api.delete(`${API}/${id}`);
      setLogs((prev) => {
        const nextLogs = prev.filter((log) => log._id !== id && log.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(nextLogs));
        return nextLogs;
      });
      await getLogs();
    } catch (error) {
      console.log(error);
    }
  };

  // RESET
  const resetForm = () => {
    setForm({
      codigo: "",
      mensaje: "",
      modulo: "",
      stack_trace: "",
      metadata: {
        ip: "",
        user_agent: ""
      }
    });
    setFormErrors({
      codigo: "",
      mensaje: "",
      modulo: "",
      stack_trace: "",
      ip: "",
      user_agent: ""
    });
    setEditingId(null);
  };

  // FILTRO
  const filteredLogs = logs.filter(log =>
    log.mensaje?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.codigo?.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.modulo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.metadata?.ip?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.metadata?.user_agent?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // COLORES
  const getLogColor = (modulo) => {
    const colors = {
      auth: "#4caf50",
      layout: "#2196f3",
      shared: "#ff9800",
      default: "#f44336"
    };
    return colors[modulo] || colors.default;
  };

  return (
    <Box sx={{ p: 3, pt: 12, backgroundImage: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)", minHeight: "100vh", color: "#fff" }}>
      
      {/* HEADER */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5">Auditoría de Errores</Typography>
        <Typography variant="body2" color="gray">
          Registro y monitoreo de fallos del sistema
        </Typography>
      </Box>

      <Stack direction="row" spacing={3} alignItems="flex-start">

        {/* FORMULARIO */}
        <Paper sx={{ p: 3, flex: 2, bgcolor: "#1e293b" }}>
          <Typography variant="h6" mb={2}>
            {editingId ? "Editar Error" : "Registrar Error"}
          </Typography>

          <Stack spacing={2}>
            <Stack direction="row" spacing={2}>
              <TextField
                label="Código"
                name="codigo"
                value={form.codigo}
                onChange={handleChange}
              error={!!formErrors.codigo}
              helperText={formErrors.codigo}
              fullWidth
              size="small"
              sx={{ bgcolor: "#fff", borderRadius: 1 }}
            />

              <TextField
                label="Módulo"
                name="modulo"
                value={form.modulo}
                onChange={handleChange}
                error={!!formErrors.modulo}
                helperText={formErrors.modulo}
                fullWidth
                size="small"
                sx={{ bgcolor: "#fff", borderRadius: 1 }}
              />
            </Stack>

            <TextField
              label="Mensaje"
              name="mensaje"
              value={form.mensaje}
              onChange={handleChange}
              error={!!formErrors.mensaje}
              helperText={formErrors.mensaje}
              fullWidth
              size="small"
              sx={{ bgcolor: "#fff", borderRadius: 1 }}
            />

            <TextField
              label="Stack Trace"
              name="stack_trace"
              value={form.stack_trace}
              onChange={handleChange}
              error={!!formErrors.stack_trace}
              helperText={formErrors.stack_trace}
              multiline
              rows={3}
              fullWidth
              size="small"
              sx={{ bgcolor: "#fff", borderRadius: 1 }}
            />

            <Stack direction="row" spacing={2}>
              <TextField
                label="IP"
                name="ip"
                value={form.metadata.ip}
                onChange={handleChange}
                error={!!formErrors.ip}
                helperText={formErrors.ip}
                fullWidth
                size="small"
                sx={{ bgcolor: "#fff", borderRadius: 1 }}
              />

              <TextField
                label="User Agent"
                name="user_agent"
                value={form.metadata.user_agent}
                onChange={handleChange}
                error={!!formErrors.user_agent}
                helperText={formErrors.user_agent}
                fullWidth
                size="small"
                sx={{ bgcolor: "#fff", borderRadius: 1 }}
              />
            </Stack>

            <Button
              variant="contained"
              color="success"
              onClick={handleSubmit}
            >
              {editingId ? "Actualizar Log" : "Guardar Log"}
            </Button>
          </Stack>
        </Paper>

        {/* RESUMEN */}
        <Paper sx={{ p: 3, flex: 1, bgcolor: "#1e293b" }}>
          <Typography variant="h6">Resumen</Typography>
          <Divider sx={{ my: 2, bgcolor: "gray" }} />

          <Typography>Total errores: {logs.length}</Typography>

          <Typography mt={2} color="gray">
            Último registro:
          </Typography>

          {logs[0] ? (
            <Box mt={1}>
              <Typography variant="body2">
                {logs[0].mensaje}
              </Typography>
              <Typography variant="caption" color="gray">
                {new Date(logs[0].fecha).toLocaleString()}
              </Typography>
            </Box>
          ) : (
            <Typography color="gray">Sin registros</Typography>
          )}
        </Paper>
      </Stack>

      {/* LISTA */}
      <Paper sx={{ mt: 3, p: 2, bgcolor: "#1e293b" }}>
        <Typography variant="h6" mb={2}>
          Logs registrados
        </Typography>

        {requestError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {requestError}
          </Alert>
        )}

        <TextField
          label="Buscar logs"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth
          size="small"
          sx={{ mb: 2, bgcolor: "#fff", borderRadius: 1 }}
        />

        <Stack spacing={1}>
          {filteredLogs.length === 0 && (
            <Typography color="gray">
              No hay resultados
            </Typography>
          )}

          {filteredLogs.map((log) => (
            <Box
              key={log._id}
              sx={{
                p: 2,
                bgcolor: getLogColor(log.modulo),
                borderRadius: 2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                color: "#fff"
              }}
            >
              <Box>
                <Typography variant="body2">
                  <strong>{log.codigo}</strong> - {log.mensaje}
                </Typography>
                <Typography variant="caption" color="gray">
                  {log.modulo} | {new Date(log.fecha).toLocaleString()}
                </Typography>
              </Box>

              <Box>
                <IconButton
                  color="primary"
                  onClick={() => handleEdit(log)}
                  size="small"
                >
                  <Edit />
                </IconButton>

                <IconButton
                  color="error"
                  onClick={() => handleDelete(log._id)}
                  size="small"
                >
                  <Delete />
                </IconButton>
              </Box>
            </Box>
          ))}
        </Stack>
      </Paper>
    </Box>
  );
};
