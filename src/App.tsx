import { useMemo } from 'react';
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
  ToggleButton,
  ToggleButtonGroup,
  Grow,
} from '@mui/material';
import {
  Straighten as StraightenIcon,
  Info as InfoIcon,
  Brightness4 as DarkIcon,
  Brightness7 as LightIcon,
  Language as LanguageIcon,
  Man as ManIcon,
  Woman as WomanIcon,
  ChildCare as ChildIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { convert, Category } from './utils/converter';
import { useLocalStorage } from './hooks/useLocalStorage';

interface SizeStandard {
  id: string;
  label: string;
  value: number;
  color: string;
  step: number;
  labelSuffix: string;
}

function App() {
  const { t, i18n } = useTranslation();

  // Persist state
  const [euSize, setEuSize] = useLocalStorage<number>('euSize', 42);
  const [mode, setMode] = useLocalStorage<'light' | 'dark'>('theme', 'dark');
  const [category, setCategory] = useLocalStorage<Category>('category', 'men');

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
            default: mode === 'dark' ? '#0a0a0a' : '#f0f2f5',
            paper: mode === 'dark' ? '#1e1e1e' : '#ffffff',
          },
        },
        typography: {
          fontFamily: '"Outfit", "Roboto", sans-serif',
          h3: { fontWeight: 800 },
          h6: { fontWeight: 600 },
        },
        shape: { borderRadius: 24 },
        components: {
          MuiPaper: {
            styleOverrides: {
              root: {
                backgroundImage: 'none',
              },
            },
          },
          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: 'none',
                fontWeight: 600,
              },
            },
          },
        },
      }),
    [mode]
  );

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const toggleTheme = () => setMode(mode === 'light' ? 'dark' : 'light');

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'fi' : 'en';
    i18n.changeLanguage(newLang);
  };

  const handleCategoryChange = (
    _event: React.MouseEvent<HTMLElement>,
    newCategory: Category | null
  ) => {
    if (newCategory !== null) {
      setCategory(newCategory);
    }
  };

  // Safe wrapper for conversion
  const getConvertedValue = (to: string) => {
    return convert(euSize, 'eu', to, category);
  };

  const handleInputChange = (value: string, from: string) => {
    if (value === '' || value === null) return;
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue > 0) {
      // Convert input to EU first as base
      const euVal = convert(numValue, from, 'eu', category);
      setEuSize(Math.round(euVal * 100) / 100);
    }
  };

  const sizeData: SizeStandard[] = [
    {
      id: 'eu',
      label: t('standards.eu'),
      value: euSize,
      color: mode === 'dark' ? '#90caf9' : '#1976d2',
      step: 0.5,
      labelSuffix: '',
    },
    {
      id: 'us',
      label: t('standards.us'),
      value: getConvertedValue('us'),
      color: mode === 'dark' ? '#ce93d8' : '#9c27b0',
      step: 0.5,
      labelSuffix: '',
    },
    {
      id: 'uk',
      label: t('standards.uk'),
      value: getConvertedValue('uk'),
      color: mode === 'dark' ? '#a5d6a7' : '#2e7d32',
      step: 0.5,
      labelSuffix: '',
    },
    {
      id: 'cm',
      label: t('standards.cm'),
      value: getConvertedValue('cm'),
      color: mode === 'dark' ? '#ffcc80' : '#ed6c02',
      step: 0.1,
      labelSuffix: '',
    },
    {
      id: 'in',
      label: t('standards.in'),
      value: getConvertedValue('in'),
      color: mode === 'dark' ? '#ef9a9a' : '#d32f2f',
      step: 0.1,
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
              ? 'radial-gradient(circle at top right, #311b92 0%, #0a0a0a 60%)'
              : 'radial-gradient(circle at top right, #e3f2fd 0%, #f0f2f5 60%)',
          py: { xs: 4, md: 8 },
          px: 2,
          transition: 'background 0.5s ease',
          overflowX: 'hidden',
        }}
      >
        <Container maxWidth="md">
          <Grow in timeout={800}>
            <Paper
              elevation={24}
              sx={{
                p: { xs: 3, md: 6 },
                background: mode === 'dark' ? 'rgba(30,30,30,0.6)' : 'rgba(255,255,255,0.8)',
                backdropFilter: 'blur(20px)',
                border:
                  mode === 'dark'
                    ? '1px solid rgba(255,255,255,0.1)'
                    : '1px solid rgba(255,255,255,0.5)',
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
              }}
            >
              {/* Top Bar */}
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Stack direction="row" spacing={1} alignItems="center">
                  <StraightenIcon sx={{ fontSize: 32, color: 'primary.main' }} />
                  {!isMobile && (
                    <Typography
                      variant="h5"
                      fontWeight="800"
                      sx={{
                        background: '-webkit-linear-gradient(45deg, #90caf9, #f48fb1)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      ShoeSize
                    </Typography>
                  )}
                </Stack>

                <Stack direction="row" spacing={1}>
                  <Tooltip title={t('toggleTheme')}>
                    <IconButton onClick={toggleTheme}>
                      {mode === 'dark' ? <LightIcon /> : <DarkIcon />}
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Language">
                    <IconButton onClick={toggleLanguage}>
                      <LanguageIcon />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </Box>

              {/* Title Header */}
              <Box textAlign="center">
                <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
                  <Typography
                    variant={isMobile ? 'h4' : 'h2'}
                    gutterBottom
                    sx={{ fontWeight: 900, letterSpacing: '-0.02em' }}
                  >
                    {t('title')}
                  </Typography>
                  <Typography variant="h6" color="text.secondary" fontWeight="400">
                    {t('subtitle')}
                  </Typography>
                </motion.div>
              </Box>

              {/* Category Selector */}
              <Box display="flex" justifyContent="center">
                <ToggleButtonGroup
                  value={category}
                  exclusive
                  onChange={handleCategoryChange}
                  aria-label="size category"
                  size="large"
                  sx={{
                    background: mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                    borderRadius: 4,
                    p: 0.5,
                  }}
                >
                  <ToggleButton value="men" sx={{ borderRadius: 3, px: 3, py: 1.5 }}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <ManIcon /> <Typography fontWeight="600">{t('categories.men')}</Typography>
                    </Stack>
                  </ToggleButton>
                  <ToggleButton value="women" sx={{ borderRadius: 3, px: 3, py: 1.5 }}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <WomanIcon />{' '}
                      <Typography fontWeight="600">{t('categories.women')}</Typography>
                    </Stack>
                  </ToggleButton>
                  <ToggleButton value="kids" sx={{ borderRadius: 3, px: 3, py: 1.5 }}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <ChildIcon /> <Typography fontWeight="600">{t('categories.kids')}</Typography>
                    </Stack>
                  </ToggleButton>
                </ToggleButtonGroup>
              </Box>

              {/* Slider */}
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  borderRadius: 4,
                  background:
                    'linear-gradient(135deg, rgba(25, 118, 210, 0.1) 0%, rgba(220, 0, 78, 0.1) 100%)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                <Typography variant="h6" align="center" gutterBottom>
                  EU {t('standards.eu')}:{' '}
                  <span style={{ fontSize: '1.5em', fontWeight: 800 }}>{euSize}</span>
                </Typography>
                <Box px={{ xs: 1, md: 4 }}>
                  <Slider
                    value={euSize}
                    onChange={(_, v) => setEuSize(v as number)}
                    min={15}
                    max={50}
                    step={0.5}
                    valueLabelDisplay="auto"
                    sx={{
                      height: 12,
                      '& .MuiSlider-thumb': {
                        width: 32,
                        height: 32,
                        backgroundColor: '#fff',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                        '&:hover, &.Mui-focusVisible': {
                          boxShadow: '0 0 0 10px rgba(255, 255, 255, 0.2)',
                        },
                      },
                      '& .MuiSlider-track': { border: 'none' },
                      '& .MuiSlider-rail': { opacity: 0.3 },
                    }}
                  />
                </Box>
              </Paper>

              {/* Grid of Cards */}
              <Grid container spacing={2}>
                <AnimatePresence>
                  {sizeData.map((item, index) => (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={4}
                      key={item.id}
                      component={motion.div}
                      layout
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Card
                        elevation={0}
                        sx={{
                          height: '100%',
                          borderRadius: 4,
                          bgcolor: mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                          border: '1px solid transparent',
                          transition: 'all 0.2s',
                          '&:hover': {
                            bgcolor:
                              mode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
                            borderColor: item.color,
                            transform: 'translateY(-4px)',
                          },
                        }}
                      >
                        <CardContent>
                          <Typography
                            variant="subtitle2"
                            color="text.secondary"
                            fontWeight="700"
                            sx={{
                              color: item.color,
                              textTransform: 'uppercase',
                              letterSpacing: '0.1em',
                            }}
                            gutterBottom
                          >
                            {item.label}
                          </Typography>
                          <TextField
                            fullWidth
                            variant="standard"
                            value={item.value}
                            onChange={(e) => handleInputChange(e.target.value, item.id)}
                            InputProps={{
                              disableUnderline: true,
                              style: {
                                fontSize: '2rem',
                                fontWeight: 800,
                                color: mode === 'dark' ? '#fff' : '#000',
                              },
                            }}
                          />
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </AnimatePresence>
              </Grid>

              {/* Footer */}
              <Box textAlign="center" mt={2} color="text.secondary">
                <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
                  <InfoIcon fontSize="small" />
                  <Typography variant="body2">{t('footer')}</Typography>
                </Stack>
              </Box>
            </Paper>
          </Grow>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
