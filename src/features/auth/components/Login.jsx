import {
    Box,
    Button,
    IconButton,
    InputAdornment,
    TextField,
    Typography
} from '@mui/material';
import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from "../api/axios";

// ICONOS
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const appColors = {
  background: '#0B1026',
  surface: '#121833',
  surfaceSoft: '#192046',
  primary: '#8B5CF6',
  secondary: '#22D3EE',
  accent: '#E6E9F5',
  card: '#F8FBFF',
  border: 'rgba(139,92,246,0.18)',
  text: '#0F172A',
  textSoft: '#475569',
};

const gradients = {
  login: 'linear-gradient(135deg, #8B5CF6 0%, #4B8BFA 100%)',
  register: 'linear-gradient(135deg, #22D3EE 0%, #8B5CF6 100%)',
};

// 🔍 Función para detectar errores comunes en dominios
const detectEmailTypo = (email) => {
  if (!email.includes('@')) return null

  const [username, domain] = email.split('@')
  const commonDomains = {
    'gamil.com': 'gmail.com',
    'gmial.com': 'gmail.com',
    'gmai.com': 'gmail.com',
    'yahooo.com': 'yahoo.com',
    'yaho.com': 'yahoo.com',
    'hotmial.com': 'hotmail.com',
    'hotmail.co': 'hotmail.com',
    'outlok.com': 'outlook.com',
    'outlook.co': 'outlook.com',
    'outloo.com': 'outlook.com',
  }

  if (commonDomains[domain]) {
    return `${username}@${commonDomains[domain]}`
  }
  return null
}

export const Login = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const initialView = params.get('view') === 'register' ? 'register' : 'login';
  const [view, setView] = React.useState(initialView);

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        background: `
          radial-gradient(circle at 20% 20%, rgba(139,92,246,0.18), transparent 26%),
          radial-gradient(circle at 85% 5%, rgba(34,211,238,0.14), transparent 28%),
          ${appColors.background}`,
        pt: { xs: 12, md: 14 },
        pb: { xs: 6, md: 8 },
        px: { xs: 2, md: 4 },
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          maxWidth: '760px',
          minHeight: { xs: 'auto', md: '460px' },
          borderRadius: '28px',
          overflow: 'hidden',
          boxShadow: '0 24px 70px rgba(0,0,0,0.22)',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          background: 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,255,255,0.16)',
          backdropFilter: 'blur(18px)',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            width: 280,
            height: 280,
            borderRadius: '50%',
            bgcolor: 'rgba(139,92,246,0.18)',
            top: -100,
            left: -100,
            filter: 'blur(80px)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            width: 220,
            height: 220,
            borderRadius: '50%',
            bgcolor: 'rgba(34,211,238,0.12)',
            bottom: -90,
            right: -80,
            filter: 'blur(70px)',
          }}
        />

        <Box
          sx={{
            width: { xs: '100%', md: '42%' },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            p: { xs: 4, md: 5 },
            background: view === 'login' ? gradients.login : gradients.register,
            transition: 'background 0.45s ease',
            color: '#fff',
          }}
        >
          <Typography
            variant='h4'
            sx={{ fontWeight: 700, mb: 2, letterSpacing: '-0.02em' }}
          >
            {view === 'login' ? '¡Bienvenido!' : view === 'register' ? '¡Hola!' : 'Recuperar Acceso'}
          </Typography>
          <Typography sx={{ mb: 4, color: 'rgba(255,255,255,0.88)' }}>
            {view === 'login'
              ? 'Inicia sesión con tu cuenta y accede a todo el sistema.'
              : view === 'register'
              ? 'Crea tu cuenta y comienza a monitorear tus errores.'
              : 'Recupera el acceso a tu cuenta'}
          </Typography>

          <Button
            onClick={() => {
              if (view === 'forgot') setView('login');
              else setView(view === 'login' ? 'register' : 'login');
            }}
            sx={{
              ...panelBtn,
              background: 'rgba(255,255,255,0.18)',
              borderColor: 'rgba(255,255,255,0.35)',
              color: '#fff',
              '&:hover': {
                background: 'rgba(255,255,255,0.24)',
              },
            }}
          >
            {view === 'login' ? 'REGISTRARSE' : view === 'register' ? 'INICIAR SESIÓN' : 'VOLVER'}
          </Button>
        </Box>

        <Box
          sx={{
            width: { xs: '100%', md: '58%' },
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            p: { xs: 4, md: 5 },
            background: '#fff',
          }}
        >
          {view === 'login' ? (
            <LoginForm setView={setView} />
          ) : view === 'register' ? (
            <RegisterForm setView={setView} />
          ) : (
            <ForgotPasswordForm setView={setView} />
          )}
        </Box>
      </Box>
    </Box>
  )
}

