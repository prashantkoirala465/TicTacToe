import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Route, BrowserRouter, Routes } from 'react-router-dom';

import { MainContainer } from 'components/MainContainer';
import { useAppSlice } from 'components/Navigation/slice';
import { _URL } from 'config/constant';
import { GamePage } from 'pages/Game/Loadable';
import { GameListPage } from 'pages/GameList/Loadable';
import { HomePage } from 'pages/HomePage/Loadable';
import { PageNotFound } from 'pages/PageNotFound/Loadable';
import { GlobalStyle } from 'theme/global-styles';

function App() {
    const { i18n } = useTranslation();
    const dispatch = useDispatch();
    const { actions: appActions } = useAppSlice();

    useEffect(() => {
        dispatch(appActions.getWcw());
    }, []);

    return (
        <BrowserRouter>
            <Helmet
                titleTemplate="Tic Tac Toe - %s"
                defaultTitle="Tic Tac Toe"
                htmlAttributes={{ lang: i18n.language }}
            >
                <meta
                    name="description"
                    content="Play Tic Tac Toe using cryptocurrency. A simple, fun, and educational game to understand game mechanics and cryptocurrency usage."
                />
            </Helmet>
            <MainContainer>
                <Routes>
                    <Route path={_URL.HomePage} element={<HomePage />} />
                    <Route path={`${_URL.Game}`} element={<GameListPage />} />
                    <Route path={`${_URL.Game}/:id`} element={<GamePage />} />
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </MainContainer>
            <GlobalStyle />
        </BrowserRouter>
    );
}

export default App;
