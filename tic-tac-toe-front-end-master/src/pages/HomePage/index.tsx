import { HomePageLayout } from './HomePage.styled';

import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import TicTacToeLogo from 'assets/logo_tictactoe.svg';
import { CustomButton } from 'components/Button';
import { _URL } from 'config/constant';
import { translations } from 'locales/translations';

export const HomePage = (): JSX.Element => {
    const { t } = useTranslation();

    return (
        <>
            <HomePageLayout>
                <div className="homepage-container">
                    <img src={TicTacToeLogo} alt="logo" className="homepage-img-1" />
                    <div className="homepage-div-1">
                        <Link to={_URL.Game}>
                            <CustomButton className="home-div-2">
                                {t(translations.home['play game'])}
                            </CustomButton>
                        </Link>
                    </div>
                </div>
            </HomePageLayout>
        </>
    );
};