//////////////////////////////////////////////////////
// 🔹 LOGIN FORM
//////////////////////////////////////////////////////

const LoginForm = ({ setView }) => {
  const navigate = useNavigate();
  const [form, setForm] = React.useState({
    email: '',
    password: '',
  })

  const [errors, setErrors] = React.useState({
    email: '',
    password: '',
  })

  const [showPassword, setShowPassword] = React.useState(false)

  const validateField = (name, value) => {
    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!value) return 'El email es obligatorio'
      
      // Verificar si hay errores de tipeo comunes
      const suggestion = detectEmailTypo(value)
      if (suggestion) {
        return `Email inválido. ¿Quisiste decir "${suggestion}"?`
      }
      
      if (!emailRegex.test(value)) {
        return 'Email inválido'
      }
      return ''
    }
    if (name === 'password') {
      if (!value) return 'La contraseña es obligatoria'
      if (value.length < 6) return 'Mínimo 6 caracteres'
      if (!/[^a-zA-Z0-9\s]+/.test(value)) return 'Debe contener al menos un carácter especial'
      return ''
    }
    return ''
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await api.post('/api/login', {
        email: form.email,
        password: form.password
      })
      const { token, user } = response.data
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
      // Dispatch custom event for Header to listen
      window.dispatchEvent(new Event('tokenUpdated'))
      // Redirect to ErrorGuard CRUD
      navigate('/errors')
    } catch (error) {
      alert('Error en login: ' + (error.response?.data?.message || error.message))
    }
  }

  const isValid =
    !errors.email &&
    !errors.password &&
    form.email.trim() !== '' &&
    form.password.trim() !== ''

  return (
    <Box
      component='form'
      onSubmit={handleSubmit}
      noValidate
      autoComplete='off'
      sx={{ width: '100%', maxWidth: { xs: '100%', sm: 360 }, mx: 'auto' }}
    >
      <Typography variant='h5' textAlign='center' mb={3} sx={{ fontWeight: 700, fontSize: { xs: '1.35rem', md: '1.5rem' } }}>
        Iniciar Sesión
      </Typography>

      <TextField
        name='email'
        label='Correo'
        fullWidth
        sx={inputStyle}
        value={form.email}
        onChange={handleChange}
        error={!!errors.email}
        helperText={errors.email}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <EmailIcon sx={{ color: appColors.textSoft }} />
            </InputAdornment>
          ),
        }}
      />

      <TextField
        name='password'
        label='Contraseña'
        type={showPassword ? 'text' : 'password'}
        autoComplete='off'
        fullWidth
        sx={{ ...inputStyle, mt: 2 }}
        value={form.password}
        onChange={handleChange}
        error={!!errors.password}
        helperText={errors.password}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <LockIcon sx={{ color: appColors.textSoft }} />
            </InputAdornment>
          ),
          endAdornment: (
            <IconButton onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          ),
        }}
      />

      <Box sx={{ mt: 1, mb: 2, textAlign: 'center' }}>
        <Button
          onClick={() => setView('forgot')}
          sx={{
            textTransform: 'none',
            color: appColors.primary,
            fontSize: '0.875rem',
            padding: 0,
            '&:hover': {
              background: 'transparent',
              textDecoration: 'underline',
            },
          }}
        >
          ¿Olvidé mi contraseña?
        </Button>
      </Box>

      <Button
        type='submit'
        fullWidth
        disabled={!isValid}
        sx={{
          mt: 3,
          height: '48px',
          borderRadius: '28px',
          background: gradients.login,
          color: '#fff',
          textTransform: 'none',
          boxShadow: '0 14px 30px rgba(139,92,246,0.18)',
          '&:hover': {
            background: 'linear-gradient(135deg, #7c3aed, #3f74ef)',
          },
        }}
      >
        INICIAR SESIÓN
      </Button>
    </Box>
  )
}

