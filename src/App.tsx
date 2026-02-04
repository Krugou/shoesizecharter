import { useState, useMemo } from 'react';
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
  Stack,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Straighten as StraightenIcon,
  Info as InfoIcon,
  Brightness4 as DarkIcon,
  Brightness7 as LightIcon,
  Language as LanguageIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

/**
 * Interface representing a shoe size conversion standard
 */
interface SizeStandard {
  label: string;
  value: number;
  converter: (val: string) => void;
  color: string;
  step: number;
  labelSuffix: string;
}

/**
 * Main Application Component
 * Handles the state and rendering of the shoe size converter
 * @returns The rendered application
 */
function App() {
  const { t, i18n } = useTranslation();
  const [euSize, setEuSize] = useState<number>(42);
  const [mode, setMode] = useState<'light' | 'dark'>('dark');

  /**
   * Theme configuration based on current mode
   */
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: mode === 'dark' ? '#90caf9' : '#1976d2',
          },
          secondary: {
            main: mode === 'dark' ? '#f48fb1' : '#dc004e',
          },
          background: {
            default: mode === 'dark' ? '#121212' : '#f5f5f5',
            paper: mode === 'dark' ? '#1e1e1e' : '#ffffff',
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
          borderRadius: 16,
        },
        components: {
          MuiPaper: {
            styleOverrides: {
              root: {
                backgroundImage: 'none',
              },
            },
          },
        },
      }),
    [mode]
  );

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  /**
   * Toggles between light and dark theme modes
   */
  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  /**
   * Toggles language between English and Finnish
   */
  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'fi' : 'en';
    i18n.changeLanguage(newLang);
  };

  /**
   * Converts EU size to US size
   * @param {number} eu - EU size
   * @returns {number} US size
   */
  const euToUS = (eu: number): number => Math.round((eu * 0.8125 - 25.625) * 10) / 10;

  /**
   * Converts EU size to UK size
   * @param {number} eu - EU size
   * @returns {number} UK size
   */
  const euToUK = (eu: number): number => Math.round((eu * 0.8125 - 26.125) * 10) / 10;

  /**
   * Converts EU size to Centimeters
   * @param {number} eu - EU size
   * @returns {number} CM size
   */
  const euToCM = (eu: number): number => Math.round((eu / 1.5 - 1.5) * 10) / 10;

  /**
   * Converts EU size to Inches
   * @param {number} eu - EU size
   * @returns {number} Inches size
   */
  const euToInches = (eu: number): number => {
    const cm = euToCM(eu);
    return Math.round((cm / 2.54) * 100) / 100;
  };

  // Reverse conversions to EU

  /**
   * Converts US size to EU size
   * @param {string} us - US size
   * @returns {number} EU size
   */
  const usToEU = (us: string): number => Math.round(((parseFloat(us) + 25.625) / 0.8125) * 10) / 10;

  /**
   * Converts UK size to EU size
   * @param {string} uk - UK size
   * @returns {number} EU size
   */
  const ukToEU = (uk: string): number => Math.round(((parseFloat(uk) + 26.125) / 0.8125) * 10) / 10;

  /**
   * Converts CM size to EU size
   * @param {string} cm - CM size
   * @returns {number} EU size
   */
  const cmToEU = (cm: string): number => Math.round((parseFloat(cm) + 1.5) * 1.5 * 10) / 10;

  /**
   * Converts Inches size to EU size
   * @param {string} inches - Inches size
   * @returns {number} EU size
   */
  const inchesToEU = (inches: string): number => {
    const cm = parseFloat(inches) * 2.54;
    return cmToEU(cm.toString());
  };

  /**
   * Handles input changes for any size field
   * @param {string} value - The input value
   * @param {(val: string) => number} converter - The conversion function to EU size
   */
  const handleInputChange = (value: string, converter: (val: string) => number) => {
    if (value === '' || value === null) return;
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue > 0) {
      setEuSize(converter(value));
    }
  };

  const sizeData: SizeStandard[] = [
    {
      label: t('standards.eu'),
      value: euSize,
      converter: (val: string) => setEuSize(parseFloat(val) || 0),
      color: mode === 'dark' ? '#90caf9' : '#1976d2',
      step: 0.5,
      labelSuffix: '',
    },
    {
      label: t('standards.us'),
      value: euToUS(euSize),
      converter: (val: string) => handleInputChange(val, usToEU),
      color: mode === 'dark' ? '#ce93d8' : '#9c27b0',
      step: 0.5,
      labelSuffix: '',
    },
    {
      label: t('standards.uk'),
      value: euToUK(euSize),
      converter: (val: string) => handleInputChange(val, ukToEU),
      color: mode === 'dark' ? '#a5d6a7' : '#2e7d32',
      step: 0.5,
      labelSuffix: '',
    },
    {
      label: t('standards.cm'),
      value: euToCM(euSize),
      converter: (val: string) => handleInputChange(val, cmToEU),
      color: mode === 'dark' ? '#ffcc80' : '#ed6c02',
      step: 0.1,
      labelSuffix: '',
    },
    {
      label: t('standards.in'),
      value: euToInches(euSize),
      converter: (val: string) => handleInputChange(val, inchesToEU),
      color: mode === 'dark' ? '#ef9a9a' : '#d32f2f',
      step: 0.01,
      labelSuffix: '',
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          background:
            mode === 'dark'
              ? 'linear-gradient(135deg, #1a237e 0%, #311b92 100%)'
              : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          py: { xs: 4, sm: 6, md: 8 },
          px: { xs: 2, sm: 3 },
          transition: 'background 0.5s ease',
        }}
      >
        <Container maxWidth="lg">
          <Paper
            elevation={12}
            sx={{
              p: { xs: 3, sm: 4, md: 6 },
              background: mode === 'dark' ? 'rgba(30, 30, 30, 0.95)' : 'rgba(255, 255, 255, 0.98)',
              backdropFilter: 'blur(20px)',
              borderRadius: 4,
            }}
          >
            {/* Header */}
            <Box sx={{ position: 'relative', mb: 4 }}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                spacing={2}
                sx={{ mb: 1 }}
              >
                <StraightenIcon sx={{ fontSize: { xs: 36, sm: 48 }, color: 'primary.main' }} />
                <Typography
                  variant={isMobile ? 'h4' : 'h3'}
                  component="h1"
                  color="primary"
                  align="center"
                  sx={{ textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
                >
                  {t('title')}
                </Typography>
              </Stack>
              <Box sx={{ position: 'absolute', right: 0, top: 0, display: 'flex', gap: 1 }}>
                <Tooltip title={t('toggleTheme')}>
                  <IconButton onClick={toggleTheme} color="default">
                    {mode === 'dark' ? <LightIcon /> : <DarkIcon />}
                  </IconButton>
                </Tooltip>
                <Tooltip title="Switch Language">
                  <IconButton onClick={toggleLanguage} color="primary">
                    <LanguageIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>

            <Typography
              variant="h6"
              color="text.secondary"
              align="center"
              sx={{ mb: 4, fontWeight: 400 }}
            >
              {t('subtitle')}
            </Typography>

            {/* Slider Section */}
            <Paper
              elevation={4}
              sx={{
                p: { xs: 3, sm: 4 },
                mb: 6,
                background:
                  mode === 'dark'
                    ? 'linear-gradient(135deg, #283593 0%, #4527a0 100%)'
                    : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                borderRadius: 3,
              }}
            >
              <Typography variant="h6" gutterBottom align="center" sx={{ color: 'white', mb: 3 }}>
                {t('standards.eu')}: {euSize}
              </Typography>
              <Box sx={{ px: { xs: 1, sm: 3 } }}>
                <Slider
                  value={euSize}
                  onChange={(_, newValue) => setEuSize(newValue as number)}
                  min={35}
                  max={50}
                  step={0.5}
                  marks={[
                    { value: 35, label: '35' },
                    { value: 40, label: '40' },
                    { value: 45, label: '45' },
                    { value: 50, label: '50' },
                  ]}
                  valueLabelDisplay="on"
                  sx={{
                    color: 'white',
                    height: 8,
                    '& .MuiSlider-markLabel': {
                      color: 'rgba(255,255,255,0.8)',
                      fontSize: '1rem',
                    },
                    '& .MuiSlider-thumb': {
                      width: 28,
                      height: 28,
                      backgroundColor: 'white',
                      border: '4px solid rgba(255,255,255,0.2)',
                      '&:hover, &.Mui-focusVisible': {
                        boxShadow: '0 0 0 8px rgba(255, 255, 255, 0.16)',
                      },
                    },
                    '& .MuiSlider-rail': {
                      opacity: 0.3,
                      backgroundColor: 'white',
                    },
                    '& .MuiSlider-valueLabel': {
                      backgroundColor: 'rgba(0,0,0,0.6)',
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
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: 12,
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: size.color,
                        },
                      },
                      background:
                        mode === 'dark'
                          ? `linear-gradient(135deg, ${size.color}15 0%, ${size.color}05 100%)`
                          : `linear-gradient(135deg, ${size.color}10 0%, ${size.color}05 100%)`,
                      borderTop: `4px solid ${size.color}`,
                    }}
                  >
                    <CardContent>
                      <Typography
                        variant="subtitle1"
                        component="div"
                        gutterBottom
                        sx={{ color: size.color, fontWeight: 700, mb: 2 }}
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
                          style: {
                            fontSize: isMobile ? '1.5rem' : '2rem',
                            fontWeight: 700,
                            padding: '12px',
                          },
                        }}
                        variant="outlined"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            backgroundColor:
                              mode === 'dark' ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.8)',
                            '& fieldset': {
                              borderColor: `${size.color}40`,
                              borderWidth: 2,
                              transition: 'border-color 0.3s',
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
              elevation={0}
              variant="outlined"
              sx={{
                mt: 6,
                p: { xs: 2, sm: 3 },
                backgroundColor: mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
                borderColor: mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
              }}
            >
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                <InfoIcon color="primary" />
                <Typography variant="h6" color="primary">
                  {t('footer')}
                </Typography>
              </Stack>
            </Paper>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
