//blockchain endpoint
export const BLOCK_CHAIN_URL = import.meta.env.VITE_WAX_CHAIN_API ?? 'https://api.waxnet.io';

//wax js params
export const ALL_ACCESS_URL = import.meta.env.VITE_WAA_URL ?? 'https://www.mycloudwallet.com';
export const SIGNING_URL =
    import.meta.env.VITE_SIGNING_URL ?? 'https://idm-api.mycloudwallet.com/v1/accounts/auto-accept/';
export const FREE_BANDWIDTH = import.meta.env.VITE_FREE_BANDWIDTH
    ? import.meta.env.VITE_FREE_BANDWIDTH === 'true'
    : false;
export const AUTO_LOGIN = import.meta.env.VITE_AUTO_LOGIN
    ? import.meta.env.VITE_AUTO_LOGIN === 'true'
    : true;
export const FEE_FALLBACK = import.meta.env.VITE_FEE_FALLBACK
    ? import.meta.env.VITE_FEE_FALLBACK === 'true'
    : true;