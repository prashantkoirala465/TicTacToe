// Import the type for ThemeKeyType from the slice.
import { ThemeKeyType } from './slice/types';

// Determine if the system prefers dark mode.
export const isSystemDark = window?.matchMedia
    ? window.matchMedia('(prefers-color-scheme: dark)')?.matches
    : undefined;

// Save the selected theme to local storage.
export function saveTheme(theme: ThemeKeyType) {
    window.localStorage && localStorage.setItem('selectedTheme', theme);
}

// Retrieve the theme from local storage.
export function getThemeFromStorage(): ThemeKeyType | null {
    return window.localStorage
        ? (localStorage.getItem('selectedTheme') as ThemeKeyType) || null
        : null;
}
