import { initialState } from '.';

import { createSelector } from '@reduxjs/toolkit';

// First select the relevant part from the state
const selectDomain = (state: any) => state?.app || initialState;

//Wcw
export const selectLoadingWcw = createSelector([selectDomain], AppState => AppState.loadingWcw);

export const selectWcwData = createSelector([selectDomain], AppState => AppState.WcwData);

export const selectWcwMsg = createSelector([selectDomain], AppState => AppState.wcwMsg);
