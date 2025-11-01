import { useState } from 'react'
import { 
  Box, 
  Container, 
  Typography, 
  Paper, 
  Slider,
  TextField,
  Grid,
  Card,
  CardContent,
  ThemeProvider,
  createTheme,
  CssBaseline,
  useMediaQuery,
  Chip,
  Stack
} from '@mui/material'
import { 
  Straighten as StraightenIcon,
  Info as InfoIcon 
} from '@mui/icons-material'

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h3: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
})

function App() {
  const [euSize, setEuSize] = useState(42)
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  // Conversion formulas based on standard shoe size charts
  const euToUS = (eu) => Math.round((eu * 0.8125 - 25.625) * 10) / 10
  const euToUK = (eu) => Math.round((eu * 0.8125 - 26.125) * 10) / 10
  const euToCM = (eu) => Math.round(((eu / 1.5) - 1.5) * 10) / 10
  const euToInches = (eu) => {
    const cm = euToCM(eu)
    return Math.round((cm / 2.54) * 100) / 100
  }

  // Reverse conversions to EU
  const usToEU = (us) => Math.round(((parseFloat(us) + 25.625) / 0.8125) * 10) / 10
  const ukToEU = (uk) => Math.round(((parseFloat(uk) + 26.125) / 0.8125) * 10) / 10
  const cmToEU = (cm) => Math.round(((parseFloat(cm) + 1.5) * 1.5) * 10) / 10
  const inchesToEU = (inches) => {
    const cm = parseFloat(inches) * 2.54
    return cmToEU(cm)
  }

  const handleInputChange = (value, converter) => {
    if (value === '' || value === null) return
    const numValue = parseFloat(value)
    if (!isNaN(numValue) && numValue > 0) {
      setEuSize(converter(numValue))
    }
  }

  const sizeData = [
    { label: 'EU', value: euSize, converter: (val) => setEuSize(parseFloat(val) || 0), color: '#1976d2', step: 0.5, labelSuffix: 'Size' },
    { label: 'US', value: euToUS(euSize), converter: (val) => handleInputChange(val, usToEU), color: '#9c27b0', step: 0.5, labelSuffix: 'Size' },
    { label: 'UK', value: euToUK(euSize), converter: (val) => handleInputChange(val, ukToEU), color: '#2e7d32', step: 0.5, labelSuffix: 'Size' },
    { label: 'CM', value: euToCM(euSize), converter: (val) => handleInputChange(val, cmToEU), color: '#ed6c02', step: 0.1, labelSuffix: 'Size' },
    { label: 'Inches', value: euToInches(euSize), converter: (val) => handleInputChange(val, inchesToEU), color: '#d32f2f', step: 0.01, labelSuffix: '' },
  ]

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          py: { xs: 4, sm: 6, md: 8 },
          px: { xs: 2, sm: 3 },
        }}
      >
        <Container maxWidth="lg">
          <Paper
            elevation={8}
            sx={{
              p: { xs: 3, sm: 4, md: 6 },
              background: 'rgba(255, 255, 255, 0.98)',
              backdropFilter: 'blur(10px)',
            }}
          >
            {/* Header */}
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              spacing={2}
              sx={{ mb: 2 }}
            >
              <StraightenIcon sx={{ fontSize: { xs: 36, sm: 48 }, color: 'primary.main' }} />
              <Typography
                variant={isMobile ? 'h4' : 'h3'}
                component="h1"
                color="primary"
                align="center"
              >
                Shoe Size Converter
              </Typography>
            </Stack>

            <Typography
              variant="body1"
              color="text.secondary"
              align="center"
              sx={{ mb: 1 }}
            >
              Convert shoe sizes between different country standards
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
              <Chip label="Men's sizes" size="small" color="primary" variant="outlined" />
            </Box>

            {/* Slider Section */}
            <Paper
              elevation={2}
              sx={{
                p: { xs: 3, sm: 4 },
                mb: 4,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
              }}
            >
              <Typography variant="h6" gutterBottom align="center" sx={{ color: 'white' }}>
                Select EU Size: {euSize}
              </Typography>
              <Box sx={{ px: { xs: 1, sm: 2 } }}>
                <Slider
                  value={euSize}
                  onChange={(e, newValue) => setEuSize(newValue)}
                  min={35}
                  max={50}
                  step={0.5}
                  marks={[
                    { value: 35, label: '35' },
                    { value: 40, label: '40' },
                    { value: 45, label: '45' },
                    { value: 50, label: '50' },
                  ]}
                  valueLabelDisplay="auto"
                  sx={{
                    color: 'white',
                    '& .MuiSlider-markLabel': {
                      color: 'white',
                    },
                    '& .MuiSlider-thumb': {
                      width: 24,
                      height: 24,
                      backgroundColor: 'white',
                      '&:hover, &.Mui-focusVisible': {
                        boxShadow: '0 0 0 8px rgba(255, 255, 255, 0.16)',
                      },
                    },
                    '& .MuiSlider-track': {
                      height: 8,
                    },
                    '& .MuiSlider-rail': {
                      height: 8,
                      opacity: 0.5,
                      backgroundColor: 'rgba(255, 255, 255, 0.5)',
                    },
                  }}
                />
              </Box>
            </Paper>

            {/* Size Cards Grid */}
            <Grid container spacing={{ xs: 2, sm: 3 }}>
              {sizeData.map((size) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={size.label}>
                  <Card
                    elevation={4}
                    sx={{
                      height: '100%',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: 8,
                      },
                      background: `linear-gradient(135deg, ${size.color}20 0%, ${size.color}10 100%)`,
                      borderTop: `4px solid ${size.color}`,
                    }}
                  >
                    <CardContent>
                      <Typography
                        variant="h6"
                        component="div"
                        gutterBottom
                        sx={{ color: size.color, fontWeight: 700 }}
                      >
                        {size.label} {size.labelSuffix}
                      </Typography>
                      <TextField
                        type="number"
                        fullWidth
                        value={size.value}
                        onChange={(e) => size.converter(e.target.value)}
                        inputProps={{
                          step: size.step,
                          style: { fontSize: isMobile ? '1.5rem' : '2rem', fontWeight: 700 },
                        }}
                        variant="outlined"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: size.color,
                              borderWidth: 2,
                            },
                            '&:hover fieldset': {
                              borderColor: size.color,
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: size.color,
                            },
                          },
                        }}
                      />
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {/* Info Section */}
            <Paper
              elevation={2}
              sx={{
                mt: 4,
                p: { xs: 2, sm: 3 },
                backgroundColor: '#f5f5f5',
              }}
            >
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                <InfoIcon color="primary" />
                <Typography variant="h6" color="primary">
                  How to Use
                </Typography>
              </Stack>
              <Stack spacing={1}>
                <Typography variant="body2" color="text.secondary">
                  • Use the slider to quickly select your EU shoe size
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Or enter a size in any field to see instant conversions
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • All values update automatically in real-time
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Note: Conversions are approximate and may vary by manufacturer
                </Typography>
              </Stack>
            </Paper>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  )
}

export default App
