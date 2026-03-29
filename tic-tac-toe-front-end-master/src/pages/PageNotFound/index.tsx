import { PageNotFoundLayout } from './PageNotFound.styled';

import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import PageNotFoundImg from 'assets/page_not_found.svg';
import { CustomButton } from 'components/Button';
import { _URL } from 'config/constant';
import { translations } from 'locales/translations';

export const PageNotFound = (): JSX.Element => {
    const { t } = useTranslation();

    return (
        <PageNotFoundLayout>
            <div className="page-not-found-div-1">
                <img src={PageNotFoundImg} alt="page not found" className="page-not-found-img-1" />
                <div className="page-not-found-div-2">404</div>
            </div>
            <div className="page-not-found-div-3">
                <Link to={_URL.HomePage}>
                    <CustomButton className="page-not-found-div-4">
                        {t(translations.pageNotFound['reload page'])}
                    </CustomButton>
                </Link>
            </div>
        </PageNotFoundLayout>
    );
};
