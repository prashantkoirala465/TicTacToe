export interface WcwData {
    account: string;
}

export interface MetaMaskData {
    ethAddress: string;
    ethWindow?: any;
    ethWc?: any;
    chainId?: string;
    isWalletConnect?: boolean;
}

export type AppState = {
    //wcw
    loadingWcw: boolean;
    WcwData: WcwData | null;
    wcwMsg: any;
};
