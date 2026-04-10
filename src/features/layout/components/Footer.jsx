import { Box, Toolbar, Typography } from '@mui/material'

export const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        background: 'linear-gradient(90deg, #6800d6, #4b8bfa)',
        color: '#E6E9F5',
        px: 2,
        elevation: 0,
      }}
    >
      <Toolbar sx={{ justifyContent: 'center' }}>
        <Typography variant="body2" sx={{ color: 'rgba(230, 233, 245, 0.8)' }}>
          © 2024 Spendora. Todos los derechos reservados.
        </Typography>
      </Toolbar>
    </Box>
  )
}