//////////////////////////////////////////////////////
// 🔹 REGISTER FORM
//////////////////////////////////////////////////////

const RegisterForm = ({ setView }) => {
  const [form, setForm] = React.useState({
    usuario: '',
    correo: '',
    password: '',
  })

  const [errors, setErrors] = React.useState({
    usuario: '',
    correo: '',
    password: { length: '', special: '' }
  })

  const [showPassword, setShowPassword] = React.useState(false)

  const validateUsuario = (value) => {
    if (!value) return 'El usuario es obligatorio'
    if (value.length < 3) return 'Mínimo 3 caracteres'
    return ''
  }

  const validateCorreo = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!value) return 'El correo es obligatorio'
    
    // Verificar si hay errores de tipeo comunes
    const suggestion = detectEmailTypo(value)
    if (suggestion) {
      return `Correo inválido. ¿Quisiste decir "${suggestion}"?`
    }
    
    if (!emailRegex.test(value)) {
      return 'Correo inválido'
    }
    return ''
  }

  const validatePassword = (value) => {
    const errs = { length: '', special: '' }
    if (!value) errs.length = 'La contraseña es obligatoria'
    else if (value.length < 6) errs.length = 'Mínimo 6 caracteres'
    if (value && !/[^a-zA-Z0-9\s]+/.test(value)) errs.special = 'Debe contener al menos un carácter especial'
    return errs
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))

    if (name === 'usuario') {
      setErrors(prev => ({ ...prev, usuario: validateUsuario(value) }))
      return
    }

    if (name === 'correo') {
      setErrors(prev => ({ ...prev, correo: validateCorreo(value) }))
      return
    }

    if (name === 'password') {
      const passErrors = validatePassword(value)
      setErrors(prev => ({ ...prev, password: passErrors }))
      return
    }
  }

  const isValid = !errors.usuario && !errors.correo && !errors.password.length && !errors.password.special && form.usuario && form.correo && form.password

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await api.post('/api/users', {
        username: form.usuario,
        email: form.correo,
        password: form.password
      })
      alert('Registro exitoso')
      setView('login')
    } catch (error) {
      alert('Error en registro: ' + (error.response?.data?.message || error.message))
    }
  }

  return (
    <Box
      component='form'
      onSubmit={handleSubmit}
      noValidate
      autoComplete='off'
      sx={{ width: '100%', maxWidth: { xs: '100%', sm: 360 }, mx: 'auto' }}
    >
      <Typography variant='h5' textAlign='center' mb={3} sx={{ fontWeight: 700, fontSize: { xs: '1.35rem', md: '1.5rem' } }}>
        Crear Cuenta
      </Typography>

      <TextField
        name='usuario'
        label='Usuario'
        fullWidth
        sx={inputStyle}
        onChange={handleChange}
        error={!!errors.usuario}
        helperText={errors.usuario}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <PersonIcon sx={{ color: appColors.textSoft }} />
            </InputAdornment>
          ),
        }}
      />

      <TextField
        name='correo'
        label='Correo'
        fullWidth
        sx={{ ...inputStyle, mt: 2 }}
        onChange={handleChange}
        error={!!errors.correo}
        helperText={errors.correo}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <EmailIcon sx={{ color: appColors.textSoft }} />
            </InputAdornment>
          ),
        }}
      />

      <TextField
        name='password'
        label='Contraseña'
        type={showPassword ? 'text' : 'password'}
        autoComplete='off'
        fullWidth
        sx={{ ...inputStyle, mt: 2 }}
        onChange={handleChange}
        error={!!(errors.password.length || errors.password.special)}
        helperText={errors.password.length || errors.password.special}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <LockIcon sx={{ color: appColors.textSoft }} />
            </InputAdornment>
          ),
          endAdornment: (
            <IconButton onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          ),
        }}
      />

      <Button
        type='submit'
        fullWidth
        disabled={!isValid}
        sx={{
          mt: 3,
          height: '48px',
          borderRadius: '28px',
          background: gradients.register,
          color: '#fff',
          textTransform: 'none',
          boxShadow: '0 14px 30px rgba(34,211,238,0.18)',
          '&:hover': {
            background: 'linear-gradient(135deg, #0ea5e9, #7c3aed)',
          },
        }}
      >
        REGISTRAR
      </Button>
    </Box>
  )
}

