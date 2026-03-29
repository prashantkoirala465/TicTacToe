import * as waxjs from '@waxio/waxjs/dist';
import {
    ALL_ACCESS_URL,
    AUTO_LOGIN,
    BLOCK_CHAIN_URL,
    FEE_FALLBACK,
    FREE_BANDWIDTH,
    SIGNING_URL,
} from 'config/config';

// Create an instance of the custom ABI provider
const wax = new waxjs.WaxJS({
    rpcEndpoint: BLOCK_CHAIN_URL,
    waxSigningURL: ALL_ACCESS_URL,
    waxAutoSigningURL: SIGNING_URL,

    tryAutoLogin: AUTO_LOGIN,
    freeBandwidth: FREE_BANDWIDTH,
    feeFallback: FEE_FALLBACK,
    // returnTempAccounts: true,
});

wax.rpc.fetchBuiltin = wax.rpc.fetchBuiltin ?? fetch;

export default wax;
