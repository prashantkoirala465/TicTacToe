import { GameListLayout } from './GameList.styled';
import { GameItem } from './components/GameItem';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { CustomButton } from 'components/Button';
import { CreateNewGameModal } from 'components/Modal/CreateNewGame';
import { selectWcwData } from 'components/Navigation/slice/selectors';
import { WcwNotificationError } from 'components/Notification';
import { translations } from 'locales/translations';
import { GameList } from 'services/game';
import { iGameList } from 'utils/types/game';

export const GameListPage = (): JSX.Element => {
    const { t } = useTranslation();
    const wcwData = useSelector(selectWcwData);

    const [isLoadGameList, setIsLoadGameList] = useState<boolean>(false);

    const [list, setList] = useState<iGameList[]>([]);

    const [isShowCreateGame, setIsShowCreateGame] = useState<boolean>(false);

    useEffect(() => {
        loadGameList();
    }, []);

    const loadGameList = async () => {
        setIsLoadGameList(true);
        try {
            const gameLists = await GameList();
            const gameDetail = gameLists?.filter(
                (game: any) => game?.host === wcwData?.account || game?.id,
            );
            if (gameDetail?.length) {
                setList(gameLists);
            }
        } catch (error) {}
        setIsLoadGameList(false);
    };

    const handleNewGame = async () => {
        //require login to creat new game
        if (!wcwData?.account) {
            WcwNotificationError(t(translations['require login']));
            return;
        }
        setIsShowCreateGame(true);
    };

    const handleSubmitNewGame = () => {
        setIsShowCreateGame(false);
    };

    const renderGameList = () => {
        if (isLoadGameList) {
            return <div className="game-list-div-2">{t(translations.loading)}</div>;
        }

        if (list?.length) {
            let games: any[] = [];
            for (const li of list) {
                games.push(<GameItem key={li.id} data={li} />);
            }
            return games;
        }

        return <div className="game-list-div-2">{t(translations['no game found'])}</div>;
    };

    return (
        <GameListLayout>
            <CreateNewGameModal isShow={isShowCreateGame} onSubmit={handleSubmitNewGame} />
            <div className="game-list-div-1">
                <div className="game-list-div-2">{t(translations.gameList['game list'])}</div>
                <div className="game-list-div-3">
                    <CustomButton onClick={handleNewGame}>
                        {t(translations.gameList['new game'])}
                    </CustomButton>
                </div>
            </div>

            <div className="game-list-div-4">{renderGameList()}</div>
        </GameListLayout>
    );
};
