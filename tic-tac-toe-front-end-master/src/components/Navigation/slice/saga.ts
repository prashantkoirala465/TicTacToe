import { AppActions as actions } from '.';
import { WcwData } from './types';

import { put, takeLatest, call } from 'redux-saga/effects';
import wax from 'services/waxJS';
import { getAccount, removeAccount, saveAccount } from 'utils/utils';

export function* connectWcw() {
    try {
        const isAutoLogin = yield call(isAutoLoginAvailable);
        if (isAutoLogin && wax?.userAccount) {
            const data: WcwData = {
                account: wax?.userAccount,
            };
            saveAccount(data);
            yield put(actions.wcwConnected(data));
        } else {
            const account_name: string = yield call(waxLogin);
            if (account_name) {
                const data: WcwData = {
                    account: account_name,
                };
                saveAccount(data);
                yield put(actions.wcwConnected(data));
            } else {
                yield put(actions.wcwDisConnected());
            }
        }
    } catch (error) {
        yield put(actions.wcwDisConnected());
    }
}

export function* getWcw() {
    try {
        const data = getAccount();
        if (!data) {
            yield put(actions.wcwDisConnected());
        } else {
            yield put(actions.wcwConnected(data));
        }
    } catch (error) {
        yield put(actions.wcwDisConnected());
    }
}

export function* disConnectedWcw() {
    removeAccount();
}

async function isAutoLoginAvailable() {
    return await wax.isAutoLoginAvailable();
}

async function waxLogin() {
    return await wax.login();
}

// Root saga manages watcher lifecycle
export function* saga() {
    // Watches for loadRepos actions and calls getRepos when one comes in.
    // By using `takeLatest` only the result of the latest API call is applied.
    // It returns task descriptor (just like fork) so we can continue execution
    // It will be cancelled automatically on component unmount
    yield takeLatest(actions.getWcw.type, getWcw);
    yield takeLatest(actions.wcwConnecting.type, connectWcw);
    yield takeLatest(actions.wcwDisConnected.type, disConnectedWcw);
}
