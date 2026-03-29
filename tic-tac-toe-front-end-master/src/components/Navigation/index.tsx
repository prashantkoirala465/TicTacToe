import { NavigationLayout } from './Navigation.styled';
import { useAppSlice } from './slice';

import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import WaxLogo from 'assets/wax_logo.svg';
import { CustomButton } from 'components/Button';
import { selectLoadingWcw, selectWcwData } from 'components/Navigation/slice/selectors';
import { _URL } from 'config/constant';

export const Navigation = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const currentPath = location?.pathname?.split('/')?.[1];
    const { actions: appActions } = useAppSlice();
    const wcwData = useSelector(selectWcwData);
    const isConnectingWallet = useSelector(selectLoadingWcw);

    const handleLogin = async () => {
        dispatch(appActions.wcwConnecting());
    };

    const handleLogout = async () => {
        dispatch(appActions.wcwDisConnected());
    };

    const renderWalletInfor = () => {
        //Not render wallet inform in home page
        if (!currentPath || currentPath === _URL.HomePage.slice(1)) {
            return null;
        }

        if (!wcwData?.account) {
            return (
                <CustomButton onClick={handleLogin} loading={isConnectingWallet}>
                    Login
                </CustomButton>
            );
        }

        return <CustomButton onClick={handleLogout}>Logout {wcwData?.account}</CustomButton>;
    };

    return (
        <NavigationLayout>
            <Link className="nav-div-1" to={_URL.HomePage}>
                <img src={WaxLogo} alt="logo" className="nav-img-1" />
            </Link>
            <div>{renderWalletInfor()}</div>
        </NavigationLayout>
    );
};
