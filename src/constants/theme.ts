export const colors = {
  // Backgrounds
  bgDark: '#000000',
  bgPurple: '#3A278C',
  bgCard: 'rgba(58, 39, 140, 0.4)',
  bgCardBorder: 'rgba(171, 172, 185, 0.3)',
  bgCell: 'rgba(58, 39, 140, 0.35)',
  bgCellBorder: '#ABACB9',

  // Marks
  xPrimary: '#F78E1E',
  xSecondary: '#F5BD4F',
  oPrimary: '#458BBC',
  oSecondary: '#278C86',

  // Actions
  buttonPrimary: '#F78E1E',
  buttonSecondary: '#458BBC',

  // Text
  textWhite: '#FEFDFB',
  textGray: '#ABACB9',
  textDark: '#080206',
  textPurple: '#3A278C',

  // Accents
  accentPurple: '#CDAAEE',
  accentPurpleLight: '#E1DFFA',
  success: '#B1D94D',
  error: '#BA4300',

  // Gradient arrays for LinearGradient
  bgGradient: ['#3A278C', '#1a1055', '#000000'] as const,
  xGradient: ['#F78E1E', '#F5BD4F'] as const,
  oGradient: ['#458BBC', '#278C86'] as const,
  logoGradient: ['#ffdfff', '#ff9ed8', '#d88aff', '#9a90fc', '#7b8bff', '#5c6adb', '#4a47b8', '#3425a2'] as const,
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
} as const;

export const typography = {
  mark: {
    fontSize: 36,
    fontWeight: '800' as const,
  },
  heading: {
    fontSize: 34,
    fontWeight: '900' as const,
  },
  title: {
    fontSize: 22,
    fontWeight: '700' as const,
  },
  body: {
    fontSize: 17,
    fontWeight: '700' as const,
  },
  caption: {
    fontSize: 13,
    fontWeight: '500' as const,
  },
  label: {
    fontSize: 11,
    fontWeight: '700' as const,
    letterSpacing: 2.4,
    textTransform: 'uppercase' as const,
  },
  small: {
    fontSize: 12,
    fontWeight: '400' as const,
  },
} as const;

export const radii = {
  cell: 8,
  card: 16,
  icon: 14,
  badge: 8,
  scoreBar: 14,
  appIcon: 20,
} as const;
