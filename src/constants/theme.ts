export const colors = {
  background: '#FFFFFF',
  cellFilled: '#F1F5F9',
  cellEmpty: '#F8FAFC',
  cellBorder: '#E2E8F0',
  xMark: '#6366F1',
  xBackground: '#EEF2FF',
  oMark: '#EF4444',
  oBackground: '#FEF2F2',
  textPrimary: '#1E293B',
  textSecondary: '#94A3B8',
  scoreBar: '#F8FAFC',
  brandGradientStart: '#6366F1',
  brandGradientEnd: '#818CF8',
  separator: '#E2E8F0',
  modeCardBg: '#F8FAFC',
  modeCardBorder: '#F1F5F9',
  localIconBg: '#FEE2E2',
  localIconBgStart: '#FEF2F2',
  aiIconBg: '#E0E7FF',
  aiIconBgStart: '#EEF2FF',
  onlineIconBg: '#DCFCE7',
  onlineIconBgStart: '#F0FDF4',
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
    fontSize: 32,
    fontWeight: '800' as const,
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
    fontWeight: '600' as const,
    letterSpacing: 1.5,
    textTransform: 'uppercase' as const,
  },
  small: {
    fontSize: 12,
    fontWeight: '400' as const,
  },
} as const;

export const radii = {
  cell: 16,
  card: 16,
  icon: 14,
  badge: 12,
  scoreBar: 14,
  appIcon: 20,
} as const;