//////////////////////////////////////////////////////
// 🔹 FORGOT PASSWORD FORM
//////////////////////////////////////////////////////

const ForgotPasswordForm = () => {
  const [email, setEmail] = React.useState('')
  const [emailError, setEmailError] = React.useState('')


  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!value) return 'El email es obligatorio'
    
    const suggestion = detectEmailTypo(value)
    if (suggestion) {
      return `Email inválido. ¿Quisiste decir "${suggestion}"?`
    }
    
    if (!emailRegex.test(value)) {
      return 'Email inválido'
    }
    return ''
  }

  const handleChange = (e) => {
    const value = e.target.value
    setEmail(value)
    setEmailError(validateEmail(value))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const error = validateEmail(email)
    if (error) {
      setEmailError(error)
      return
    }
  }

  const isValid = email.trim() !== '' && !emailError

  return (
    <Box
      component='form'
      onSubmit={handleSubmit}
      noValidate
      autoComplete='off'
      sx={{ width: '100%', maxWidth: { xs: '100%', sm: 360 }, mx: 'auto' }}
    >
      <Typography variant='h5' textAlign='center' mb={3} sx={{ fontWeight: 700, fontSize: { xs: '1.35rem', md: '1.5rem' } }}>
        Recuperar Contraseña
      </Typography>

      <Typography sx={{ color: appColors.textSoft, fontSize: '0.9rem', mb: 3, textAlign: 'center' }}>
        Ingresa tu email de registro y te enviaremos un enlace para recuperar tu contraseña
      </Typography>

      <TextField
        name='email'
        label='Correo'
        fullWidth
        sx={inputStyle}
        value={email}
        onChange={handleChange}
        error={!!emailError}
        helperText={emailError}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <EmailIcon sx={{ color: appColors.textSoft }} />
            </InputAdornment>
          ),
        }}
      />

      <Button
        type='submit'
        fullWidth
        disabled={!isValid}
        sx={{
          mt: 4,
          height: '48px',
          borderRadius: '28px',
          background: gradients.login,
          color: '#fff',
          textTransform: 'none',
          boxShadow: '0 14px 30px rgba(139,92,246,0.18)',
          '&:hover': {
            background: 'linear-gradient(135deg, #7c3aed, #3f74ef)',
          },
          '&:disabled': {
            opacity: 0.6,
          },
        }}
      >
        ENVIAR ENLACE
      </Button>
    </Box>
  )
}

//////////////////////////////////////////////////////
// 🎨 ESTILOS
//////////////////////////////////////////////////////

const panelBtn = {
  mt: 3,
  border: '1px solid rgba(255,255,255,0.28)',
  color: 'white',
  borderRadius: '28px',
  px: 5,
  py: 1.2,
  textTransform: 'none',
};

const inputStyle = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '16px',
    background: '#fff',
    boxShadow: '0 12px 30px rgba(15,23,42,0.06)',
  },
  '& .MuiInputLabel-root': {
    color: appColors.textSoft,
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgba(15,23,42,0.12)',
  },
  '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgba(139,92,246,0.35)',
  },
  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#8B5CF6',
    boxShadow: '0 0 0 4px rgba(139,92,246,0.08)',
  },
};