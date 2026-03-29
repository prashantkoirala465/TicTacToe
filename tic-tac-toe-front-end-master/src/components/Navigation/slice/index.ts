import { saga } from './saga';
import { AppState, WcwData } from './types';

import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';

export const initialState: AppState = {
    //WCW
    loadingWcw: false,
    WcwData: null,
    wcwMsg: null,
};

const slice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        //wcw
        getWcw(state) {
            state.loadingWcw = true;
        },
        wcwConnecting(state) {
            state.loadingWcw = true;
        },
        wcwConnected(state, action: PayloadAction<WcwData>) {
            state.WcwData = action.payload;
            state.loadingWcw = false;
        },
        wcwDisConnected(state) {
            state.WcwData = null;
            state.loadingWcw = false;
        },
    },
});

export const { actions: AppActions, reducer } = slice;

export const useAppSlice = () => {
    useInjectReducer({ key: slice.name, reducer: slice.reducer });
    useInjectSaga({ key: slice.name, saga });
    return { actions: slice.actions };
};
