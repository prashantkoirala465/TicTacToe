import { initialState } from '.';

import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'utils/types/RootState';

import { themes } from '../themes';

export const selectTheme = createSelector(
    [(state: RootState) => state?.theme || initialState],
    theme => {
        return themes?.[theme.selected as keyof typeof themes] ?? themes.light;
    },
);

export const selectThemeKey = createSelector(
    [(state: RootState) => state.theme || initialState],
    theme => theme.selected,
);
